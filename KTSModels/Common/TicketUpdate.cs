using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace KTS.Models.Common
{
    public class TicketUpdate
    {
        public int TicketID { get; set; }
        public string TicketDupID { get; set; }
        public string UserEmail { get; set; }
        public string AssignedTo { get; set; }
        public string? TicketComment { get; set; }
        public int TicketStatusID { get; set; }
        //public IList<IFormFile>? ImageAttachments { get; set; }
    }
}