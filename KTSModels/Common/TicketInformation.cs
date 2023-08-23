using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace KTS.Models.Common
{
    public class TicketInformation 
    {
        public int? TicketTypeID { get; set; }
        public int? DepartmentID { get; set; }
        public int? CategoryID { get; set; }
        public string? CreatedForName { get; set; }
        public string? CreatedForEmail { get; set; }
        public string? TicketTitle { get; set; }
        public int? PriorityID { get; set; }
        public string? CreatedByName { get; set; }
        public string? CreatedByEmail { get; set; }
        public string? AssignedToEmail { get; set; }
        public string? TicketComment { get; set; }
        public IList<IFormFile>? ImageAttachments { get; set; }
    }
}
