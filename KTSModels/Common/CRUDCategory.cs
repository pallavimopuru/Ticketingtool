using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class CRUDCategory
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int TicketTypeID { get; set; }
        public string TicketType { get; set; }
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public char Status { get; set; }
    }
}
