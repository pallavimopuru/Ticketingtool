﻿using KTS.FrameworkMiddleware;
using Microsoft.AspNetCore.Builder;

namespace KTS.FrameworkExtensions
{
    public static class MiddleWareExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandlingMiddleware>();
        }
        public static IApplicationBuilder UseGlobalExceptionLogging(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionLoggingMiddleware>();
        }
        public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLoggingMiddleware>();
        }
        
    }
}
