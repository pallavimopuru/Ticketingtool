using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Models.Common
{
    public class ChartAssignee
    {
        public string AssineeName { get; set; }
        public IEnumerable<ChartAssigneeCount> ChartAssigneeCounts { get; set; }
    }
}
