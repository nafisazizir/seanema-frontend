import http from "../http-common";
import { AxiosResponse } from "axios";

interface Seat {
  availableSeats: number[];
}

interface Ticket {
  id: number;
  user_id: number;
  showtime_id: number;
  seat_number: number[];
  transaction_date: string;
  total_cost: number;
  status: string;
}

class TicketDataService {
  bookTickets(params: any): Promise<AxiosResponse<Ticket>> {
    return http.post(`/tickets/book`, params);
  }

  getAvailableSeats(showtimeId: number): Promise<AxiosResponse<Seat>> {
    return http.get(`/tickets/seats/${showtimeId}`);
  }
}

export default new TicketDataService();
