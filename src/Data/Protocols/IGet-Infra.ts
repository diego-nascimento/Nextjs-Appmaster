import { HttpResponse } from "../../Domain/protocols/IHttpHelpers";

export interface IGetEntry{
  body: any
  url: string
}



export interface IGetInfra{
  Get({body, url}: IGetEntry): Promise<HttpResponse>
}