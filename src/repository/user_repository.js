import Repository from "./base_repository"

const resources = '/users'

export default {
    getListUser() {
        return Repository.get(`${Repository.baseUrl}${resources}`)
    },

    
}
