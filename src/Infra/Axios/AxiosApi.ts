import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://diego-sistema-pedido.herokuapp.com/',
});
