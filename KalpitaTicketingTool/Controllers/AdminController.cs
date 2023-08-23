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
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _AdminService;
        public AdminController(IAdminService AdminService)
        {
            _AdminService = AdminService;
        }
        [Route("AddDepartment")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddDepartment(CRUDDepartment CRUDDepartment)
        {
            return await _AdminService.AddDepartment(CRUDDepartment);
        }

        [Route("AddPriority")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddPriority(CRUDPriority CRUDPriority)
        {
            return await _AdminService.AddPriority(CRUDPriority);
        }

        [Route("AddTicketStatus")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddTicketStatus(CRUDTicketStatus CRUDTicketStatus)
        {
            return await _AdminService.AddTicketStatus(CRUDTicketStatus);
        }

        [Route("AddTicketType")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddTicketType(CRUDTicketType CrudTicketType)
        {
            return await _AdminService.AddTicketType(CrudTicketType);
        }

        [Route("AddCategory")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddCategory(CRUDCategory CrudCategory)
        {
            return await _AdminService.AddCategory(CrudCategory);
        }

        [Route("AddAppRoles")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddAppRoles(CRUDAppRoles CrudAppRoles)
        {
            return await _AdminService.AddAppRoles(CrudAppRoles);
        }

        [Route("AddAppUsers")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddAppUsers(CRUDAppUsers CrudAppUsers)
        {
            return await _AdminService.AddAppUsers(CrudAppUsers);
        }

        [Route("AddAppUserRoles")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddAppUserRoles(CRUDAppUserRoles CrudAppUserRoles)
        {
            return await _AdminService.AddAppUserRoles(CrudAppUserRoles);
        }

        [Route("AddDistributionList")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddDistributionList(CRUDDistributionList CRUDDistributionList)
        {
            return await _AdminService.AddDistributionList(CRUDDistributionList);
        }

        [Route("UpdateDepartment")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateDepartment(CRUDDepartment CRUDDepartment)
        {
            return await _AdminService.UpdateDepartment(CRUDDepartment);
        }


        [Route("UpdateDistributionList")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateDistributionList(CRUDDistributionList CRUDDistributionList)
        {
            return await _AdminService.UpdateDistributionList(CRUDDistributionList);
        }

        [Route("UpdatePriority")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdatePriority(CRUDPriority CRUDPriority)
        {
            return await _AdminService.UpdatePriority(CRUDPriority);
        }

        [Route("UpdateTicketStatus")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateTicketStatus(CRUDTicketStatus CRUDTicketStatus)
        {
            return await _AdminService.UpdateTicketStatus(CRUDTicketStatus);
        }

        [Route("UpdateTicketType")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateTicketType(CRUDTicketType CrudTicketType)
        {
            return await _AdminService.UpdateTicketType(CrudTicketType);
        }

        [Route("UpdateCategory")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateCategory(CRUDCategory CrudCategory)
        {
            return await _AdminService.UpdateCategory(CrudCategory);
        }

        [Route("UpdateAppRoles")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateAppRoles(CRUDAppRoles CrudAppRoles)
        {
            return await _AdminService.UpdateAppRoles(CrudAppRoles);
        }

        [Route("UpdateAppUserRoles")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateAppUserRoles(CRUDAppUserRoles CrudAppUserRoles)
        {
            return await _AdminService.UpdateAppUserRoles(CrudAppUserRoles);
        }

        [Route("UpdateAppUsers")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateAppUsers(CRUDAppUsers CrudAppUsers)
        {
            return await _AdminService.UpdateAppUsers(CrudAppUsers);
        }

        [Route("GetDepartment")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDDepartment>>> GetDepartment()
        {
            return await _AdminService.GetCrudDepartment();
        }

        [Route("GetDistributionList")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDDistributionList>>> GetDistribution()
        {
            return await _AdminService.GetCrudDistributionList();
        }

        [Route("GetPriority")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDPriority>>> GetPriority()
        {
            return await _AdminService.GetCrudPriority();
        }

        [Route("GetTicketStatus")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDTicketStatus>>> GetTicketStatus()
        {
            return await _AdminService.GetCrudTicketStatus();
        }

        [Route("GetTicketType")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDTicketType>>> GetTicketType()
        {
            return await _AdminService.GetCrudTicketType();
        }

        [Route("GetCategory")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDCategory>>> GetCategory()
        {
            return await _AdminService.GetCrudCategory();
        }

        [Route("GetAppRoles")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDAppRoles>>> GetAppRoles()
        {
            return await _AdminService.GetCrudAppRoles();
        }

        [Route("GetAppUsers")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDAppUsers>>> GetAppUsers()
        {
            return await _AdminService.GetCrudAppUsers();
        }

        [Route("GetAppUserRoles")]
        [HttpGet]
        public async Task<ActionResult<List<CRUDAppUserRoles>>> GetAppUserRoles()
        {
            return await _AdminService.GetCrudAppUserRoles();
        }
/*
        [Route("DeleteDepartmentById")]
        [HttpDelete]
        public async Task<ResponseModel<bool>> DeleteDepartmentById(int DepartmentId)
        {
            return await _AdminService.DeleteDepartmentById(DepartmentId);
        }

        [Route("DeletePriorityById")]
        [HttpDelete]
        public async Task<ResponseModel<bool>> DeletePriorityById(int PriorityId)
        {
            return await _AdminService.DeletePriorityById(PriorityId);
        }

        [Route("DeleteTicketStatusById")]
        [HttpDelete]
        public async Task<ResponseModel<bool>> DeleteTicketStatusById(int TicketStatusId)
        {
            return await _AdminService.DeleteTicketStatusById(TicketStatusId);
        }

        [Route("DeleteTicketTypeById")]
        [HttpDelete]
        public async Task<ResponseModel<bool>> DeleteTicketTypeById(int TicketTypeId)
        {
            return await _AdminService.DeleteTicketTypeById(TicketTypeId);
        }

        [Route("DeleteCategoryById")]
        [HttpDelete]
        public async Task<ResponseModel<bool>> DeleteCategoryById(int CategoryId)
        {
            return await _AdminService.DeleteCategoryById(CategoryId);
        }

        [Route("DeleteAppRolesById")]
        [HttpDelete]
        public async Task<ResponseModel<bool>> DeleteAppRolesById(int AppRolesId)
        {
            return await _AdminService.DeleteAppRolesById(AppRolesId);
        }

        [Route("DeleteAppUsersById")]
        [HttpDelete]
        public async Task<ResponseModel<bool>> DeleteAppUsersById(int AppUsersId)
        {
            return await _AdminService.DeleteAppUsersById(AppUsersId);
        }

        [Route("DeleteAppUserRolesById")]
        [HttpDelete]
        public async Task<ResponseModel<bool>> DeleteAppUserRolesById(int AppUserRolesId)
        {
            return await _AdminService.DeleteAppUserRolesById(AppUserRolesId);
        }*/
    }
}
