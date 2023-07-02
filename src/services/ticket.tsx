import http from "../http-common";
import { AxiosResponse } from "axios";

interface Seat {
  availableSeats: number[];
}

class TicketDataService {
  getAvailableSeats(showtimeId: number): Promise<AxiosResponse<Seat>> {
    return http.get(`/tickets/seats/${showtimeId}`);
  }
}

export default new TicketDataService();
