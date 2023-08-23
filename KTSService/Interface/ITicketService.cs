using KTS.Models.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KTS.Service.Interface
{
    public interface ITicketService
    {
        Task<List<AppUserRoles>> GetUserRoles(Users users);
        Task<List<TicketTypes>> GetAllTicketTypes();
        Task<List<Departments>> GetAllDepartment();
        Task<List<Category>> GetAllCategory(CategoryType categoryType);
        Task<List<Priority>> GetAllPriority();
        Task<List<Employee>> GetAssignList(AssignList assignList);
        Task<List<Users>> GetAllADUserList();
        Task<ResponseModel<bool>> AddTicket(TicketInformation ticketRequest);
        Task<List<Ticket>> GetLatestTicket(Users users);
        Task<List<Ticket>> GetAllTickets(Users users);
        Task<TicketEnhanced> GetAllTicketsServerOp(SearchQueryGrid searchQueryGrid);
        Task<TicketDetail> GetTicketById(int id);
        Task<FileData> DownloadFile(string fileName);
        Task<FileData> ExcelExport(TicketRange ticketRange);
        Task<List<TicketComments>> GetTicketComment(int id);
        Task<ResponseModel<bool>> AddTicketComment(TicketUpdate ticketComment);
        Task<List<TicketStatuses>> GetAllTicketStates();
        Task<ResponseModel<bool>> UpdateTicket(TicketUpdate ticketUpdate);
        Task<ResponseModel<bool>> ReopenTicket(TicketUpdate ticketUpdate);
        Task<ResponseModel<bool>> SaveUserData(UserData userData);

    }
}
