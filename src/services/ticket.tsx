import http from "../http-common";
import { AxiosResponse } from "axios";

interface Seat {
  availableSeats: number[];
}

interface Ticket {
  id: number;
  user_id: number;
  showtime_id: number;
  seat_number: string;
  transaction_date: string;
  total_cost: number;
  status: string;
}

interface TicketHistory {
  id: number;
  seat_number: string;
  transaction_date: string;
  total_cost: number;
  status: string;
  user_id: number;
  showtime_id: number;
  showtime: Showtime;
}

interface Showtime {
  id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  movie_id: number;
  movie: Movie;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: string;
  ticket_price: number;
}

class TicketDataService {
  bookTickets(params: any): Promise<AxiosResponse<Ticket>> {
    return http.post(`/tickets/book`, params);
  }

  getTicketDetails(id: number): Promise<AxiosResponse<Ticket>> {
    return http.get(`/tickets/${id}`);
  }

  updatePayment(id: number): Promise<AxiosResponse<Ticket>> {
    return http.post(`/tickets/payment/${id}`);
  }

  cancelPayment(id: number): Promise<AxiosResponse<Ticket>> {
    return http.post(`/tickets/cancel/${id}`);
  }

  getAvailableSeats(showtimeId: number): Promise<AxiosResponse<Seat>> {
    return http.get(`/tickets/seats/${showtimeId}`);
  }

  getTicketHistory(): Promise<AxiosResponse<TicketHistory[]>> {
    return http.get(`/tickets/history`);
  }
}

export default new TicketDataService();
