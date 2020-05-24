import axios from 'axios'

const baseDomain = 'https://quanlynhahanguet.herokuapp.com';
const baseUrl = `${baseDomain}/api`;
const repository = axios.create({
        baseUrl: baseUrl
    }
)
repository.baseUrl = baseUrl
export default repository