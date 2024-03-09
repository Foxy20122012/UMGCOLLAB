export interface ICommonResponse<T> {
  message: string
  status: number
  data?: T
}
