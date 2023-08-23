using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class CRUDTicketType
    {
        public int? TicketTypeID { get; set; }
        public string TicketType { get; set; }
        public string Description { get; set; }
        public char Status { get; set; }
    }
}
