using KTS.Repository.Infrastructure.Interface;

namespace KTS.Repository.Infrastructure
{
    public class SqlQueryBuilder : IQueryBuilder
    {
        public string GetAllQuery(string tablename)
        {
            return $"select * from{tablename}";
        }
    }
}
