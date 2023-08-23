using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class TicketEnhanced
    {
        public SearchQueryGrid SearchQueryGrid { get; set; }
        public List<Ticket> tickets { get; set; }
    }

    public class TicketGlobalSearch
    {
        public GlobalSearchGrid GlobalSearchGrid { get; set; }
        public List<Ticket> tickets { get; set; }
    }
}
