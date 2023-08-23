using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class CRUDPriority
    {
        public int? PriorityID { get; set; }
        public string PriorityType { get; set; }
        public string Description { get; set; }
        public char Status { get; set; }
    }
}
