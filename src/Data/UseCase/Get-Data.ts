
import { HttpRequest, HttpResponse } from '../../Domain/protocols/IHttpHelpers';
import {IGet} from '../../Domain/UseCases/Get/Get-Domain'
import { IGetInfra } from '../Protocols/IGet-Infra';

export class GetData implements IGet{
  private readonly GetInfra: IGetInfra

  constructor(GetInfra: IGetInfra) {
    this.GetInfra = GetInfra
  }

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse>{
    return this.GetInfra.Get({
      body: HttpRequest.body,
      url: HttpRequest.url
    })
  }
}