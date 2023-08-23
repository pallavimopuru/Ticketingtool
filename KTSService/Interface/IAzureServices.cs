using KTS.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace KTS.Service.Interface
{
    public interface IAzureServices
    {
        Task<(bool, string)> UploadFiles (IFormFile formFile);
        Task<FileData> DownloadFile(string fileName);
        Task<FileData> GetAssetFile(string fileName);
    }
}
