import request from './http'


export const index = async (query) => {
  return await request.get('/v1/tag',{
    params:query
  })
}

export const del = async (id) => {
  return await request.delete('/v1/tag/'+id)
}
