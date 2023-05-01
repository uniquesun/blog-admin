import request from './http'


export const create = async (data) => {
  return await request.post('/v1/category',data)
}

export const index = async (query) => {
  return await request.get('/v1/category',{
    params:query
  })
}

export const update = async (id,data) => {
  return await request.put('/v1/category/'+id,data)
}

export const del = async (id) => {
  return await request.delete('/v1/category/'+id)
}
