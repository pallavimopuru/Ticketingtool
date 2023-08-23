using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Repository.Infrastructure.Interface
{
    public interface  IQueryBuilder
    {
        string GetAllQuery(string tablename);
    }
}
