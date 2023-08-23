using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace KTS.Models.Common
{
    public class TicketExport
    {
        //[Column(name:"Ticket ID", Order = 1)]
        //public string TicketID { get; set; }
        //[Column(name: "Department Name", Order = 2)]
        //public string DepartmentName { get; set; }
        //[Column(name: "Type", Order = 3)]
        //public string Type { get; set; }
        //[Column(name: "Category", Order = 4)]
        //public string Category { get; set; }
        //[Column(name: "Title", Order = 5)]
        //public string Title { get; set; }
        //[Column(name: "Created By", Order = 6)]
        //public string CreatedBy { get; set; }
        //[Column(name: "Creator Email", Order = 7)]
        //public string CreatorEmail { get; set; }
        //[Column(name: "Created For", Order = 8)]
        //public string CreatedFor { get; set; }
        //[Column(name: "Created Date", Order = 9)]
        //public string CreatedDate { get; set; }
        //[Column(name: "Priority", Order = 10)]
        //public string Priority { get; set; }
        //[Column(name: "Status", Order = 11)]
        //public string Status { get; set; }
        //[Column(name: "Assigned To", Order = 12)]
        //public string AssignedTo { get; set; }
        //[Column(name: "Assigned To Email", Order = 13)]
        //public string AssignedToEmail { get; set; }
        //[Column(name: "Resolved By", Order = 14)]
        //public string ResolvedBy { get; set; }
        //[Column(name: "Resolver Email", Order = 15)]
        //public string ResolverEmail { get; set; }
        //[Column(name:"Resolved Date", Order = 16)]
        //public string ResolvedDate { get; set; }

        [Column(Order = 1)]
        public string Num { get; set; }
        [Column(Order = 1)]
        public string TicketID { get; set; }
        [Column(Order = 2)]
        public string DepartmentName { get; set; }
        [Column(Order = 3)]
        public string Type { get; set; }
        [Column(Order = 4)]
        public string Category { get; set; }
        [Column(Order = 5)]
        public string Title { get; set; }
        [Column(Order = 6)]
        public string CreatedBy { get; set; }
        [Column(Order = 7)]
        public string CreatorEmail { get; set; }
        [Column(Order = 8)]
        public string CreatedFor { get; set; }
        [Column(Order = 9)]
        public string CreatedDate { get; set; }
        [Column(Order = 10)]
        public string Priority { get; set; }
        [Column(Order = 11)]
        public string Status { get; set; }
        [Column(Order = 12)]
        public string AssignedTo { get; set; }
        // [Column(Order = 13)]
        // public string AssignedToEmail { get; set; }
        [Column(Order = 14)]
        public string ResolvedBy { get; set; }
        // [Column(Order = 15)]
        // public string ResolverEmail { get; set; }
        [Column(Order = 16)]
        public string ResolvedDate { get; set; }
        [Column(Order = 17)]
        public string ResolutionTime { get; set; }
    }
}
