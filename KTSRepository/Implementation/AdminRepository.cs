using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KTS.Framework.Models.Settings;
using KTS.Models.Common;
using KTS.Repository.Infrastructure.Interface;
using KTS.Repository.Interface;
using Microsoft.Extensions.Options;
using KTS.Repository.Helpers;
using System.Linq;

namespace KTS.Repository.Implementation
{
    public class AdminRepository : BaseRepository, IAdminRepository
    {
        private const string IdQuery = "@TicketTypes";
        // private readonly IUnitOfWork _unitOfWork;//
        public AdminRepository(
            IOptions<DatabaseAdvancedSettingsOptions> settingsOptions,
                       IQueryBuilder queryBuilder,
            IUnitOfWork unitOfWork) : base(settingsOptions, queryBuilder, unitOfWork, TableNames.TicketType, IdQuery)
        {
        }

        public async Task<DataExists> CrudDepartment(CRUDDepartment CRUDDepartment, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                DepartmentID = CRUDDepartment.DepartmentID,
                DepartmentName = CRUDDepartment.DepartmentName.Trim(),
                DepartmentDescription = CRUDDepartment.DepartmentDescription.Trim(),
                DistributionListID = CRUDDepartment.DistributionListID,
                //DistributionListEmail = CRUDDepartment.DistributionListEmail.Trim(),
                DefaultAssigneeEmail = CRUDDepartment.DefaultAssigneeEmail.Trim(),
                Status = CRUDDepartment.Status
            };
            return (await QueryProcedureAsync<DataExists>("usp_CRUDDepartment", SubmitData)).First();
        }

        public async Task<DataExists> CrudDistributionList(CRUDDistributionList CRUDDistributionList, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                DistributionListID = CRUDDistributionList.DistributionListID,
                DistributionListEmail = CRUDDistributionList.DistributionListEmail.Trim(),
                DistributionListDescription = CRUDDistributionList.DistributionListDescription.Trim(),
                Status = CRUDDistributionList.Status
            };

            return (await QueryProcedureAsync<DataExists>("usp_CRUDDistributionList", SubmitData)).First();
        }

        public async Task<DataExists> CrudPriority(CRUDPriority CRUDPriority, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                PriorityID = CRUDPriority.PriorityID,
                PriorityType = CRUDPriority.PriorityType.Trim(),
                Description = CRUDPriority.Description.Trim(),
                Status = CRUDPriority.Status
            };
            return (await QueryProcedureAsync<DataExists>("usp_CRUDPriority", SubmitData)).First();
        }

        public async Task<DataExists> CrudTicketStatus(CRUDTicketStatus CRUDTicketStatus, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                TicketStatusID = CRUDTicketStatus.TicketStatusID,
                TicketStatus = CRUDTicketStatus.TicketStatus.Trim(),
                Status = CRUDTicketStatus.Status
            };
            return (await QueryProcedureAsync<DataExists>("usp_CRUDTicketStatus", SubmitData)).First();
        }

        public async Task<DataExists> CrudTicketType(CRUDTicketType CrudTicketType, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                TicketTypeID = CrudTicketType.TicketTypeID,
                TicketType = CrudTicketType.TicketType.Trim(),
                Description = CrudTicketType.Description.Trim(),
                Status = CrudTicketType.Status
            };
            return (await QueryProcedureAsync<DataExists>("usp_CRUDTicketType", SubmitData)).First();
        }

        public async Task<DataExists> CrudCategory(CRUDCategory CrudCategory, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                CategoryID = CrudCategory.CategoryID,
                CategoryName = CrudCategory.CategoryName.Trim(),
                DepartmentID = CrudCategory.DepartmentID,
                TicketTypeID = CrudCategory.TicketTypeID,
                Status = CrudCategory.Status
            };
            return (await QueryProcedureAsync<DataExists>("usp_CRUDCategory", SubmitData)).First();
        }

        public async Task<DataExists> CrudAppRoles(CRUDAppRoles CrudAppRoles, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                RoleID = CrudAppRoles.RoleID,
                RoleName = CrudAppRoles.RoleName.Trim(),
                RoleLandingPage = CrudAppRoles.RoleLandingPage,
                Status = CrudAppRoles.Status
            };
            return (await QueryProcedureAsync<DataExists>("usp_CRUDAppRoles", SubmitData)).First();
        }

        public async Task<DataExists> CrudAppUsers(CRUDAppUsers CrudAppUsers, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                UserID = CrudAppUsers.UserID,
                UserEmail = CrudAppUsers.UserEmail.Trim(),
                UserName = CrudAppUsers.UserName.Trim(),
                Status = CrudAppUsers.Status
            };
            return (await QueryProcedureAsync<DataExists>("usp_CRUDAppUsers", SubmitData)).First();
        }

        public async Task<DataExists> CrudAppUserRoles(CRUDAppUserRoles CrudAppUserRoles, string Action)
        {
            var SubmitData = new
            {
                Action = Action,
                ID = CrudAppUserRoles.ID,
                UserID = CrudAppUserRoles.UserID,
                RoleID = CrudAppUserRoles.RoleID,
                DepartmentID = CrudAppUserRoles.DepartmentID,
                Status = CrudAppUserRoles.Status
            };
            return (await QueryProcedureAsync<DataExists>("usp_CRUDAppUserRoles", SubmitData)).First();
        }

        public async Task<IEnumerable<CRUDDepartment>> GetCrudDepartment()
        {
            return await QueryProcedureAsync<CRUDDepartment>("usp_CRUDDepartment");
        }

        public async Task<IEnumerable<CRUDDistributionList>> GetDistributionList()
        {
            return await QueryProcedureAsync<CRUDDistributionList>("usp_CRUDDistributionList");
        }

        public async Task<IEnumerable<CRUDPriority>> GetCrudPriority()
        {
            return await QueryProcedureAsync<CRUDPriority>("usp_CRUDPriority");
        }

        public async Task<IEnumerable<CRUDTicketStatus>> GetCrudTicketStatus()
        {
            return await QueryProcedureAsync<CRUDTicketStatus>("usp_CRUDTicketStatus");
        }

        public async Task<IEnumerable<CRUDTicketType>> GetCrudTicketType()
        {
            return await QueryProcedureAsync<CRUDTicketType>("usp_CRUDTicketType");
        }

        public async Task<IEnumerable<CRUDCategory>> GetCrudCategory()
        {
            return await QueryProcedureAsync<CRUDCategory>("usp_CRUDCategory");
        }

        public async Task<IEnumerable<CRUDAppRoles>> GetCrudAppRoles()
        {
            return await QueryProcedureAsync<CRUDAppRoles>("usp_CRUDAppRoles");
        }

        public async Task<IEnumerable<CRUDAppUsers>> GetCrudAppUsers()
        {
            return await QueryProcedureAsync<CRUDAppUsers>("usp_CRUDAppUsers");
        }

        public async Task<IEnumerable<CRUDAppUserRoles>> GetCrudAppUserRoles()
        {
            return await QueryProcedureAsync<CRUDAppUserRoles>("usp_CRUDAppUserRoles");
        }

        public async Task<bool> DeleteDepartmentById(int Id)
        {
            var Data = new
            {
                Action = "DELETE",
                DepartmentId = Id
            };
            await QueryProcedureAsync<CRUDDepartment>("usp_CRUDDepartment", Data);
            return true;
        }

        public async Task<bool> DeletePriorityById(int Id)
        {
            var Data = new
            {
                Action = "DELETE",
                PriorityId = Id
            };
            await QueryProcedureAsync<CRUDPriority>("usp_CRUDPriority", Data);
            return true;
        }

        public async Task<bool> DeleteTicketStatusById(int Id)
        {
            var Data = new
            {
                Action = "DELETE",
                TicketStatusId = Id
            };
            await QueryProcedureAsync<CRUDTicketStatus>("usp_CRUDTicketStatus", Data);
            return true;
        }

        public async Task<bool> DeleteTicketTypeById(int Id)
        {
            var Data = new
            {
                Action = "DELETE",
                TicketTypeId = Id
            };
            await QueryProcedureAsync<CRUDTicketType>("usp_CRUDTicketType", Data);
            return true;
        }

        public async Task<bool> DeleteCategoryById(int Id)
        {
            var Data = new
            {
                Action = "DELETE",
                CategoryId = Id
            };
            await QueryProcedureAsync<CRUDCategory>("usp_CRUDCategory", Data);
            return true;
        }

        public async Task<bool> DeleteAppRolesById(int Id)
        {
            var Data = new
            {
                Action = "DELETE",
                AppRolesId = Id
            };
            await QueryProcedureAsync<CRUDAppRoles>("usp_CRUDAppRoles", Data);
            return true;
        }

        public async Task<bool> DeleteAppUsersById(int Id)
        {
            var Data = new
            {
                Action = "DELETE",
                AppUsersId = Id
            };
            await QueryProcedureAsync<CRUDAppUsers>("usp_CRUDAppUsers", Data);
            return true;
        }

        public async Task<bool> DeleteAppUserRolesById(int Id)
        {
            var Data = new
            {
                Action = "DELETE",
                AppUserRolesId = Id
            };
            await QueryProcedureAsync<CRUDAppUserRoles>("usp_CRUDAppUserRoles", Data);
            return true;
        }
    }
}
