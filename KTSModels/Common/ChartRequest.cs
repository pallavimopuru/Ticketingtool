using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class ChartRequest
    {
        public string? UserName { get; set; }
        public string UserEmail { get; set; }
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public string FilterRange { get; set; }
    }
}
