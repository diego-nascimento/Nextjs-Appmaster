import { HttpRequest, HttpResponse } from "../../protocols/IHttpHelpers";


export interface IPost{
  handle(HttpRequest: HttpRequest): Promise<HttpResponse>
} 