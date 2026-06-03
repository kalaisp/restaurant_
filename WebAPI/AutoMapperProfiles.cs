using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Data;
using WebAPI.Extensions;
using WebAPI.Interfaces;
var builder = WebApplication.CreateBuilder(args);

// ✅ Add Controllers
builder.Services.AddDbContext<DataContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
builder.Services.AddScoped<IunitOfWork,UnitOfWork>();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddAutoMapper(cfg => { }, typeof(AutoMapperProfiles));

// ✅ Add CORS for Angular
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    var secretKey=builder.Configuration.GetSection("AppSettings:Key").Value;
     //var secret = "ThisIsMySuperSecretKeyForJWTThatIsAtLeast32CharactersLong123!";

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