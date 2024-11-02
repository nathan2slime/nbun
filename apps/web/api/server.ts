import axios, { AxiosError } from 'axios'
import { cookies } from 'next/headers'

console.log(process.env.NEXT_PUBLIC_API_SERVER_URL)

export const api = axios.create({
  baseURL: new URL('api', process.env.NEXT_PUBLIC_API_SERVER_URL).toString()
})

api.interceptors.request.use(async req => {
  const cookie = await cookies()

  req.headers['Cookie'] = cookie.toString()

  req.withCredentials = true

  return req
})

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    return Promise.resolve({ data: null })
  }
)
