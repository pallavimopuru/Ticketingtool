using KTS.Repository.Infrastructure;

namespace KTS.Service.Mapping
{
    public static class DapperMapping
    {
        public static void AddDapperMappings()
        {
            DapperMappingConfiguration.ConfigureDapperMappings();
        }
    }
}
