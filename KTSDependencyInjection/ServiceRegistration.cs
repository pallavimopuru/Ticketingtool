using AutoMapper;
using KTS.FrameworkExtensions;
using KTS.Repository.Implementation;
using KTS.Repository.Infrastructure;
using KTS.Repository.Infrastructure.Interface;
using KTS.Repository.Interface;
using KTS.Service.Implementation;
using KTS.Service.Interface;
using KTS.Service.Mapping;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KTS.DependencyInjection
{
    public static class ServiceRegistration
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<ITicketService, TicketService>();
            services.AddScoped<ITicketRepository, TicketRepository>();

            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IAdminRepository, AdminRepository>();

            services.AddScoped<IDashBoardService, DashBoardService>();
            services.AddScoped<IDashBoardRepository, DashBoardRepository>();

            services.AddScoped<IEmailServices, EmailServices>();
            services.AddScoped<IAzureServices, AzureServices>();
            services.AddScoped<IExportServices, ExportServices>();
        }
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSettingsProvider(configuration);
            services.AddTransient<IQueryBuilder, SqlQueryBuilder>();
            /* services.AddTransient<ISettingsService, SettingsService>();*/
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IConnectionFactory, SqlConnectionFactory>();
        }
        public static void AddAutoMapper(this IServiceCollection services)
        {
            var mapperConfig = AutoMapperConfiguration.Intialize();
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
        }
    }
}
