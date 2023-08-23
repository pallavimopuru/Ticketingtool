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
    public class DashBoardRepository : BaseRepository, IDashBoardRepository
    {
        private const string IdQuery = "@TicketTypes";
        // private readonly IUnitOfWork _unitOfWork;//
        public DashBoardRepository(
            IOptions<DatabaseAdvancedSettingsOptions> settingsOptions,
                       IQueryBuilder queryBuilder,
            IUnitOfWork unitOfWork) : base(settingsOptions, queryBuilder, unitOfWork, TableNames.TicketType, IdQuery)
        {
        }
        public async Task<IEnumerable<ChartAllStatusCount>> GetAllStatusCount(ChartRequest request)
        {
            var dataRequest = new
            {
                UserEmail = request.UserEmail.Trim(),
                DepartmentID = request.DepartmentID,
                DepartmentName = request.DepartmentName.Trim()
            };
            return await QueryProcedureAsync<ChartAllStatusCount>("usp_DBAllStatusCount", dataRequest);
        }
        public async Task<IEnumerable<ChartCurrentStatusCount>> GetCurrentStatusCount(ChartRequest request)
        {
            var dataRequest = new
            {
                UserEmail = request.UserEmail.Trim(),
                DepartmentID = request.DepartmentID,
                DepartmentName = request.DepartmentName.Trim()
            };
            return await QueryProcedureAsync<ChartCurrentStatusCount>("usp_DBPieByStatus", dataRequest);
        }
        public async Task<IEnumerable<ChartTicketTypeCount>> GetTicketTypeCount(ChartRequest request)
        {
            var dataRequest = new
            {
                UserEmail = request.UserEmail.Trim(),
                DepartmentID = request.DepartmentID,
                DepartmentName = request.DepartmentName.Trim()
            };
            return await QueryProcedureAsync<ChartTicketTypeCount>("usp_DBBarByTicketType", dataRequest);
        }
        public async Task<IEnumerable<ChartPriorityCount>> GetPriorityCount(ChartRequest request)
        {
            var dataRequest = new
            {
                UserEmail = request.UserEmail.Trim(),
                DepartmentID = request.DepartmentID,
                DepartmentName = request.DepartmentName.Trim()
            };
            return await QueryProcedureAsync<ChartPriorityCount>("usp_DBPieByPriority", dataRequest);
        }
        public async Task<IEnumerable<Users>> GetUsersByDepartment(ChartRequest request)
        {
            var dataRequest = new
            {
                UserEmail = request.UserEmail.Trim(),
                DepartmentID = request.DepartmentID,
                DepartmentName = request.DepartmentName.Trim()
            };
            return await QueryProcedureAsync<Users>("usp_UsersByDepartment", dataRequest);
        }
        public async Task<IEnumerable<ChartAssignee>> GetAllAssigneeByDepartmentCount(ChartRequest request)
        {
            IEnumerable<Users> usersByDepartment = await GetUsersByDepartment(request);
            List<ChartAssignee> chartDepartmentCount = new List<ChartAssignee>();

            ChartAssignee chartAssignee = null;
            foreach (Users users in usersByDepartment)
            {
                var dataRequest = new
                {
                    UserEmail = users.UserEmail.Trim(),
                    DepartmentID = request.DepartmentID,
                    DepartmentName = request.DepartmentName.Trim()
                };

                chartAssignee = new ChartAssignee();
                chartAssignee.AssineeName = users.UserName.Split(' ')[0];
                chartAssignee.ChartAssigneeCounts
                    = await QueryProcedureAsync<ChartAssigneeCount>("usp_DBColumnByAssignee", dataRequest);
                chartDepartmentCount.Add(chartAssignee);
            }
            return chartDepartmentCount;
        }

        public async Task<IEnumerable<FilterRange>> GetDBFilterRange(ChartRequest request)
        {
            var dataRequest = new
            {
                UserEmail = request.UserEmail.Trim(),
                DepartmentID = request.DepartmentID,
                DepartmentName = request.DepartmentName.Trim()
            };
            return await QueryProcedureAsync<FilterRange>("usp_DBDateRanges", dataRequest);
        }

        public async Task<IEnumerable<ChartPriorityRange>> GetAllPriorityCountByDepartment(ChartRequest request)
        {
            List<DateRangeInfo> DateRangeInfoMonths = await GetDateRangeInfo(request.FilterRange);
            List<ChartPriorityRange> chartPriorityRangeCount = new List<ChartPriorityRange>();

            ChartPriorityRange chartPriorityRange = null;
            foreach (DateRangeInfo dateRange in DateRangeInfoMonths)
            {
                var dataRequest = new
                {
                    UserEmail = request.UserEmail.Trim(),
                    DepartmentID = request.DepartmentID,
                    DepartmentName = request.DepartmentName.Trim(),
                    StartDate = dateRange.StartDate,
                    EndDate = dateRange.EndDate
                };

                chartPriorityRange = new ChartPriorityRange();
                chartPriorityRange.FilterRangeName = dateRange.SeriesName;
                chartPriorityRange.ChartPriorityCounts
                    = await QueryProcedureAsync<ChartPriorityCount>("usp_DBBarByPriority", dataRequest);
                chartPriorityRangeCount.Add(chartPriorityRange);
            }
            return chartPriorityRangeCount;
        }

        public async Task<List<DateRangeInfo>> GetDateRangeInfo(string filterRange)
        {
            List<DateRangeInfo> DateRangeInfoMonths = new List<DateRangeInfo>();
            if (int.TryParse(filterRange, out int yearNumber))
            {
                DateRangeInfoMonths = await GetMonths(new DateTime(yearNumber, DateTime.Now.Month, 1).Year, 12);
            }
            else if (filterRange.ToUpper().Contains("CURRENT"))
            {
                DateRangeInfoMonths = await GetWeeks(DateTime.Now.Year, DateTime.Now.Month);
            }
            else if (filterRange.ToUpper().Contains("PREVIOUS"))
            {
                DateRangeInfoMonths = await GetWeeks(DateTime.Now.Year, DateTime.Now.Month - 1);
            }
            else
            {
                DateRangeInfoMonths = await GetWeeks(2026, 5);
            }

            //    switch (filterRange.Replace(" ", string.Empty).ToUpper())
            //{
            //    case "CURRENTMONTH":

            //        break;
            //    case "PREVIOUSMONTH":

            //        break;
            //    case "ANYMONTH":

            //        break;
            //    default:

            //        break;
            //}
            return DateRangeInfoMonths;
        }

        public async Task<List<DateRangeInfo>> GetWeek(int requiredYear, int requiredMonth)
        {
            int countofDaysInRequiredMonth = DateTime.DaysInMonth(requiredYear, requiredMonth);
            List<DateRangeInfo> DateRangeInfoMonths = new List<DateRangeInfo>();
            DateRangeInfo DateRangeInfo;
            DateTime startDate;
            DateTime endDate;
            int loopForDays = 0;
            int daysToAdd = 0;
            int numberOfDaysInWeek = 7;
            for (int dateCount = 1; dateCount <= countofDaysInRequiredMonth; dateCount = dateCount + loopForDays)
            {
                startDate = Convert.ToDateTime(dateCount.ToString() + "/" + requiredMonth.ToString() + "/" + requiredYear.ToString());
                daysToAdd = numberOfDaysInWeek - (int)startDate.DayOfWeek;
                loopForDays = 1 + daysToAdd;
                if (startDate.Month == (startDate.AddDays(daysToAdd)).Month)
                    endDate = startDate.AddDays(daysToAdd);
                else
                    endDate = new DateTime(startDate.Year, startDate.Month, countofDaysInRequiredMonth);

                DateRangeInfo = new DateRangeInfo
                {
                    StartDate = startDate.ToString("MM/dd/yyyy"),
                    EndDate = endDate.ToString("MM/dd/yyyy"),
                    SeriesName = await GetSubString(startDate.ToString("MMM"))
                                 + startDate.Day.ToString("D2")
                                 + "-"
                                 + endDate.Day.ToString("D2")
                };
                DateRangeInfoMonths.Add(DateRangeInfo);
            }
            return DateRangeInfoMonths;
        }

        public async Task<List<DateRangeInfo>> GetWeeks(int requiredYear, int requiredMonth)
        {
            int countofDaysInRequiredMonth = 0;
            List<DateRangeInfo> DateRangeInfoMonths = new List<DateRangeInfo>();
            DateRangeInfo DateRangeInfo;
            DateTime startDate;
            DateTime endDate;
            int loopForDays = 0;
            int daysToAdd = 0;
            int numberOfDaysInWeek = 7;

            try
            {
                countofDaysInRequiredMonth = DateTime.DaysInMonth(requiredYear, requiredMonth);
                for (int dateCount = 1; dateCount <= countofDaysInRequiredMonth; dateCount = dateCount + loopForDays)
                {
                    startDate = new DateTime(requiredYear, requiredMonth, dateCount);
                    daysToAdd = numberOfDaysInWeek - (int)startDate.DayOfWeek;
                    loopForDays = 1 + daysToAdd;
                    if (startDate.Month == (startDate.AddDays(daysToAdd)).Month)
                        endDate = startDate.AddDays(daysToAdd);
                    else
                        endDate = new DateTime(requiredYear, requiredMonth, countofDaysInRequiredMonth);

                    DateRangeInfo = new DateRangeInfo
                    {
                        StartDate = startDate.ToString("MM/dd/yyyy"),
                        EndDate = endDate.ToString("MM/dd/yyyy"),
                        SeriesName = await GetSubString(startDate.ToString("MMM"))
                                     + startDate.Day.ToString("D2")
                                     + "-"
                                     + endDate.Day.ToString("D2")
                    };
                    DateRangeInfoMonths.Add(DateRangeInfo);
                }
                return DateRangeInfoMonths;
            }
            catch(Exception ex)
            {
                throw ex;
            }            
        }

        public async Task<List<DateRangeInfo>> GetMonths(int requiredYear, int totalMonths)
        {
            List<DateRangeInfo> DateRangeInfoMonths = new List<DateRangeInfo>();
            DateRangeInfo DateRangeInfo;
            DateTime startDate;
            DateTime endDate;
            for (int monthCount = 1; monthCount <= totalMonths; monthCount++)
            {
                startDate = new DateTime(requiredYear, monthCount, 1);
                endDate = new DateTime(requiredYear, monthCount, DateTime.DaysInMonth(requiredYear, monthCount));
                DateRangeInfo = new DateRangeInfo
                {
                    StartDate = startDate.ToString("MM/dd/yyyy"),
                    EndDate = endDate.ToString("MM/dd/yyyy"),
                    SeriesName = await GetSubString(startDate.ToString("MMM"))
                                //+ startDate.Day.ToString("D2")
                                //+ "-"
                                //+ endDate.Day.ToString("D2")
                };
                DateRangeInfoMonths.Add(DateRangeInfo);
            }
            return DateRangeInfoMonths;
        }

        public async Task<string> GetSubString(string stringToChange)
        {
            return stringToChange.ToUpper().Substring(0, 3);
        }
    }
}
