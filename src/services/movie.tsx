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

class MovieDataService {
  getAllMovies(): Promise<AxiosResponse<Movie[]>> {
    return http.get("/movies");
  }

  getMovieDetails(id: number): Promise<AxiosResponse<Movie>> {
    return http.get(`/movies/${id}`);
  }
}

export default new MovieDataService();
