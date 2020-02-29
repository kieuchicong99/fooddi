import { Constants } from './Omni';

const EURONUTRITION_DOMAIN = Constants.devDomain;
class NutritionWorker {
  init = ({ baseUrl, token }) => {
    this.baseUrl = baseUrl || EURONUTRITION_DOMAIN;
    this.authzToken = token ? token : '';
  };

  setToken(token) {
    if (token) this.authzToken = token;
  }

  setBaseUrl(url) {
    if (url) this.baseUrl = url;
  }

  clearToken() {
    this.authzToken = '';
  }

  login = async (username, password) => {
    const res = await this.post('/account/v1/users/login', {
      params: { Password: password, UserName: username },
    });

    return res.error ? res : res.Data;
  };

  loadUserProfile = async () => {
    if (this.authzToken) {
      const res = await this.post('/account/v1/users/login/withtoken');

      return res.error ? res : res.Data;
    }

    return undefined;
  };

  changePassword = async payload => {
    if (this.authzToken) {
      const res = await this.put('/account/v1/users/change_password', { params: payload });

      return res.error ? res : res.Data;
    }

    return undefined;
  };

  updateReceivedWeight = async payload => {
    if (this.authzToken) {
      const res = await this.post(`/supplier/v1/reports/updateordersummary`, {
        params: payload,
      });

      return res;
    }

    return undefined;
  };

  get = async function(endpoint, data) {
    return await this._request('GET', endpoint, data);
  };

  post = async function(endpoint, data) {
    return await this._request('POST', endpoint, data);
  };

  put = async function(endpoint, data) {
    return await this._request('PUT', endpoint, data);
  };

  patch = async function(endpoint, data) {
    return await this._request('PATCH', endpoint, data);
  };

  delete = async function(endpoint, data) {
    return await this._request('DELETE', endpoint, data);
  };

  _getUrl = function(endpoint) {
    return endpoint.startsWith('/') ? `${this.baseUrl}${endpoint}` : `${this.baseUrl}/${endpoint}`;
  };

  _join = function(obj, separator) {
    const arr = [];
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      if (val || val === false) {
        arr.push(`${key}=${val}`);
      }
    });

    return arr.join(separator);
  };

  _request = function(method, endpoint, newData) {
    const url = this._getUrl(endpoint);
    // const data = newData.params ? toPascalCase(newData.params) : false;
    const data = newData && newData.params ? newData.params : false;
    const headers = newData && newData.headers ? newData.headers : false;
    const defaultHeaders = {
      Authorization: this.authzToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const params = {
      url,
      method,
      headers: headers ? Object.assign(defaultHeaders, headers) : defaultHeaders,
      // encoding: this.encoding,
      // timeout: this.timeout,
    };

    if (method === 'GET') {
      params.headers['Cache-Control'] = 'no-cache';
      if (data) {
        params.url = `${params.url}?${this._join(data, '&')}`;
      }
    } else if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
      if (data) {
        // log(JSON.stringify(data));
        params.body = JSON.stringify(data);
      }
      //   params.headers = {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   };
      //   params.body = JSON.stringify(data);
    }

    // log(`Fetch ${params.url}`);
    return fetch(params.url, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else if (res.status === 401) {
          res.error = {
            status: res.status,
            code: res.code,
            detail: res.detail,
          };
          // res.data = {};

          return res;
        }

        return false;
      })
      .then(res => {
        if (!res) {
          return {};
        } else if (res.error) {
          return res;
        }

        return {
          ...res,
        };
      })
      .catch(e => Promise.reject(e));
  };
}

const nutritionWorker = new NutritionWorker();
export default nutritionWorker;
