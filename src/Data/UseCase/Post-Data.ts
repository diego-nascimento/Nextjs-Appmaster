
import { HttpRequest, HttpResponse } from '../../Domain/protocols/IHttpHelpers';
import {IPost} from '../../Domain/UseCases/Post/Post-Domain'
import { IPostInfra} from '../Protocols/IPost-infra';

export class PostData implements IPost{
  private readonly PostInfra: IPostInfra

  constructor(PostInfra: IPostInfra) {
    this.PostInfra = PostInfra
  }

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse>{
    return this.PostInfra.Post({
      body: HttpRequest.body,
      url: HttpRequest.url
    })
  }
}