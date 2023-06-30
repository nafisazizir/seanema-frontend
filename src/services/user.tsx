import http from "../http-common";
import { AxiosResponse } from "axios";

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
  balance: number;
}

class UserDataService {
  register(params: any): Promise<AxiosResponse<User>> {
    return http.post("/user/register", params);
  }
}

export default new UserDataService();
