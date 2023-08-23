using KTS.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Repository.Interface
{
    public interface IDashBoardRepository
    {
        Task<IEnumerable<ChartAllStatusCount>> GetAllStatusCount(ChartRequest request);
        Task<IEnumerable<ChartCurrentStatusCount>> GetCurrentStatusCount(ChartRequest request);
        Task<IEnumerable<ChartTicketTypeCount>> GetTicketTypeCount(ChartRequest request);
        Task<IEnumerable<ChartPriorityCount>> GetPriorityCount(ChartRequest request);
        Task<IEnumerable<Users>> GetUsersByDepartment(ChartRequest request);
        //Task<IEnumerable<ChartDepartmentCount>> GetAllAssigneeByDepartmentCount(ChartRequest request);
        Task<IEnumerable<ChartAssignee>> GetAllAssigneeByDepartmentCount(ChartRequest request);
        Task<IEnumerable<FilterRange>> GetDBFilterRange(ChartRequest request);
        Task<IEnumerable<ChartPriorityRange>> GetAllPriorityCountByDepartment(ChartRequest request);
    }
}
