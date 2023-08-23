using Microsoft.AspNetCore.Http;
using System.Diagnostics;

namespace KTS.FrameworkHelpers
{
    public static class TraceIdentifierHelper
    {
        public static string GetIdentifier(HttpContext httpContext)
        {
            return Activity.Current?.Id ?? httpContext.TraceIdentifier;
        }
    }
}
