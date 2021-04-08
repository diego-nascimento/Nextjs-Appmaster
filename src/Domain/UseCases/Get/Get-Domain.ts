import { HttpRequest, HttpResponse } from "../../protocols/IHttpHelpers";


export interface IGet {
  handle(HttpRequest: HttpRequest): Promise<HttpResponse>
} 