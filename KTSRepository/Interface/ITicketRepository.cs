using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KTS.Models.Common;
using System.Data;

namespace KTS.Repository.Interface
{
    public interface ITicketRepository
    {
        Task<IEnumerable<AppUserRoles>> GetUserRoles(Users users);
        Task<IEnumerable<TicketTypes>> GetAllTicketTypes();
        Task<IEnumerable<Departments>> GetAllDepartment();
        Task<IEnumerable<Category>> GetAllCategory(CategoryType categoryType);
        Task<IEnumerable<Priority>> GetAllPriority();
        Task<IEnumerable<Employee>> GetAssignList(AssignList assignList);
        Task<EmailParam> AddTicketInformation(TicketInformation ticketRequest);
        Task<bool> AddImagesByTicketID(TicketImage ticketImage);
        Task<IEnumerable<Ticket>> GetLatestTicket(Users users);
        Task<IEnumerable<Ticket>> GetAllTickets(Users users);
        Task<TicketEnhanced> GetAllTicketsServerOp(SearchQueryGrid searchQueryGrid);
        Task<IEnumerable<TicketExport>> GetAllTicketsForExport(TicketRange ticketRange);
        Task<TicketDetail> GetTicketinfoById(int id);
        Task<IEnumerable<TicketComments>> GetTicketComment(int id);
        Task<bool> AddTicketComment(TicketUpdate ticketComment);
        Task<IEnumerable<TicketStatuses>> GetAllTicketStates();
        Task<EmailParam> UpdateTicket(TicketUpdate ticketUpdate);
        Task<EmailParam> ReopenTicket(TicketUpdate ticketUpdate);
        Task<bool> SaveUserData(UserData userData);
    }
}
