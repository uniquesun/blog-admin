import request from './http'


export const image = async (image) => {
  return await request.post('/v1/image', image)
}

export const file = async (file) => {
  return await request.post('/v1/file', file)
}