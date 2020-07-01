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

  FOOD: {
    getFoods: () => {
      return {
        endPoint: `/api/foods`,
        method: 'GET',
        headers: HEADERS.header(),
        name: 'GET_FOODS',
      };
    },
    insertFood: (payload) => ({
      endPoint: '/api/foods/',
      method: 'POST',
      headers: HEADERS.jsonHeader(),
      name: 'ADD_FOOD',
      payload,
    }),
    updateFood: (foodid, payload) => {
      console.log("api => payload:", payload)
      console.log("api => foodid:", foodid)
      return {
        endPoint: `/api/foods/${foodid}`,
        method: 'PUT',
        headers: HEADERS.jsonHeader(),
        name: 'EDIT_FOOD',
        payload,
      }
    },
    deleteFood: (foodid) => ({
      endPoint: `/api/foods/${foodid}`,
      method: 'DELETE',
      headers: HEADERS.header(),
      name: 'DELETE_FOOD',
    }),

  },
  //BILL
  BILL: {
    createCustomer: (payload) => {
      console.log('api =>createCustomer => payload', payload)
      return {
        endPoint: `/api/customers`,
        method: 'POST',
        headers: HEADERS.jsonHeader(),
        name: 'CREATE_CUSTOMER',
        payload,
      };
    },

    getTables: () => {
      return {
        endPoint: `/api/tables?status=True`,
        method: 'GET',
        headers: HEADERS.header(),
        name: 'GET_TABLE_BILL',
      };
    },

    createBill: (payload) => {
      console.log('api =>createBill => payload', payload)
      return {
        endPoint: `/api/bills`,
        method: 'POST',
        headers: HEADERS.jsonHeader(),
        name: 'CREATE_BILL',
        payload,
      };
    },

    getFoods: () => {
      return {
        endPoint: `/api/food-group`,
        method: 'GET',
        headers: HEADERS.header(),
        name: 'GET_FOODS_GROUP',
      };
    },

    orderFoods: (payload) => {
      return {
        endPoint: `/api/bill-detail`,
        method: 'POST',
        headers: HEADERS.header(),
        name: 'GET_FOODS_GROUP',
        payload
      };
    }

  },

};
