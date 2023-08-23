using KTS.Models.Common;
using KTS.Repository.Interface;
using KTS.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace KTS.Service.Implementation
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _AdminRepository;
        public AdminService(IAdminRepository adminRepository)
        {
            _AdminRepository = adminRepository ?? throw new ArgumentNullException(nameof(adminRepository));
        }

        public async Task<ResponseModel<bool>> AddDepartment(CRUDDepartment CRUDDepartment)
        {
            var data = await _AdminRepository.CrudDepartment(CRUDDepartment, "INSERT");
            var res = new ResponseModel<bool>();
            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "Department already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "Department added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> AddDistributionList(CRUDDistributionList CRUDDistributionList)
        {
            var data = await _AdminRepository.CrudDistributionList(CRUDDistributionList, "INSERT");
            var res = new ResponseModel<bool>();
            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "DistributionList already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "DistributionList added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> AddPriority(CRUDPriority CRUDPriority)
        {
            var data = await _AdminRepository.CrudPriority(CRUDPriority, "INSERT");
            var res = new ResponseModel<bool>();

            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "Priority already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "Priority added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> AddTicketStatus(CRUDTicketStatus CRUDTicketStatus)
        {
            var data = await _AdminRepository.CrudTicketStatus(CRUDTicketStatus, "INSERT");
            var res = new ResponseModel<bool>();
            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "TicketStatus already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "TicketStatus added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> AddTicketType(CRUDTicketType CrudTicketType)
        {
            var data = await _AdminRepository.CrudTicketType(CrudTicketType, "INSERT");
            var res = new ResponseModel<bool>();
            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "TicketType already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "TicketType added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> AddCategory(CRUDCategory CrudCategory)
        {
            var data = await _AdminRepository.CrudCategory(CrudCategory, "INSERT");
            var res = new ResponseModel<bool>();
            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "Category already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "Category added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> AddAppRoles(CRUDAppRoles CrudAppRoles)
        {
            var data = await _AdminRepository.CrudAppRoles(CrudAppRoles, "INSERT");
            var res = new ResponseModel<bool>();
            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "AppRoles already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "AppRoles added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> AddAppUserRoles(CRUDAppUserRoles CrudAppUserRoles)
        {
            var data = await _AdminRepository.CrudAppUserRoles(CrudAppUserRoles, "INSERT");
            var res = new ResponseModel<bool>();
            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "AppUserRoles already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "AppUserRoles added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> AddAppUsers(CRUDAppUsers CrudAppUsers)
        {
            var data = await _AdminRepository.CrudAppUsers(CrudAppUsers, "INSERT");
            var res = new ResponseModel<bool>();
            if (data.IsExists)
            {
                res.IsError = data.IsExists;
                res.Message = "AppUsers already exists";
                res.Data = data.IsExists;
            }
            else
            {
                res.IsError = data.IsExists;
                res.Message = "AppUsers added successfully";
                res.Data = data.IsExists;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> UpdateDepartment(CRUDDepartment CRUDDepartment)
        {
            var data = await _AdminRepository.CrudDepartment(CRUDDepartment, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "Department does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "Department already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "Department updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }

        public async Task<ResponseModel<bool>> UpdateDistributionList(CRUDDistributionList CRUDDistributionList)
        {
            var data = await _AdminRepository.CrudDistributionList(CRUDDistributionList, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "DistributionList does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "DistributionList already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "DistributionList updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }

        public async Task<ResponseModel<bool>> UpdatePriority(CRUDPriority CRUDPriority)
        {
            var data = await _AdminRepository.CrudPriority(CRUDPriority, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "Priority does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "Priority already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "Priority updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }

        public async Task<ResponseModel<bool>> UpdateTicketStatus(CRUDTicketStatus CRUDTicketStatus)
        {
            var data = await _AdminRepository.CrudTicketStatus(CRUDTicketStatus, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "TicketStatus does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "TicketStatus already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "TicketStatus updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }

        public async Task<ResponseModel<bool>> UpdateTicketType(CRUDTicketType CrudTicketType)
        {
            var data = await _AdminRepository.CrudTicketType(CrudTicketType, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "TicketType does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "TicketType already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "TicketType updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }

        public async Task<ResponseModel<bool>> UpdateCategory(CRUDCategory CrudCategory)
        {
            var data = await _AdminRepository.CrudCategory(CrudCategory, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "Category does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "Category already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "Category updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }

        public async Task<ResponseModel<bool>> UpdateAppRoles(CRUDAppRoles CrudAppRoles)
        {
            var data = await _AdminRepository.CrudAppRoles(CrudAppRoles, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "AppRoles does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "AppRoles already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "AppRoles updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }
        public async Task<ResponseModel<bool>> UpdateAppUserRoles(CRUDAppUserRoles CrudAppUserRoles)
        {
            var data = await _AdminRepository.CrudAppUserRoles(CrudAppUserRoles, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "AppUserRoles does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "AppUserRoles already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "AppUserRoles updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }

        public async Task<ResponseModel<bool>> UpdateAppUsers(CRUDAppUsers CrudAppUsers)
        {
            var data = await _AdminRepository.CrudAppUsers(CrudAppUsers, "UPDATE");
            var res = new ResponseModel<bool>();
            if (!data.IsExists)
            {
                res.IsError = !data.IsExists;
                res.Message = "AppUsers does not exist";
                res.Data = data.IsExists;
            }
            else
            {
                if (data.ActionStatus.Equals("EXISTS", StringComparison.OrdinalIgnoreCase))
                {
                    res.IsError = data.IsExists;
                    res.Message = "AppUsers already exists";
                    res.Data = data.IsExists;
                }
                else
                {
                    res.IsError = !data.IsExists;
                    res.Message = "AppUsers updated successfully";
                    res.Data = data.IsExists;
                }
            }
            return res;
        }
        public async Task<List<CRUDDepartment>> GetCrudDepartment()
        {
            return (await _AdminRepository.GetCrudDepartment()).ToList();
        }

        public async Task<List<CRUDDistributionList>> GetCrudDistributionList()
        {
            return (await _AdminRepository.GetDistributionList()).ToList();
        }

        public async Task<List<CRUDPriority>> GetCrudPriority()
        {
            return (await _AdminRepository.GetCrudPriority()).ToList();
        }

        public async Task<List<CRUDTicketStatus>> GetCrudTicketStatus()
        {
            return (await _AdminRepository.GetCrudTicketStatus()).ToList();
        }

        public async Task<List<CRUDTicketType>> GetCrudTicketType()
        {
            return (await _AdminRepository.GetCrudTicketType()).ToList();
        }

        public async Task<List<CRUDCategory>> GetCrudCategory()
        {
            return (await _AdminRepository.GetCrudCategory()).ToList();
        }

        public async Task<List<CRUDAppRoles>> GetCrudAppRoles()
        {
            return (await _AdminRepository.GetCrudAppRoles()).ToList();
        }

        public async Task<List<CRUDAppUsers>> GetCrudAppUsers()
        {
            return (await _AdminRepository.GetCrudAppUsers()).ToList();
        }

        public async Task<List<CRUDAppUserRoles>> GetCrudAppUserRoles()
        {
            return (await _AdminRepository.GetCrudAppUserRoles()).ToList();
        }

        public async Task<ResponseModel<bool>> DeleteDepartmentById(int Id)
        {
            string message = "Department deleted successfully";
            bool isError = false;
            await _AdminRepository.DeleteDepartmentById(Id);
            var res = new ResponseModel<bool>()
            {
                IsError = isError,
                Message = message,
                Data = !isError
            };
            return res;
        }

        public async Task<ResponseModel<bool>> DeletePriorityById(int Id)
        {
            string message = "Priority deleted successfully";
            bool isError = false;
            await _AdminRepository.DeletePriorityById(Id);
            var res = new ResponseModel<bool>()
            {
                IsError = isError,
                Message = message,
                Data = !isError
            };
            return res;
        }

        public async Task<ResponseModel<bool>> DeleteTicketStatusById(int Id)
        {
            string message = "TicketStatus deleted successfully";
            bool isError = false;
            await _AdminRepository.DeleteTicketStatusById(Id);
            var res = new ResponseModel<bool>()
            {
                IsError = isError,
                Message = message,
                Data = !isError
            };
            return res;
        }

        public async Task<ResponseModel<bool>> DeleteTicketTypeById(int Id)
        {
            string message = "TicketType deleted successfully";
            bool isError = false;
            await _AdminRepository.DeleteTicketTypeById(Id);
            var res = new ResponseModel<bool>()
            {
                IsError = isError,
                Message = message,
                Data = !isError
            };
            return res;
        }

        public async Task<ResponseModel<bool>> DeleteCategoryById(int Id)
        {
            string message = "Category deleted successfully";
            bool isError = false;
            await _AdminRepository.DeleteCategoryById(Id);
            var res = new ResponseModel<bool>()
            {
                IsError = isError,
                Message = message,
                Data = !isError
            };
            return res;
        }

        public async Task<ResponseModel<bool>> DeleteAppRolesById(int Id)
        {
            string message = "AppRoles deleted successfully";
            bool isError = false;
            await _AdminRepository.DeleteAppRolesById(Id);
            var res = new ResponseModel<bool>()
            {
                IsError = isError,
                Message = message,
                Data = !isError
            };
            return res;
        }

        public async Task<ResponseModel<bool>> DeleteAppUsersById(int Id)
        {
            string message = "AppUsers deleted successfully";
            bool isError = false;
            await _AdminRepository.DeleteAppUsersById(Id);
            var res = new ResponseModel<bool>()
            {
                IsError = isError,
                Message = message,
                Data = !isError
            };
            return res;
        }

        public async Task<ResponseModel<bool>> DeleteAppUserRolesById(int Id)
        {
            string message = "AppUserRoles deleted successfully";
            bool isError = false;
            await _AdminRepository.DeleteAppUserRolesById(Id);
            var res = new ResponseModel<bool>()
            {
                IsError = isError,
                Message = message,
                Data = !isError
            };
            return res;
        }
    }
}
