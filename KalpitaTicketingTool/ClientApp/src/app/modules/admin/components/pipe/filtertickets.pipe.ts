import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertickets'
})
export class FilterticketsPipe implements PipeTransform {

  transform(ticket: any,  serchTerm:  any): any {
    if (!ticket || !serchTerm) {
    return ticket;
  }
  return ticket.filter(
    (tickets:any)=>
    tickets.ticketTitle.toLowerCase().indexOf(serchTerm.toLowerCase()) !== -1 ||
    tickets.ticketStatus.toLowerCase().indexOf(serchTerm.toLowerCase()) !== -1
  )
}

}
