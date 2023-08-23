using KTS.Models.Common;
using KTS.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace KalpitaTicketingTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService TicketService)
        {
            _ticketService = TicketService ?? throw new ArgumentNullException(nameof(TicketService));
        }

        [Route("Roles")]
        [HttpGet]
        public async Task<ActionResult<List<AppUserRoles>>> UserRoles([FromQuery] Users users)
        {
            return await _ticketService.GetUserRoles(users);
        }

        [Route("TicketTypes")]
        [HttpGet]
        public async Task<ActionResult<List<TicketTypes>>> TicketTypes()
        {
            return await _ticketService.GetAllTicketTypes();
        }

        [Route("Departments")]
        [HttpGet]
        public async Task<ActionResult<List<Departments>>> Departments()
        {
            return await _ticketService.GetAllDepartment();
        }

        [Route("Categories")]
        [HttpGet]
        public async Task<ActionResult<List<Category>>> Categories([FromQuery] CategoryType categoryType)
        {
            return await _ticketService.GetAllCategory(categoryType);
        }

        [Route("EmployeeList")]
        [HttpGet]
        public async Task<List<Users>> GetAllADUserList()
        {
            return await _ticketService.GetAllADUserList();
        }

        [Route("Priorities")]
        [HttpGet]
        public async Task<ActionResult<List<Priority>>> Priorities()
        {
            return await _ticketService.GetAllPriority();
        }

        [Route("AssignList")]
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> AssignList([FromQuery] AssignList assignList)
        {
            return await _ticketService.GetAssignList(assignList);
        }

        [Route("AddTicket")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddTicket([FromForm] TicketInformation ticketInformation)
        {
            //IList<IFormFile> files = null;
            //if (Request.HasFormContentType)
            //{
            //    files = ticketInformation.ImageAttachments;
            //}
            //long size = files.Sum(f => f.Length);

            return await _ticketService.AddTicket(ticketInformation);
        }

        [Route("LatestTickets")]
        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> LatestTickets([FromQuery] Users users)
        {
            return await _ticketService.GetLatestTicket(users);
        }

        [Route("AllTickets")]
        [HttpGet]
        public async Task<ActionResult<List<Ticket>>> AllTickets([FromQuery] Users users)
        {
            return await _ticketService.GetAllTickets(users);
        }

        [Route("AllTicketsServerOp")]
        [HttpPost]
        public async Task<ActionResult<TicketEnhanced>> GetAllTicketsServerOp([FromBody] SearchQueryGrid searchQueryGrid)
        {
            return await _ticketService.GetAllTicketsServerOp(searchQueryGrid);
        }

        [Route("TicketById")]
        [HttpGet]
        public async Task<TicketDetail> TicketById(int id)
        {
            return await _ticketService.GetTicketById(id);
        }

        [HttpGet]
        [Route("DownloadFile")]
        public async Task<IActionResult> DownloadFile(string fileName)
        {
            var fileData = await _ticketService.DownloadFile(fileName);
            return File(fileData.FileStream, fileData.FileContentType, fileData.FileName);
        }

        [Route("ExcelExport")]
        [HttpGet]
        public async Task<IActionResult> ExcelExport([FromQuery] TicketRange ticketRange)
        {
            var fileData = await _ticketService.ExcelExport(ticketRange);
            return File(fileData.FileStream, fileData.FileContentType, fileData.FileName);
        }

        //[Route("ExcelExportServerOp")]
        //[HttpPost]
        //public async Task<ActionResult> ExcelExportServerOp([FromQuery] TicketRange ticketRange)
        //{
        //    var fileData = await _ticketService.ExcelExport(ticketRange);
        //    return File(fileData.FileStream, fileData.FileContentType, fileData.FileName);
        //}

        [Route("CommentList")]
        [HttpGet]
        public async Task<ActionResult<List<TicketComments>>> CommentList(int id)
        {
            return await _ticketService.GetTicketComment(id);
        }

        [Route("AddComment")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddComment(TicketUpdate ticketComment)
        {
            return await _ticketService.AddTicketComment(ticketComment);
        }

        [Route("TicketStatuses")]
        [HttpGet]
        public async Task<ActionResult<List<TicketStatuses>>> TicketStatuses()
        {
            return await _ticketService.GetAllTicketStates();
        }

        [Route("UpdateTicket")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> UpdateTicket(TicketUpdate ticketUpdate)
        {
            return await _ticketService.UpdateTicket(ticketUpdate);
        }


        [Route("ReopenTicket")]
        [HttpPatch]
        public async Task<ResponseModel<bool>> ReopenTicket(TicketUpdate ticketUpdate)
        {
            return await _ticketService.ReopenTicket(ticketUpdate);
        }

        [Route("AddTheme")]
        [HttpPost]
        public async Task<ResponseModel<bool>> AddTheme(UserData userData)
        {
            return await _ticketService.SaveUserData(userData);
        }
    }
}
