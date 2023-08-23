using System;
using System.Collections.Generic;
using System.Text;
using KTS.Models.Common;
using System.Threading.Tasks;

namespace KTS.Repository.Interface
{
    public interface IAdminRepository
    {
        Task<DataExists> CrudDepartment(CRUDDepartment CRUDDepartment, string Action);
        Task<DataExists> CrudDistributionList(CRUDDistributionList DistributionList, string Action);
        Task<DataExists> CrudPriority(CRUDPriority CRUDPriority, string Action);
        Task<DataExists> CrudTicketStatus(CRUDTicketStatus CRUDTicketStatus, string Action);
        Task<DataExists> CrudTicketType(CRUDTicketType CrudTicketType, string Action);
        Task<DataExists> CrudCategory(CRUDCategory CrudCategory, string Action);
        Task<DataExists> CrudAppRoles(CRUDAppRoles CrudAppRoles, string Action);
        Task<DataExists> CrudAppUsers(CRUDAppUsers CrudAppUsers, string Action);
        Task<DataExists> CrudAppUserRoles(CRUDAppUserRoles CrudAppUserRoles, string Action);
        Task<IEnumerable<CRUDDepartment>> GetCrudDepartment();
        Task<IEnumerable<CRUDDistributionList>> GetDistributionList();
        Task<IEnumerable<CRUDPriority>> GetCrudPriority();
        Task<IEnumerable<CRUDTicketStatus>> GetCrudTicketStatus();
        Task<IEnumerable<CRUDTicketType>> GetCrudTicketType();
        Task<IEnumerable<CRUDCategory>> GetCrudCategory();
        Task<IEnumerable<CRUDAppRoles>> GetCrudAppRoles();
        Task<IEnumerable<CRUDAppUsers>> GetCrudAppUsers();
        Task<IEnumerable<CRUDAppUserRoles>> GetCrudAppUserRoles();
        Task<bool> DeleteDepartmentById(int Id);
        Task<bool> DeletePriorityById(int Id);
        Task<bool> DeleteTicketStatusById(int Id);
        Task<bool> DeleteTicketTypeById(int Id);
        Task<bool> DeleteCategoryById(int Id);
        Task<bool> DeleteAppRolesById(int Id);
        Task<bool> DeleteAppUsersById(int Id);
        Task<bool> DeleteAppUserRolesById(int Id);
    }
}
