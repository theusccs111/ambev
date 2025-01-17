export default interface ApiResponse<TData>
{
  success?: boolean,
  message?: string,
  message_type?: string,
  message_detail?: string,
  data?: TData | undefined,
  list?: TData | undefined,
  total_records? : number
}
