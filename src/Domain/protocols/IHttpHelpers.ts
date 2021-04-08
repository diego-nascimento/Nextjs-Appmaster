export interface HttpRequest{
  body: any
  url: string
}

export interface HttpResponse {
  StatusCode: number
  body: any
}