using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class TicketComments
    {
        public int TicketCommentID { get; set; }
        public int TicketID { get; set; }
        public string Comment { get; set; }
        public int TicketStatusID { get; set; }
        public string TicketStatus { get; set; }          
        public string CommentedBy { get; set; }
        public string TicketColor { get; set; }
        public string Date { get; set; }
    }
}
