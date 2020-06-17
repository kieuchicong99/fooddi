import axios from 'axios'

const baseDomain = 'http://45.32.23.158:8000';
const baseUrl = `${baseDomain}/api`;
const repository = axios.create({
    baseUrl: baseUrl
}
)
repository.baseUrl = baseUrl
export default repository