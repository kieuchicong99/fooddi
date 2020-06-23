export const HEADERS = {
  DEFAULT_HEADER: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  header: () => ({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    // Authorization: localStorage.getItem('jwt'),
  }),
  jsonHeader: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    // Authorization: localStorage.getItem('jwt'),
  }),
  file_header: () => ({
    'Content-Type': 'multipart/form-data',
    // Authorization: localStorage.getItem('jwt'),
  }),
};

export const API_URLS = {
  //USER
  USER: {
    getUsers: () => {
      return {
        endPoint: `/api/users`,
        method: 'GET',
        headers: HEADERS.header(),
        name: 'GET_USERS',
      };
    },
    insertUser: (payload) => ({
      endPoint: '/api/users',
      method: 'POST',
      headers: HEADERS.jsonHeader(),
      name: 'ADD_USER',
      payload,
    }),
    updateUser: (userid, payload) => {
      console.log("api => payload:", payload)
      console.log("api => userid:", userid)
      return {
        endPoint: `/api/users/${userid}`,
        method: 'PUT',
        headers: HEADERS.jsonHeader(),
        name: 'EDIT_USER',
        payload,
      }
    },
    deleteUser: (userid) => ({
      endPoint: `/api/users/${userid}`,
      method: 'DELETE',
      headers: HEADERS.header(),
      name: 'DELETE_USER',
    }),

  },

};
