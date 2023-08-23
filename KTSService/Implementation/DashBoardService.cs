using KTS.Models.Common;
using KTS.Repository.Interface;
using KTS.Service.Interface;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Service.Implementation
{
    public class DashBoardService : IDashBoardService
    {
        private readonly IDashBoardRepository _DashBoardRepository;
        public DashBoardService(IDashBoardRepository dashBoardRepository)
        {
            _DashBoardRepository = dashBoardRepository ?? throw new ArgumentNullException(nameof(dashBoardRepository));
        }

        public async Task<List<ChartAllStatusCount>> GetAllStatusCount(ChartRequest request)
        {
            return (await _DashBoardRepository.GetAllStatusCount(request)).ToList();
        }

        public async Task<List<ChartCurrentStatusCount>> GetCurrentStatusCount(ChartRequest request)
        {
            return (await _DashBoardRepository.GetCurrentStatusCount(request)).ToList();
        }

        public async Task<List<ChartTicketTypeCount>> GetTicketTypeCount(ChartRequest request)
        {
            return (await _DashBoardRepository.GetTicketTypeCount(request)).ToList();
        }

        public async Task<List<ChartPriorityCount>> GetPriorityCount(ChartRequest request)
        {
            return (await _DashBoardRepository.GetPriorityCount(request)).ToList();
        }

        public async Task<List<ChartAssignee>> GetAllAssigneeByDepartmentCount(ChartRequest request)
        {
            return (await _DashBoardRepository.GetAllAssigneeByDepartmentCount(request)).ToList();
        }

        public async Task<List<FilterRange>> GetDBFilterRange(ChartRequest request)
        {
            return (await _DashBoardRepository.GetDBFilterRange(request)).ToList();
        }

        public async Task<List<ChartPriorityRange>> GetAllPriorityCountByDepartment(ChartRequest request)
        {
            return (await _DashBoardRepository.GetAllPriorityCountByDepartment(request)).ToList();
        }

    }
}
