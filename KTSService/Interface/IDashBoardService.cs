using KTS.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Service.Interface
{
    public interface IDashBoardService
    {
        Task<List<ChartAllStatusCount>> GetAllStatusCount(ChartRequest request);
        Task<List<ChartCurrentStatusCount>> GetCurrentStatusCount(ChartRequest request);
        Task<List<ChartTicketTypeCount>> GetTicketTypeCount(ChartRequest request);
        Task<List<ChartPriorityCount>> GetPriorityCount(ChartRequest request);
        Task<List<ChartAssignee>> GetAllAssigneeByDepartmentCount(ChartRequest request);
        Task<List<FilterRange>> GetDBFilterRange(ChartRequest request);
        Task<List<ChartPriorityRange>> GetAllPriorityCountByDepartment(ChartRequest request);
    }
}
