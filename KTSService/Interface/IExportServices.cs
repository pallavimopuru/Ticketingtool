using KTS.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Data;

namespace KTS.Service.Interface
{
    public interface IExportServices
    {
        Task<FileData> ExportExcel<T>(IEnumerable<T> ticketDataByDateRange, TicketRange ticketRange);
    }
}
