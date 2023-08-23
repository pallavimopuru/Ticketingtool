using KTS.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Service.Interface
{
    public interface IAdminService
    {
        //Get
        Task<List<CRUDDepartment>> GetCrudDepartment();
        Task<List<CRUDDistributionList>> GetCrudDistributionList();
        Task<List<CRUDPriority>> GetCrudPriority();
        Task<List<CRUDTicketStatus>> GetCrudTicketStatus();
        Task<List<CRUDTicketType>> GetCrudTicketType();
        Task<List<CRUDCategory>> GetCrudCategory();
        Task<List<CRUDAppRoles>> GetCrudAppRoles();
        Task<List<CRUDAppUsers>> GetCrudAppUsers();
        Task<List<CRUDAppUserRoles>> GetCrudAppUserRoles();


        //Add
        Task<ResponseModel<bool>> AddDepartment(CRUDDepartment CRUDDepartment);
        Task<ResponseModel<bool>> AddDistributionList(CRUDDistributionList CRUDDistributionList);
        Task<ResponseModel<bool>> AddPriority(CRUDPriority CRUDPriority);
        Task<ResponseModel<bool>> AddTicketStatus(CRUDTicketStatus CRUDTicketStatus);
        Task<ResponseModel<bool>> AddTicketType(CRUDTicketType CrudTicketType);
        Task<ResponseModel<bool>> AddCategory(CRUDCategory CrudCategory);
        Task<ResponseModel<bool>> AddAppRoles(CRUDAppRoles CrudAppRoles);
        Task<ResponseModel<bool>> AddAppUsers(CRUDAppUsers CrudAppUsers);
        Task<ResponseModel<bool>> AddAppUserRoles(CRUDAppUserRoles CrudAppUserRoles);

        //Update
        Task<ResponseModel<bool>> UpdateDepartment(CRUDDepartment CRUDDepartment);
        Task<ResponseModel<bool>> UpdateDistributionList(CRUDDistributionList CRUDDistributionList);
        Task<ResponseModel<bool>> UpdatePriority(CRUDPriority CRUDPriority);
        Task<ResponseModel<bool>> UpdateTicketStatus(CRUDTicketStatus CRUDTicketStatus);
        Task<ResponseModel<bool>> UpdateTicketType(CRUDTicketType CrudTicketType);
        Task<ResponseModel<bool>> UpdateCategory(CRUDCategory CrudCategory);
        Task<ResponseModel<bool>> UpdateAppRoles(CRUDAppRoles CrudAppRoles);
        Task<ResponseModel<bool>> UpdateAppUsers(CRUDAppUsers CrudAppUsers);
        Task<ResponseModel<bool>> UpdateAppUserRoles(CRUDAppUserRoles CrudAppUserRoles);

        //Delete
        Task<ResponseModel<bool>> DeleteDepartmentById(int Id);
        Task<ResponseModel<bool>> DeletePriorityById(int Id);
        Task<ResponseModel<bool>> DeleteTicketStatusById(int Id);
        Task<ResponseModel<bool>> DeleteTicketTypeById(int Id);
        Task<ResponseModel<bool>> DeleteCategoryById(int Id);
        Task<ResponseModel<bool>> DeleteAppRolesById(int Id);
        Task<ResponseModel<bool>> DeleteAppUsersById(int Id);
        Task<ResponseModel<bool>> DeleteAppUserRolesById(int Id);
    }
}
