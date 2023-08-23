using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class CRUDDepartment
    {
        public int? DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentDescription { get; set; }
        //public string UserName { get; set; }
        //public int UserID { get; set; }
        public int DistributionListID { get; set; }
        public string DistributionListEmail { get; set; }
        public string DefaultAssigneeEmail { get; set; }
        public char Status { get; set; }
    }
}
