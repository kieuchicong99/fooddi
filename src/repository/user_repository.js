import Repository from "./base_repository"

const resources = '/users'

export default {
    getListUser: () => (
        Repository.get(`${Repository.baseUrl}${resources}`)
    ),
    delUser: (id) => (
        Repository.delete(`${Repository.baseUrl}${resources}/${id}`)
    ),
    createUser: (payload) => (
        Repository.post(`${Repository.baseUrl}${resources}`, payload)
    ),
    updateUser: (id, payload) => (
        Repository.put(`${Repository.baseUrl}${resources}/${id}`, payload)
    ),
    login: (param) => (
        Repository.post(`${Repository.baseUrl}/login`, param)
    )


}