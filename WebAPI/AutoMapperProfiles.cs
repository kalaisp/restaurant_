using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Data;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Services;
var builder = WebApplication.CreateBuilder(args);


// ✅ Add Controllers
builder.Services.AddDbContext<DataContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
builder.Services.AddScoped<IunitOfWork,UnitOfWork>();


builder.Services.AddScoped<IPhotoService,PhotoService>();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddAutoMapper(cfg => { }, typeof(AutoMapperProfiles));
// var build=new SqlConnectionStringBuilder(
//     builder.Configuration.GetConnectionString("DefaultConnection"));
//     build.Password=builder.Configuration.GetSection("DBPassword").Value;
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var build = new SqlConnectionStringBuilder(connectionString);

// Get password from environment variable
build.Password = Environment.GetEnvironmentVariable("ASPNETCORE_DBPassword");

// Debug - remove after fixing
Console.WriteLine($"Connection string: {build.ConnectionString}");
Console.WriteLine($"Password is empty: {string.IsNullOrEmpty(build.Password)}");

// Register DbContext WITH retry
builder.Services.AddDbContext<DataContext>(opt => {
    opt.UseSqlServer(build.ConnectionString, sqlOptions => {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null
        );
    });
});
// ✅ Add CORS for Angular
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("http://localhost:4200",
        "https://restorent-angular.web.app",
            "https://restorent-angular-api.web.app","http://localhost:81", 
        "https://restorent-api-fdhnb3ahavf5c3cq.centralus-01.azurewebsites.net")
              .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    var secretKey=builder.Configuration.GetSection("AppSettings:Key").Value;
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
    opt.TokenValidationParameters=new TokenValidationParameters
    {
        ValidateIssuerSigningKey=true,
        ValidateIssuer=false,
        ValidateAudience=false,
        IssuerSigningKey=key
    };
});

var app = builder.Build();
app.UseCors("AllowAngular");
app.UseHsts();
app.UseHttpsRedirection();

app.UseCors("AllowFirebase");
app.UseDefaultFiles();
app.UseStaticFiles();               
var env = app.Services.GetRequiredService<IWebHostEnvironment>(); // ✅
// app.ConfigureExceptionHandler
app.ConfigureExceptionHandler(env);
// app.UseMiddleware<ExceptionMiddelwares>();
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
// else
// {
//     app.UseExceptionHandler(
//         options =>
//         {
//             options.Run(
//                 async context =>
//                 {
//                     context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
//                     var ex=context.Features.Get<IExceptionHandlerFeature>();
//                     if (ex != null)
//                     {
//                         await context.Response.WriteAsync(ex.Error.Message);
//                     }
//                 }
//             );
//         }
//     );
// }

// ✅ Use CORS
app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();

// ✅ Map Controllers
app.MapControllers();

app.Run();

internal class AutoMapperProfiles
{
}