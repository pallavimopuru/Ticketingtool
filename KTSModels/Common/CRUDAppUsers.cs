using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class CRUDAppUsers
    {
        public int UserID { get; set; }
        public string UserEmail { get; set; }
        public string? UserName { get; set; }
        public char Status { get; set; }
    }
}
