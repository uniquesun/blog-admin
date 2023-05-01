import request from './http'


export const create = async (data) => {
  return await request.post('/v1/article', data)
}

export const index = async (query) => {
  return await request.get('/v1/article', {
    params: query
  })
}

export const show = async (id) => {
  return await request.get('/v1/article' + id)
}

export const update = async (id, data) => {
  return await request.put('/v1/article' + id, data)
}

export const del = async () => {
  return await request.delete('/v1/article' + id)
}
