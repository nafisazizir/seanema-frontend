import http from "../http-common";
import { AxiosResponse } from "axios";

interface Movie extends Record<string, number | string | Date> {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: string;
  ticket_price: number;
}

interface ShowtimesByDate {
  [date: string]: Showtime[];
}

interface Showtime {
  id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  movie_id: number;
}

class MovieDataService {
  getAllMovies(): Promise<AxiosResponse<Movie[]>> {
    return http.get("/movies");
  }

  getMovieDetails(id: number): Promise<AxiosResponse<Movie>> {
    return http.get(`/movies/${id}`);
  }

  getShowtimes(id: number): Promise<AxiosResponse<ShowtimesByDate>> {
    return http.get(`/movies/${id}/showtimes`);
  }

  getShowtimeDetails(id: number): Promise<AxiosResponse<Showtime>> {
    return http.get(`/movies/showtime-details/${id}`);
  }
}

export default new MovieDataService();
