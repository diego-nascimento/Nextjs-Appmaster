import { IPostEntry,IPostInfra } from '../../Data/Protocols/IPost-infra';
import { HttpResponse } from '../../Domain/protocols/IHttpHelpers';
import { api } from './AxiosApi'

export class PostInfra implements IPostInfra{
  async Post({ body, url }: IPostEntry): Promise<HttpResponse>{
    return await api.post(url, body).then((response) =>{
      switch (response.status) {
        case 200:
          return {
            StatusCode: 200,
            body: response.data
          }
      }
      
    })
      .catch((error) => {
        return {
          StatusCode: error.response.status,
          body: error.response.data
        }
    })
     
  }
}