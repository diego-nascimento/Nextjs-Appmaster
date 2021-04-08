import { HttpRequest, HttpResponse } from "../../protocols/IHttpHelpers";


export interface IPost{
  Post(HttpRequest: HttpRequest): Promise<HttpResponse>
} 