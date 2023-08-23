using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class Ticket
    {
        public string TicketDupID { get; set; }
        public int TicketID { get; set; }
        public string DepartmentName { get; set; }
        public string TicketType { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int PriorityID { get; set; }
        public string PriorityType { get; set; }
        public string TicketTitle { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedByEmail { get; set; }
        public string CreatedDate { get; set; }
        public int TicketStatusID { get; set; }
        public string TicketStatus { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedToEmail { get; set; }
        public string ResolvedBy { get; set; }
        public string ResolvedByEmail { get; set; }
        public string ResolvedDate { get; set; }
    }
}
