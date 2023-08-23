using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Models.Common
{
    public class ChartPriorityRange
    {
        public string FilterRangeName { get; set; }
        public IEnumerable<ChartPriorityCount> ChartPriorityCounts { get; set; }
    }
}
