import {GetData, GetInfra } from './Protocols'

export const GetFactory = () => {
  const Get_Infra = new GetInfra()
  return new GetData(Get_Infra)
}