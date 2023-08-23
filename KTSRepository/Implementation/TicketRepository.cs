using KTS.Repository.Implementation;
using KTS.Repository.Interface;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Data.SqlClient;
using KTS.Repository.Infrastructure.Interface;
using KTS.Framework.Models.Settings;
using KTS.Repository.Helpers;
using KTS.Models.Common;
using System.Data;
using System.Linq.Expressions;
using System.Reflection;

namespace KTS.Repository.Implementation
{
    public static class ExtensionMethod
    {
        public static IQueryable<T> OrderByField<T>(this IQueryable<T> q, string SortField, bool Ascending)
        {
            if (string.IsNullOrEmpty(SortField))
            {
                return q;
            }
            else
            {
                var param = Expression.Parameter(typeof(T), "p");
                var prop = Expression.Property(param, SortField);
                var exp = Expression.Lambda(prop, param);
                string method = Ascending ? "OrderBy" : "OrderByDescending";
                Type[] types = new Type[] { q.ElementType, exp.Body.Type };
                var mce = Expression.Call(typeof(Queryable), method, types, q.Expression, exp);
                return q.Provider.CreateQuery<T>(mce);
            }
        }

        public static IEnumerable<PropertyInfo> PropertiesThatContainText<T>(T obj, string searchText, StringComparison comparison = StringComparison.OrdinalIgnoreCase)
        {
            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
               .Where(p => p.PropertyType == typeof(string) && p.CanRead);

            foreach (PropertyInfo prop in properties)
            {
                string propVal = (string)prop.GetValue(obj, null);
                if (!string.IsNullOrEmpty(propVal))
                    if (propVal.StartsWith(searchText, comparison))
                        yield return prop;
            }
        }

        public static string GetEmptyIfNull(this string baseString)
        {
            return string.IsNullOrEmpty(baseString) ? String.Empty : baseString;
        }
    }

    public class TicketRepository : BaseRepository, ITicketRepository
    {
        private const string IdQuery = "@TicketTypes";
        // private readonly IUnitOfWork _unitOfWork;//

        public TicketRepository(
            IOptions<DatabaseAdvancedSettingsOptions> settingsOptions,
                       IQueryBuilder queryBuilder,
            IUnitOfWork unitOfWork) : base(settingsOptions, queryBuilder, unitOfWork, TableNames.TicketType, IdQuery)
        {
            //_unitOfWork = unitOfWork;//
        }

        public async Task<IEnumerable<AppUserRoles>> GetUserRoles(Users users)
        {
            var _users = new
            {
                UserEmail = users.UserEmail
            };
            return await QueryProcedureAsync<AppUserRoles>("usp_GetUserRole", _users);
        }

        public async Task<IEnumerable<TicketTypes>> GetAllTicketTypes()
        {
            return await QueryProcedureAsync<TicketTypes>("usp_GetTicketType");
        }

        public async Task<IEnumerable<Departments>> GetAllDepartment()
        {
            return await QueryProcedureAsync<Departments>("usp_GetDepartment");
        }

        public async Task<IEnumerable<Category>> GetAllCategory(CategoryType categoryType)
        {
            var _categoryType = new
            {
                DepartmentID = categoryType.DepartmentID,
                TicketTypeID = categoryType.TicketTypeID
            };
            return await QueryProcedureAsync<Category>("usp_GetCategory", _categoryType);
        }
        public async Task<IEnumerable<Priority>> GetAllPriority()
        {
            return await QueryProcedureAsync<Priority>("usp_GetPriority");
        }

        public async Task<IEnumerable<Employee>> GetAssignList(AssignList assignList)
        {
            var _users = new
            {
                UserEmail = assignList.UserEmail,
                DepartmentID = assignList.DepartmentID
            };
            return await QueryProcedureAsync<Employee>("usp_GetAssignToList", _users);

        }
        public async Task<EmailParam> AddTicketInformation(TicketInformation ticketInformation)
        {
            var SubmitData = new
            {
                TicketTypeID = ticketInformation.TicketTypeID,
                DepartmentID = ticketInformation.DepartmentID,
                CategoryID = ticketInformation.CategoryID,
                CreatedForEmail = ticketInformation.CreatedForEmail,
                CreatedForName = ticketInformation.CreatedForName,
                TicketTitle = ticketInformation.TicketTitle,
                PriorityID = ticketInformation.PriorityID,
                CreatedByName = ticketInformation.CreatedByName,
                CreatedByEmail = ticketInformation.CreatedByEmail,
                AssignToEmail = ticketInformation.AssignedToEmail,
                TicketComment = ticketInformation.TicketComment
            };
            return (await QueryProcedureAsync<EmailParam>("usp_AddTicketInformation", SubmitData)).First();
        }

        public async Task<bool> AddImagesByTicketID(TicketImage ticketImage)
        {
            await QueryProcedureAsync<TicketImage>("usp_AddTicketImages", ticketImage);
            return true;
        }
        public async Task<IEnumerable<Ticket>> GetLatestTicket(Users users)
        {
            var _users = new
            {
                UserEmail = users.UserEmail
            };
            return await QueryProcedureAsync<Ticket>("usp_GetLatestTickets", _users);
        }

        public async Task<IEnumerable<Ticket>> GetAllTickets(Users users)
        {
            var _users = new
            {
                UserEmail = users.UserEmail
            };
            return await QueryProcedureAsync<Ticket>("usp_GetAllTickets", _users);
        }

        public async Task<TicketEnhanced> GetAllTicketsServerOp(SearchQueryGrid searchQueryGrid)
        {
            TicketEnhanced ticketEnhanced = new TicketEnhanced();
            SearchQueryGrid _searchQueryGrid = searchQueryGrid;
            var _users = new
            {
                UserEmail = searchQueryGrid.UserEmail
            };
            var ticketRows = await QueryProcedureAsync<Ticket>("usp_GetAllTickets", _users);

            List<Ticket> filteredTicketList = new List<Ticket>();

            if (!string.IsNullOrEmpty(searchQueryGrid.GlobalSearchText))
            {
                /*Global Search Filtering */
                foreach (Ticket individualTicket in ticketRows)
                {
                    if (ExtensionMethod.PropertiesThatContainText(individualTicket, searchQueryGrid.GlobalSearchText).Any())
                        filteredTicketList.Add(individualTicket);
                }
            }
            else
            {
                filteredTicketList = ticketRows.ToList();
            }
            //List<Ticket> ticketList = ticketRows.ToList();


            List<Ticket> modifiedTicketList = new List<Ticket>();

            /*This is removed as we do not want result if the Global Search didn't match the values in the result*/
            //if(filteredTicketList.Count() > 0)
            //{
            //    modifiedTicketList = filteredTicketList;
            //}
            //else
            //{
            //    modifiedTicketList = ticketRows.ToList();
            //}

            modifiedTicketList = filteredTicketList;

            string searchColumn = string.Empty, searchText = string.Empty;
            bool noStatusRows = false, noPriorityRows = false;

            /*Filtering */
            foreach (SearchOptions searchOptions in searchQueryGrid.SearchOption)
            {
                searchColumn = searchOptions.SearchFilterColumn;
                searchText = searchOptions.SearchFilterText;
                if (searchColumn.ToUpper().Equals("Status", StringComparison.OrdinalIgnoreCase))
                {
                    var statusFiltered = modifiedTicketList.Where(x => x.TicketStatus.ToUpper().StartsWith(searchText.ToUpper())).ToList();
                    if (statusFiltered.Count() > 0)
                    {
                        noStatusRows = false;
                        modifiedTicketList = statusFiltered;
                    }
                    else
                    {
                        noStatusRows = true;
                    }
                }

                if (searchColumn.ToUpper().Equals("Priority", StringComparison.OrdinalIgnoreCase))
                {
                    var priorityFiltered = modifiedTicketList.Where(x => x.PriorityType.ToUpper().StartsWith(searchText.ToUpper())).ToList();
                    if (priorityFiltered.Count() > 0)
                    {
                        noStatusRows = false;
                        modifiedTicketList = priorityFiltered;
                    }
                    else
                    {
                        noStatusRows = true;
                    }
                }
            }

            if (noStatusRows && noPriorityRows)
            {
                modifiedTicketList = new List<Ticket>();
            }

            /*Sorting and pagination and offset*/
            if (modifiedTicketList.Count() > 0)
            {
                Constants.GridConfig.ColumnMapping.TryGetValue(searchQueryGrid.SortColumn, out string mappedSortColumn);
                var isAscending = searchQueryGrid.SortOrder.Equals("ASC", StringComparison.OrdinalIgnoreCase) ? true : false;
                var orderedList = modifiedTicketList.AsQueryable().OrderByField(mappedSortColumn, isAscending).ToList();

                //if(searchQueryGrid.Offset > 0)
                //{
                //    orderedList.RemoveRange(0, searchQueryGrid.Offset);
                //    if (orderedList.Count() > 0)
                //    {
                //        modifiedTicketList = orderedList.Take(Constants.GridConfig.DEFAULT_PAGE_SIZE).ToList();
                //    }
                //}
                int totalRowCountBeforeTakingDefaultRowCount = modifiedTicketList.Count();
                modifiedTicketList = orderedList.Skip(searchQueryGrid.Offset).Take(Constants.GridConfig.DEFAULT_PAGE_SIZE).ToList();

                if (modifiedTicketList.Count() > 0)
                {
                    decimal pageCount = (decimal)totalRowCountBeforeTakingDefaultRowCount / (decimal)Constants.GridConfig.DEFAULT_PAGE_SIZE;
                    _searchQueryGrid.TotalRowCount = totalRowCountBeforeTakingDefaultRowCount;
                    _searchQueryGrid.PageCount = (int)Math.Ceiling(pageCount);
                    _searchQueryGrid.PageRowCount = modifiedTicketList.Count();//Constants.GridConfig.DEFAULT_PAGE_SIZE;
                    _searchQueryGrid.DefaultPageSize = Constants.GridConfig.DEFAULT_PAGE_SIZE;
                }
                else
                {
                    _searchQueryGrid.TotalRowCount = modifiedTicketList.Count();
                    _searchQueryGrid.PageCount = modifiedTicketList.Count();
                    _searchQueryGrid.PageRowCount = modifiedTicketList.Count();
                    _searchQueryGrid.Offset = modifiedTicketList.Count();
                    _searchQueryGrid.DefaultPageSize = Constants.GridConfig.DEFAULT_PAGE_SIZE;
                }
            }
            else
            {
                _searchQueryGrid.TotalRowCount = modifiedTicketList.Count();
                _searchQueryGrid.PageCount = modifiedTicketList.Count();
                _searchQueryGrid.PageRowCount = modifiedTicketList.Count();
                _searchQueryGrid.Offset = modifiedTicketList.Count();
                _searchQueryGrid.DefaultPageSize = Constants.GridConfig.DEFAULT_PAGE_SIZE;
            }

            ticketEnhanced.tickets = modifiedTicketList;
            ticketEnhanced.SearchQueryGrid = _searchQueryGrid;
            return ticketEnhanced;
        }

        public async Task<IEnumerable<TicketExport>> GetAllTicketsForExport(TicketRange ticketRange)
        {
            return await QueryProcedureAsync<TicketExport>("usp_GetAllTicketsForExport", ticketRange);
        }

        public async Task<TicketDetail> GetTicketinfoById(int id)
        {
            var data = new
            {
                TicketID = id
            };
            TicketData ticketInformation = (await QueryProcedureAsync<TicketData>("usp_GetTicketInformationById", data)).ToList().First();
            IEnumerable<TicketImage> ticketImage = await QueryProcedureAsync<TicketImage>("usp_GetImageList", data);

            TicketDetail Ticketdata = new TicketDetail()
            {
                TicketData = ticketInformation,
                TicketImages = ticketImage
            };

            return Ticketdata;

        }

        public async Task<IEnumerable<TicketComments>> GetTicketComment(int id)
        {

            var Data = new
            {
                TicketID = id
            };

            return await QueryProcedureAsync<TicketComments>("usp_GetCommentList", Data);
        }

        public async Task<bool> AddTicketComment(TicketUpdate ticketComment)
        {
            var SubmitData = new
            {
                TicketID = ticketComment.TicketID,
                TicketDupID = ticketComment.TicketDupID,
                UserEmail = ticketComment.UserEmail,
                AssignedTo = ticketComment.AssignedTo,
                TicketComment = ticketComment.TicketComment,
                TicketStatusID = ticketComment.TicketStatusID,
            };
            await QueryProcedureAsync<TicketUpdate>("usp_AddTicketComment", SubmitData);
            return true;
        }

        public async Task<IEnumerable<TicketStatuses>> GetAllTicketStates()
        {
            return await QueryProcedureAsync<TicketStatuses>("usp_GetTicketStatus");
        }

        public async Task<EmailParam> UpdateTicket(TicketUpdate ticketUpdate)
        {
            var SubmitData = new
            {
                TicketID = ticketUpdate.TicketID,
                TicketDupID = ticketUpdate.TicketDupID,
                UserEmail = ticketUpdate.UserEmail,
                AssignedTo = ticketUpdate.AssignedTo,
                TicketComment = ticketUpdate.TicketComment,
                TicketStatusID = ticketUpdate.TicketStatusID,
            };
            return (await QueryProcedureAsync<EmailParam>("usp_UpdateTicket", SubmitData)).First();
        }

        public async Task<EmailParam> ReopenTicket(TicketUpdate ticketUpdate)
        {
            var SubmitData = new
            {
                TicketID = ticketUpdate.TicketID,
                TicketDupID = ticketUpdate.TicketDupID,
                UserEmail = ticketUpdate.UserEmail,
                AssignedTo = ticketUpdate.AssignedTo,
                TicketComment = ticketUpdate.TicketComment,
                TicketStatusID = ticketUpdate.TicketStatusID,
            };
            return (await QueryProcedureAsync<EmailParam>("usp_UpdateTicket", SubmitData)).First();
        }
        public async Task<bool> SaveUserData(UserData userData)
        {
            var SubmitData = new
            {
                UserEmail = userData.UserEmail,
                UserTheme = userData.UserTheme
            };
            await QueryProcedureAsync<UserData>("usp_SaveUserData", SubmitData);
            return true;
        }

    }
}
