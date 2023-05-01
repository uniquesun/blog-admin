import request from './http'


export const login = async (data) => {
  return await request.post('/v1/login',data)
}

export const tokenRefresh = async () => {
  return await request.put('/v1/tokenRefresh')
}

export const logout = async () => {
  return await request.delete('/v1/logout')
}

export const register = async (data) => {
  return await request.post('/v1/register',data)
}
