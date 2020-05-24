import Repository from "./base_repository"

const resources = '/offices'

export default {
    getListOffice() {
        return Repository.get(`${Repository.baseUrl}${resources}`)
    },

    
}
