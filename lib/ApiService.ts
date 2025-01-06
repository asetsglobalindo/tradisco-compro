import axios, {AxiosResponse} from "axios";
import JSCookie from "js-cookie";
// import Cookies from "js-cookie";

interface DynamicObject {
  [key: string]: any;
}

interface ApiServiceObject {
  useToken: boolean;
  useOrganization: boolean;
  noOG: () => any;
  secure: () => any;
  external: () => any;
  setHeaderToken: (headers: DynamicObject) => Promise<DynamicObject>;

  get: (resource: string, params?: DynamicObject, headers?: DynamicObject) => Promise<AxiosResponse<any>>;
  delete: (resource: string, params?: DynamicObject, headers?: DynamicObject) => Promise<AxiosResponse<any>>;
  post: (
    resource: string,
    params?: DynamicObject,
    headers?: DynamicObject,
    config?: DynamicObject
  ) => Promise<AxiosResponse<any>>;
  put: (
    resource: string,
    params?: DynamicObject,
    headers?: DynamicObject,
    config?: DynamicObject
  ) => Promise<AxiosResponse<any>>;
  patch: (
    resource: string,
    params?: DynamicObject,
    headers?: DynamicObject,
    config?: DynamicObject
  ) => Promise<AxiosResponse<any>>;
}

const API_URL = process.env.BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

const ApiService: ApiServiceObject = {
  // Security Variable
  useToken: true,
  useOrganization: true,

  secure() {
    this.useToken = true;
    return this;
  },
  external() {
    this.useToken = false;
    return this;
  },
  noOG() {
    this.useOrganization = false;
    return this;
  },

  // Set security config in the headers
  async setHeaderToken(headers) {
    headers.useOrganization = this.useOrganization;
    headers.useToken = this.useToken;
    return headers;
  },

  // METHODS
  async get(resource, params = {}, headers = {}) {
    headers = await this.setHeaderToken(headers);

    return await api.get(`${resource}`, {
      params,
      headers,
    });
  },
  async delete(resource, data = {}, headers = {}) {
    headers = await this.setHeaderToken(headers);
    return await api.delete(`${resource}`, {
      data,
      headers,
    });
  },

  async post(resource, payload = {}, headers = {}, config = {}) {
    config.headers = await this.setHeaderToken(headers);
    return await api.post(`${resource}`, payload, config);
  },

  async put(resource, payload = {}, headers = {}, config = {}) {
    config.headers = await this.setHeaderToken(headers);
    return await api.put(`${resource}`, payload, config);
  },

  async patch(resource, payload = {}, headers = {}, config = {}) {
    config.headers = await this.setHeaderToken(headers);
    return await api.patch(`${resource}`, payload, config);
  },
};

api.interceptors.response.use(
  (res) => {
    if (res.data.status === 403) {
    }

    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async (config: any) => {
    let lang = "en";
    const isServer = typeof window === "undefined";

    if (isServer) {
      const {cookies} = await import("next/headers");
      const selectedLangCookie = (await cookies()).get("lang")?.value;
      if (selectedLangCookie) {
        lang = selectedLangCookie;
      }
    } else {
      const selectedLangCookie = JSCookie.get("lang");
      if (selectedLangCookie) {
        lang = selectedLangCookie;
      }
    }

    config.headers["accept-language"] = lang;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiService;

