using KTS.FrameworkExceptions.ApiExceptions;
using KTS.FrameworkHelpers;
using KTS.Framework.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace KTS.FrameworkMiddleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate next;
        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await next(httpContext);
            }
            catch (ApiException ex)
            {

                await HandleApiExceptionAsync(httpContext, ex);
            }
            catch (Exception ex)
            {
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                throw;
            }
        }

        public static async Task HandleApiExceptionAsync(HttpContext context, ApiException exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = exception.Status;
            var json = JsonConvert.SerializeObject(new ErrorResponseModel<Object>()
            {
                Name =exception.GetType().Name,
                Status=context.Response.StatusCode,
                Message = exception.Message,
                Details = exception.Details,
                RequestId = TraceIdentifierHelper.GetIdentifier(context)
            });
            await context.Response.WriteAsync(json);
        }
    }
}
