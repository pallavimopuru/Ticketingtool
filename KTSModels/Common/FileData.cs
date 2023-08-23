using System;
using System.Collections.Generic;
using System.Text;

namespace KTS.Models.Common
{
    public class FileData
    {
        public byte[] FileStream { get; set; }
        public string FileContentType { get; set; }
        public string FileName { get; set; }
    }
}
