using System;
using System.Collections.Generic;
using System.Text;
using KTS.FrameworkInterfaces;

namespace KTS.FrameworkInfrastructure
{
    public class UserContext : IUserContext
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string EmployeeId { get; set; }

    }
}
