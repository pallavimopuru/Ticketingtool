using KTS.Models.Common;
using KTS.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KalpitaTicketingTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        private readonly IDashBoardService _dashBoardService;
        public DashBoardController(IDashBoardService dashBoardService)
        {
            _dashBoardService = dashBoardService;
        }
        [Route("DBAllStatusCount")]
        [HttpGet]
        public async Task<ActionResult<List<ChartAllStatusCount>>> AllStatusCount([FromQuery] ChartRequest request)
        {
            return await _dashBoardService.GetAllStatusCount(request);
        }

        [Route("DBPieByStatus")]
        [HttpGet]
        public async Task<ActionResult<List<ChartCurrentStatusCount>>> ChartPieByStatus([FromQuery] ChartRequest request)
        {
            return await _dashBoardService.GetCurrentStatusCount(request);
        }

        [Route("DBBarByTicketType")]
        [HttpGet]
        public async Task<ActionResult<List<ChartTicketTypeCount>>> DBBarByTicketType([FromQuery] ChartRequest request)
        {
            return await _dashBoardService.GetTicketTypeCount(request);
        }

        [Route("DBPieByPriority")]
        [HttpGet]
        public async Task<ActionResult<List<ChartPriorityCount>>> DBPieByPriority([FromQuery] ChartRequest request)
        {
            return await _dashBoardService.GetPriorityCount(request);
        }
        [Route("DBColumnByAssignee")]
        [HttpGet]
        public async Task<ActionResult<List<ChartAssignee>>> DBColumnByAssignee([FromQuery] ChartRequest request)
        {
            return await _dashBoardService.GetAllAssigneeByDepartmentCount(request);
        }
        [Route("DBFilterRange")]
        [HttpGet]
        public async Task<ActionResult<List<FilterRange>>> DBFilterRange([FromQuery] ChartRequest request)
        {
            return await _dashBoardService.GetDBFilterRange(request);
        }
        [Route("DBColumnByPriority")]
        [HttpGet]
        public async Task<ActionResult<List<ChartPriorityRange>>> DBColumnByPriority([FromQuery] ChartRequest request)
        {
            return await _dashBoardService.GetAllPriorityCountByDepartment(request);
        }
    }
}
