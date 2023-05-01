import request from './http'


export const me = async () => {
  return await request.get('/v1/me')
}

export const update = async (data) => {
  return await request.put('/v1/me',data)
}
