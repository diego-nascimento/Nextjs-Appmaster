import { IGetInfra, IGetEntry } from '../../Data/Protocols/IGet-Infra';
import { HttpResponse } from '../../Domain/protocols/IHttpHelpers';
import { api } from './AxiosApi'

export class GetInfra implements IGetInfra{
  async Get({ body, url }: IGetEntry): Promise<HttpResponse>{
    try {
      const response = await api.post(url, body)
      return {
        StatusCode: response.status,
        body: response.data
      }
    } catch (error) {
      return {
        StatusCode: 500,
        body: 'Algo deu Errado, Tente mais tarde'
      }
    }
  }
}