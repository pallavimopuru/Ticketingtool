using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Models.Common
{
    public class CRUDDistributionList
    {
        public int DistributionListID { get; set; }
        public string DistributionListEmail { get; set; }
        public string DistributionListDescription { get; set; }
        public char Status { get; set; }
    }
}
