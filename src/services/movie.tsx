import http from "../http-common";
import { AxiosResponse } from "axios";

interface Movie {
  id: number;
  title: string;
  poster_url: string;
  age_rating: string;
}

class MovieDataService {
  getAllMovies(): Promise<AxiosResponse<Movie[]>> {
    return http.get("/movies");
  }
}

export default new MovieDataService();
