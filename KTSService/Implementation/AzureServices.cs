using KTS.Service.Interface;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KTS.Models.Common;
using Microsoft.AspNetCore.Http;
using System.IO;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;

namespace KTS.Service.Implementation
{
    public class AzureServices : IAzureServices
    {
        private readonly IConfiguration _azureConfig;
        public AzureServices(IConfiguration configuration)
        {
            _azureConfig = configuration;
        }
        public async Task<(bool, string)> UploadFiles(IFormFile formFile)
        {
            bool hasFileContent = false;
            string fileName = string.Empty;
            try
            {
                if (formFile.Length > 0)
                {
                    string fileExtension = Path.GetExtension(formFile.FileName);
                    var fileNamePrefix = _azureConfig.GetValue<string>("AzureSettings:StorageConfig:FileNamePrefix");
                    var timeStamp = _azureConfig.GetValue<string>("AzureSettings:StorageConfig:TimeStamp");
                    var storageConnectionString = _azureConfig.GetValue<string>("AzureSettings:StorageConfig:StorageConnectionString");
                    var containerName = _azureConfig.GetValue<string>("AzureSettings:StorageConfig:ContainerName");
                    fileName = string.Join("", fileNamePrefix, DateTime.Now.ToString(timeStamp), fileExtension);
                    BlobContainerClient blobContainerClient = new BlobContainerClient(storageConnectionString, containerName);
                    BlobClient blobClient = blobContainerClient.GetBlobClient(fileName);
                    using (var stream = formFile.OpenReadStream())
                    {
                        await blobClient.UploadAsync(stream, true);
                        stream.Close();
                    }
                    hasFileContent = true;
                }
                return (hasFileContent, fileName);
            }
            catch (Exception ex)
            {
                return (hasFileContent, fileName);
            }
        }

        public async Task<FileData> DownloadFile(string fileName)
        {
            var storageConnectionString = _azureConfig.GetValue<string>("AzureSettings:StorageConfig:StorageConnectionString");
            var containerName = _azureConfig.GetValue<string>("AzureSettings:StorageConfig:ContainerName");
            BlobContainerClient blobContainerClient = new BlobContainerClient(storageConnectionString, containerName);
            BlobClient blobClient = new BlobClient(storageConnectionString, containerName, fileName);
            if (await blobContainerClient.ExistsAsync())
            {
                if (await blobClient.ExistsAsync())
                {
                    using (var memStream = new MemoryStream())
                    {
                        await blobClient.DownloadToAsync(memStream);
                        memStream.Position = 0;
                        var contentType = (await blobClient.GetPropertiesAsync()).Value.ContentType;
                        return new FileData
                        {
                            FileStream = memStream.ToArray(),
                            FileContentType = contentType,
                            FileName = blobClient.Name
                        };
                    }
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
        public async Task<FileData> GetAssetFile(string fileName)
        {
            var storageConnectionString = _azureConfig.GetValue<string>("AzureSettings:StorageConfig:StorageConnectionString");
            var containerName = _azureConfig.GetValue<string>("AzureSettings:StorageConfig:ContainerName");
            BlobContainerClient blobContainerClient = new BlobContainerClient(storageConnectionString, containerName);
            BlobClient blobClient = new BlobClient(storageConnectionString, containerName + "\\Asset", fileName);
            if (await blobContainerClient.ExistsAsync())
            {
                if (await blobClient.ExistsAsync())
                {
                    using (var memStream = new MemoryStream())
                    {
                        await blobClient.DownloadToAsync(memStream);
                        memStream.Position = 0;
                        //return memStream;
                        var contentType = (await blobClient.GetPropertiesAsync()).Value.ContentType;
                        return new FileData
                        {
                            FileStream = memStream.ToArray(),
                            FileContentType = contentType,
                            FileName = blobClient.Name
                        };
                    }
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
