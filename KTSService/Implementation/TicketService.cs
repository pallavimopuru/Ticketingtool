using Azure.Storage.Blobs;
using KTS.Models.Common;
using KTS.Repository.Interface;
using KTS.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using SGHE = SendGrid.Helpers.Mail;

namespace KTS.Service.Implementation
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IEmailServices _emailService;
        private readonly IAzureServices _azureService;
        private readonly IConfiguration config;
        private readonly IExportServices _exportService;

        public TicketService(ITicketRepository TicketRepository, IEmailServices emailService, IAzureServices azureService
                            , IExportServices exportService, IConfiguration configuration)
        {
            _ticketRepository = TicketRepository ?? throw new ArgumentNullException(nameof(_ticketRepository));
            _emailService = emailService;
            _azureService = azureService;
            config = configuration;
            _exportService = exportService;
        }
        public async Task<List<AppUserRoles>> GetUserRoles(Users users)
        {
            IEnumerable<AppUserRoles> user;
            user = await _ticketRepository.GetUserRoles(users);
            return user.ToList();
        }
        public async Task<List<TicketTypes>> GetAllTicketTypes()
        {
            IEnumerable<TicketTypes> TicketTypes;
            TicketTypes = await _ticketRepository.GetAllTicketTypes();
            return TicketTypes.ToList();
        }

        public async Task<List<Departments>> GetAllDepartment()
        {
            IEnumerable<Departments> Department;
            Department = await _ticketRepository.GetAllDepartment();
            return Department.ToList();
        }

        public async Task<List<Category>> GetAllCategory(CategoryType categoryType)
        {
            IEnumerable<Category> Category;
            Category = await _ticketRepository.GetAllCategory(categoryType);
            return Category.ToList();
        }
        public async Task<List<Priority>> GetAllPriority()
        {
            IEnumerable<Priority> priority;
            priority = await _ticketRepository.GetAllPriority();
            return priority.ToList();
        }

        public async Task<List<Employee>> GetAssignList(AssignList assignList)
        {
            IEnumerable<Employee> user;
            user = await _ticketRepository.GetAssignList(assignList);
            return user.ToList();
        }

        public async Task<ResponseModel<bool>> AddTicket(TicketInformation ticketInformation)
        {
            bool isValidRequest = false;
            EmailParam emailParameters = await _ticketRepository.AddTicketInformation(ticketInformation);

            var fileUploadCount = 0;
            var fileCount = 0;
            if (ticketInformation.ImageAttachments != null)
            {
                fileCount = ticketInformation.ImageAttachments.Count();
                foreach (IFormFile formFile in ticketInformation.ImageAttachments)
                {
                    bool fileHasContent = false;
                    string fileName = String.Empty;
                    (fileHasContent, fileName) = await _azureService.UploadFiles(formFile);

                    if (fileHasContent)
                    {
                        fileUploadCount++;
                        await _ticketRepository.AddImagesByTicketID(new TicketImage
                        {
                            TicketID = emailParameters.TicketID,
                            ImageName = fileName
                        });
                    }
                }
            }

            if (emailParameters != null && (fileUploadCount == fileCount))
            {
                isValidRequest = true;
                //Write code to send email if only TicketStatusID has changed
                //This flag along with To Email address will be sent as a response when ReopenTicket / UpdateTicket is called
                if (emailParameters.IsSendEmail)
                    await _emailService.SendEmail(emailParameters);
            }
            var res = new ResponseModel<bool>();
            if (isValidRequest)
            {
                res.IsError = !isValidRequest;
                res.Message = "Ticket Information added successfully";
                res.Data = isValidRequest;
            }
            else
            {
                res.IsError = !isValidRequest;
                res.Message = "Error in adding Ticket Information";
                res.Data = isValidRequest;
            }
            return res;
        }

        public async Task<List<Users>> GetAllADUserList()
        {
            // The Azure AD tenant ID  (e.g. tenantId.onmicrosoft.com)
            var tenantId = config.GetValue<string>("AzureSettings:ADUserList:TenantId");
            // The client ID of the app registered in Azure AD
            var clientId = config.GetValue<string>("AzureSettings:ADUserList:ClientId");
            // Application Client Secret (Recommended this is stored safely and not hardcoded)
            var clientSecret = config.GetValue<string>("AzureSettings:ADUserList:ClientSecret");
            var authorityURL = config.GetValue<string>("AzureSettings:ADUserList:AuthorityURL").Replace("TENANTID", tenantId);
            var scopes = new string[] { config.GetValue<string>("AzureSettings:ADUserList:ScopeURL") };
            var confidentialClient = ConfidentialClientApplicationBuilder
                .Create(clientId)
                .WithAuthority(authorityURL)
                .WithClientSecret(clientSecret)
                .Build();

            GraphServiceClient graphServiceClient = new GraphServiceClient(new DelegateAuthenticationProvider
                 (async (requestMessage) =>
                 {
                     // Retrieve an access token for Microsoft Graph (gets a fresh token if needed).
                     var authResult = await confidentialClient.AcquireTokenForClient(scopes).ExecuteAsync();
                     // Add the access token in the Authorization header of the API
                     requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", authResult.AccessToken);
                 }));

            List<Users> orgUsers = new List<Users>();
            try
            {
                var users = await graphServiceClient.Users.Request().GetAsync();
                do
                {
                    foreach (User user in users)
                    {
                        if (user.Mail != null)
                        {
                            orgUsers.Add(new Users
                            {
                                UserEmail = user.Mail,
                                UserName = user.DisplayName
                            });
                        }
                    }
                }
                while (users.NextPageRequest != null && (users = await users.NextPageRequest.GetAsync()).Count > 0);

                //Filter the list which has only Kalpita Domain name : kalpitatechnologies.com
                var companyUserList = orgUsers.Where(i => i.UserEmail.Contains("kalpitatechnologies.com", StringComparison.OrdinalIgnoreCase)).ToList();
                return companyUserList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<Ticket>> GetLatestTicket(Users users)
        {
            IEnumerable<Ticket> latestTickets;
            latestTickets = await _ticketRepository.GetLatestTicket(users);
            return latestTickets.ToList();
        }

        public async Task<List<Ticket>> GetAllTickets(Users users)
        {
            IEnumerable<Ticket> latestTickets;
            latestTickets = await _ticketRepository.GetAllTickets(users);
            return latestTickets.ToList();
        }

        public async Task<TicketEnhanced> GetAllTicketsServerOp(SearchQueryGrid searchQueryGrid)
        {
            var latestTickets = await _ticketRepository.GetAllTicketsServerOp(searchQueryGrid);
            return latestTickets;
        }

        public async Task<TicketDetail> GetTicketById(int id)
        {
            return await _ticketRepository.GetTicketinfoById(id);
        }

        public async Task<FileData> DownloadFile(string fileName)
        {
            return await _azureService.DownloadFile(fileName);
        }

        public async Task<FileData> ExcelExport(TicketRange ticketRange)
        {
            Users users = new Users { UserEmail = ticketRange.UserEmail };
            //var alltickets = await _ticketRepository.GetAllTickets(users);
            //var dataByDateRange = alltickets.Where(i => i.CreatedDate >= ticketRange.StartDate && i.CreatedDate <= ticketRange.EndDate).ToList();

            var allTicketsDataByDateRange = await _ticketRepository.GetAllTicketsForExport(ticketRange);

            var excelFile = await _exportService.ExportExcel(allTicketsDataByDateRange, ticketRange);
            //Change this code once Excel Export with ClosedXML is ready
            return excelFile;
        }

        public async Task<List<TicketComments>> GetTicketComment(int id)
        {
            IEnumerable<TicketComments> ticketComments;
            ticketComments = await _ticketRepository.GetTicketComment(id);
            return ticketComments.ToList();
        }
        public async Task<ResponseModel<bool>> AddTicketComment(TicketUpdate ticketComment)
        {
            bool isValidRequest = false;
            //TicketDetail dataexists = await _ticketRepository.GetTicketinfoById(ticketComment.TicketID);
            //if (dataexists.TicketData.CreatedByEmail.Equals(ticketComment.UserEmail, StringComparison.OrdinalIgnoreCase)
            //    || dataexists.TicketData.AssignedToEmail.Equals(ticketComment.UserEmail, StringComparison.OrdinalIgnoreCase))
            //{
            //    isValidRequest = await _ticketRepository.AddTicketComment(ticketComment);
            //}
            isValidRequest = await _ticketRepository.AddTicketComment(ticketComment);
            var res = new ResponseModel<bool>();
            if (isValidRequest)
            {
                res.IsError = !isValidRequest;
                res.Message = "Comment added successfully";
                res.Data = isValidRequest;
            }
            else
            {
                res.IsError = !isValidRequest;
                res.Message = "Error in adding the Comment";
                res.Data = isValidRequest;
            }
            return res;
        }

        public async Task<List<TicketStatuses>> GetAllTicketStates()
        {
            IEnumerable<TicketStatuses> ticketStatuses;
            ticketStatuses = await _ticketRepository.GetAllTicketStates();
            return ticketStatuses.ToList();
        }

        public async Task<ResponseModel<bool>> UpdateTicket(TicketUpdate ticketUpdate)
        {
            bool isValidRequest = false;
            EmailParam emailParameters = await _ticketRepository.UpdateTicket(ticketUpdate);

            //var fileUploadCount = 0;
            //var fileCount = 0;
            //if (ticketUpdate.ImageAttachments != null)
            //{
            //    fileCount = ticketUpdate.ImageAttachments.Count();
            //    foreach (IFormFile formFile in ticketUpdate.ImageAttachments)
            //    {
            //        bool fileHasContent = false;
            //        string fileName = String.Empty;
            //        (fileHasContent, fileName) = await _azureService.UploadFiles(formFile);

            //        if (fileHasContent)
            //        {
            //            fileUploadCount++;
            //            await _ticketRepository.AddImagesByTicketID(new TicketImage
            //            {
            //                TicketID = emailParameters.TicketID,
            //                ImageName = fileName
            //            });
            //        }
            //    }
            //}

            //if (emailParameters != null && (fileUploadCount == fileCount))
            if (emailParameters != null)
            {
                isValidRequest = true;
                if (emailParameters.IsSendEmail)
                {
                    isValidRequest = !(await _emailService.SendEmail(emailParameters)).IsError;
                }
            }

            var res = new ResponseModel<bool>();
            if (isValidRequest)
            {
                res.IsError = !isValidRequest;
                res.Message = "Ticket updated successfully";
                res.Data = isValidRequest;
            }
            else
            {
                res.IsError = !isValidRequest;
                res.Message = "Error in updating the Ticket";
                res.Data = isValidRequest;
            }
            return res;
        }

        public async Task<ResponseModel<bool>> ReopenTicket(TicketUpdate ticketUpdate)
        {
            /*This is hard-coded as StatusID for Reopen is 4 in the table and will be triggered by a button from User page*/
            ticketUpdate.TicketStatusID = 4;

            bool isValidRequest = false;
            EmailParam emailParameters = await _ticketRepository.ReopenTicket(ticketUpdate);

            if (emailParameters != null)
            {
                isValidRequest = true;
                if (emailParameters.IsSendEmail)
                {
                    isValidRequest = !(await _emailService.SendEmail(emailParameters)).IsError;
                }
            }

            var res = new ResponseModel<bool>();
            if (isValidRequest)
            {
                res.IsError = !isValidRequest;
                res.Message = "Ticket updated successfully";
                res.Data = isValidRequest;
            }
            else
            {
                res.IsError = !isValidRequest;
                res.Message = "Error in updating the Ticket";
                res.Data = isValidRequest;
            }
            return res;
        }
        public async Task<ResponseModel<bool>> SaveUserData(UserData userData)
        {
            bool isValidRequest = false;
            isValidRequest = await _ticketRepository.SaveUserData(userData);
            var res = new ResponseModel<bool>();
            if (isValidRequest)
            {
                res.IsError = !isValidRequest;
                res.Message = "User data added successfully";
                res.Data = isValidRequest;
            }
            else
            {
                res.IsError = !isValidRequest;
                res.Message = "Error in adding the User data";
                res.Data = isValidRequest;
            }
            return res;
        }
    }
}
