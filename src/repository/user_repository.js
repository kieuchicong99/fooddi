import Repository from "./base_repository"

const resources = '/users'

export default {
    getListUser: () => (
        Repository.get(`${Repository.baseUrl}${resources}`)
    ),
    delUser: (id) => (
        Repository.delete(`${Repository.baseUrl}${resources}/${id}`)
    ),
    login: (param) => (
        Repository.post(`${Repository.baseUrl}/login`, param)
    )


}