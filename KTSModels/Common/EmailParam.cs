using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class EmailParam
    {
        public int TicketID { get; set; }
        public string TicketDupID { get; set; }
        public string EmailSubject { get; set; }
        public string EmailRecipient { get; set; }
        public string EmailCarbonCopies { get; set; }
        public string EmailBody { get; set; }
        public bool IsSendEmail { get; set; }
    }

}
