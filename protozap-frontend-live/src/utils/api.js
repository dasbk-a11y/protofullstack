import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const authAPI = {
  register: d => api.post('/auth/register', d),
  login: d => api.post('/auth/login', d),
  me: () => api.get('/auth/me')
}

export const materialsAPI = {
  list: (params) => api.get('/materials', { params }),
  get: id => api.get(`/materials/${id}`),
  categories: () => api.get('/materials/categories')
}

export const servicesAPI = {
  list: () => api.get('/services'),
  get: slug => api.get(`/services/${slug}`)
}

export const quoteAPI = {
  create: d => api.post('/quote', d),
  list: () => api.get('/quote'),
  get: id => api.get(`/quote/${id}`)
}

export const ordersAPI = {
  list: () => api.get('/orders'),
  get: id => api.get(`/orders/${id}`)
}

export const uploadAPI = {
  upload: formData => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  dfm: fileId => api.get(`/upload/dfm/${fileId}`)
}

export const contactAPI = {
  submit: d => api.post('/contact', d),
  affiliate: d => api.post('/contact/affiliate', d),
  sponsorship: d => api.post('/contact/sponsorship', d),
  spotlight: d => api.post('/contact/spotlight', d)
}

export const tutorialsAPI = {
  list: () => api.get('/tutorials'),
  categories: () => api.get('/tutorials/categories')
}

export const resourcesAPI = {
  faq: () => api.get('/resources/faq'),
  enterprise: () => api.get('/resources/enterprise'),
  designGuide: () => api.get('/resources/design-guide')
}

export default api
