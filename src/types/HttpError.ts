export type HttpError = {
  data: Error,
  status: number
}

type Error = {
  title: string,
  status: number
}