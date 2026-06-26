using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using WebAPI.Middelwares;
namespace WebAPI.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
         public static void ConfigureExceptionHandler(this IApplicationBuilder app,
        IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddelwares>();
        }
        public static void ConfigureBuiltinExceptionHandler1(this IApplicationBuilder app,
        IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }
                else
                {
                    app.UseExceptionHandler(
                        options =>
                        {
                            options.Run(
                                async context =>
                                {
                                    context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                                    var ex=context.Features.Get<IExceptionHandlerFeature>();
                                    if (ex != null)
                                    {
                                        await context.Response.WriteAsync(ex.Error.Message);
                                    }
                                }
                            );
                        }
                    );
                }

        }
    }
}