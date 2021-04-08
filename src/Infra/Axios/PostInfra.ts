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
        case 400:
        case 404:
          return {
            StatusCode: response.status,
            body: 'Não Encontrado'
          }
      }
      
    })
      .catch((error) => {
        console.log(error.response.status)
        return {
          StatusCode: error.response.status,
          body: error.response.data
        }
    })
     
  }
}