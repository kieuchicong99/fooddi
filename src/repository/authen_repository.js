import Repository from "./base_repository"

const resources = '/login'

export default {
    getListOffice(payload) {
        return Repository.post(`${Repository.baseUrl}${resources}`, payload)
    },


}
