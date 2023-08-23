using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class TicketDetail { 
        public TicketData TicketData { get; set; }
        public IEnumerable<TicketImage> TicketImages { get; set; }
    }
}
