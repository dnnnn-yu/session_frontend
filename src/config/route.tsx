import axios from 'axios';

// APIのドメインを設定する。
const baseURL = 'http://localhost:3000'

const authRequest = axios.create({
  baseURL: `${baseURL}/auth`
})

const railsApi = {
  authRequest: authRequest
}

export default railsApi;
