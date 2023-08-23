using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class GlobalSearchGrid
    {
        public string? UserName { get; set; }
        public string UserEmail { get; set; }
        public string SearchText { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public int DefaultPageSize { get; set; }
        public int PageRowCount { get; set; }
        public int TotalRowCount { get; set; }
        public int PageCount { get; set; }
        public int Offset { get; set; }
    }
}
