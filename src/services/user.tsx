import http from "../http-common";
import axios from "axios";
import { AxiosResponse } from "axios";
import { setAuthToken } from "../hooks/setAuthToken";

interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
  balance: number;
}

interface Token {
  message: string;
  token: string;
}

class UserDataService {
  register(params: any): Promise<AxiosResponse<User>> {
    return http.post("/user/register", params);
  }

  login(params: any): Promise<AxiosResponse<Token>> {
    return http
      .post("/user/login", params)
      .then((response: AxiosResponse<Token>) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAuthToken(token);

        return response;
      });
  }

  getBalance(): Promise<AxiosResponse<User>> {
    return http.get("user/balance");
  }
}

export default new UserDataService();
