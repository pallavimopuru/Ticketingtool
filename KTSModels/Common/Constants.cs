using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public static class Constants
    {
        public static class ExcelFileConfig
        {
            public const string COMPANY_NAME = "Kalpita Technologies";
            public const string WORKSHEET_NAME = "Kalpita";
            public const string REPORT_TITLE = "Report Name";
            public const string DATE_TITLE = "Date";
            public const string DEPARTMENT_TITLE = "Department";
            public const string ADDITIONAL_TITLE = "Additional Selections";
            public const string REPORT_NAME = "Ticketing Tool Report";
            public const string REPORT_DATE_FORMAT = "dd MMM yyyy";
            public const string FILE_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            public const string FILE_EXTENSION = ".xlsx";
            public const string FILE_PREFIX = "TicketingToolReport_";
            public const string FILE_TIMESTAMP = "yyyyMMddhhmmssfff";
            public const string FILE_BRAND_LOGO = "KalpitaBrandLogo.png";
        }

        public static class GridConfig
        {
            public const int DEFAULT_PAGE_SIZE = 10;

            public static readonly Dictionary<string, string> ColumnMapping
                                                = new Dictionary<string, string>
                                            {
                                                { "TicketID", "TicketDupID" },
                                                { "CreatedBy", "CreatedByName" },
                                                { "Department", "DepartmentName" },
                                                { "Category", "CategoryName" },
                                                { "Title", "TicketTitle" },
                                                { "CreatedOn", "CreatedDate" },
                                                { "Priority", "PriorityType" },
                                                { "AssignedTo", "AssignedTo" },
                                                { "Status", "TicketStatus" }
                                            };


        }
    }
}
