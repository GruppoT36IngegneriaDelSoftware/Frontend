import axios from 'axios';

const defInstanceAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API || 'http://localhost:1337',
});

function api<T>(url: string, params: any, data: Object): Promise<T> {
  // Serializzo i parametri
  let serialParams: string = new URLSearchParams(params).toString();
  if (serialParams.length > 0) serialParams = `?${serialParams}`;

  // Faccio la richiesta fetch.
  return defInstanceAPI(`${url}${serialParams}`, {
    data,
  })
    .then((response: any) => response.data)
    .catch((err: any) => {
      if (err.response) {
        // The request was made, but the server responded with a status code that falls out of the 2xx range
        const { status } = err.response;

        if (status === 401) {
          // The client must authenticate itself to get the requested response
        } else if (status === 502) {
          // The server got an invalid response
        }
      } else if (err.request) {
        // The request was made, but no response was received
      } else {
        // Some other error
      }
    });
}

function get<T>(url: string, params: any, options: Object): Promise<T> {
  // Faccio la richiesta fetch.
  return defInstanceAPI
    .get(`${url}`, {
      params,
      ...options,
    })
    .then((response: any) => response.data)
    .catch((err: any) => {
      if (err.response) {
        // The request was made, but the server responded with a status code that falls out of the 2xx range
        const { status } = err.response;

        if (status === 401) {
          // The client must authenticate itself to get the requested response
        } else if (status === 502) {
          // The server got an invalid response
        }
      } else if (err.request) {
        // The request was made, but no response was received
      } else {
        // Some other error
      }
    });
}

function post<T>(
  url: string,
  params: any,
  data: Object,
  options: Object
): Promise<T> {
  return defInstanceAPI
    .post(`${url}`, data, {
      params,
      ...options,
    })
    .then((response: any) => response.data)
    .catch((err: any) => {
      if (err.response) {
        // The request was made, but the server responded with a status code that falls out of the 2xx range
        const { status } = err.response;

        if (status === 401) {
          // The client must authenticate itself to get the requested response
        } else if (status === 502) {
          // The server got an invalid response
        }
      } else if (err.request) {
        // The request was made, but no response was received
      } else {
        // Some other error
      }
    });
}

function getOverPost<T>(
  url: string,
  params: any,
  data: Object,
  options: any
): Promise<T> {
  // eslint-disable-next-line no-param-reassign
  options.headers = {
    ...options?.headers,
    'X-HTTP-Method-Override': 'GET',
  };

  return defInstanceAPI
    .post(`${url}`, data, {
      params,
      ...options,
    })
    .then((response: any) => response.data)
    .catch((err: any) => {
      if (err.response) {
        // The request was made, but the server responded with a status code that falls out of the 2xx range
        const { status } = err.response;

        if (status === 401) {
          // The client must authenticate itself to get the requested response
        } else if (status === 502) {
          // The server got an invalid response
        }
      } else if (err.request) {
        // The request was made, but no response was received
      } else {
        // Some other error
      }

      return err;
    });
}

// export default api;
export default defInstanceAPI;
export { api, get, post, getOverPost };
