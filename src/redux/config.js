export const PREFIX = {

  ACCOUNT: 'ACCOUNT',
  BILL: 'BILL',
  API_CALLING: 'API_CALLING',
  API_CALLED_SUCCESS: 'API_CALLED_SUCCESS',
  API_CALLED_FAILURE: 'API_CALLED_FAILURE',
};

export const typesWithPrefix = (prefix) => (key) => `${prefix}_${key}`;
