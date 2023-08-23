using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class CRUDAppUserRoles
    {     
        public int ID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public char Status { get; set; }
    }
}
