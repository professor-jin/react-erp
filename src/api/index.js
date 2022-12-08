import request  from './request'

export const login = (data) => request.get('/request/api/admin/login', { params: {...data} })


