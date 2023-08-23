using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class AzureConfig
    {
        public string StorageConnectionString { get; set; }
        public string ContainerName { get; set; }
        public string FileNamePrefix { get; set; }
        public string TimeStamp { get; set; }
    }
}
