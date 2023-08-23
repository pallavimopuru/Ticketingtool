using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class AppUserRoles
    {
       
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public string RoleLandingPage { get; set; }
        public string DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public string UserTheme { get; set; }

    }
}
