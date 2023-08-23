using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class EmailConfig
    {
        public string ToEmail { get; set; }
        public string ApiKey { get; set; }
        public string FromEmail { get; set; }
        public string FromEmailAlias { get; set; }
    }
}
