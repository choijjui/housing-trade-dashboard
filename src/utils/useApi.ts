import { useRef, useEffect, MutableRefObject } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import qs from 'querystring';

type TParams = { [propName: string]: any; } | string;

interface UseApiCall {
  get: (url: string, params?: TParams) => any;
  // post: (url: string, data?: TParams) => any;
}

export default function useApiCall(): UseApiCall {
  const _apiCall: MutableRefObject<AxiosInstance | null> = useRef(null);

  useEffect(() => {
    const apiCall = axios.create({
      headers: {
        Accept: '*/*',
        Expires: -1,
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
  
    apiCall.interceptors.response.use(resSuccess, resError);
    apiCall.interceptors.request.use(reqConfig);
  
    _apiCall.current = apiCall;
  
  }, []);

  function reqConfig(config: AxiosRequestConfig) {
    return config;
  }

  function resSuccess(response: AxiosResponse) {
    return response;
  }

  function resError(error: AxiosError) {
    let err;

    if (axios.isCancel(error)) {
      console.log('API 요청이 취소되었습니다.', error);
      return Promise.reject({ msg: '' });
    }

    try {
      err = error.response?.data;
    } catch (e) {
      err = error;
    }
    
    switch (error.response?.status) {
      case 500:
        if (typeof err === 'string') {
          err = { msg: err };
        } else if (err?.message) {
          err = { msg: err?.message ?? '서버에러가 발생하였습니다.' };
        } else if (err?.msg) {
          err = { ...err };
        } else {
          err = { msg: '서버에러가 발생하였습니다.' };
        }
        break;

      default:
        if (!err?.msg) {
          err = { msg: '서버에러가 발생하였습니다.' };
        }
    }

    return Promise.reject(err);
  }

  function get(url: string, params = {}) {
    return (_apiCall.current as AxiosInstance)
      .request({
        method: 'GET',
        url,
        params: {
          serviceKey: `${process.env.REACT_APP_SERVICE_KEY}`,
          _type: 'json',
          ...params,
        },
        responseType: 'json',
      })
      .then(response => {
        return Promise.resolve(response.data.response ?? response.data);
      });
  }

  return { get };
}

