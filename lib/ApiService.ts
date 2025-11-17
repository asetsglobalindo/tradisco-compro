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
const API_URL_MAP = process.env.BASE_URL_MAP;

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds timeout
});

const apiMap = axios.create({
  baseURL: API_URL_MAP, // Instance baru untuk BASE_URL_MAP
  timeout: 30000, // 30 seconds timeout
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
  // Ubah metode get() agar bisa mengambil data dari satu atau kedua API
  // async get(
  //   resource: string,
  //   params: DynamicObject = {},
  //   headers: DynamicObject = {},
  //   useMap: boolean = false,
  //   useBoth: boolean = false
  // ): Promise<AxiosResponse<any>> {
  //   headers = await this.setHeaderToken(headers);
  
  //   if (useBoth) {
  //     const [apiRes, apiMapRes] = await Promise.all([
  //       api.get(resource, { params, headers }),
  //       apiMap.get(resource, { params, headers }),
  //     ]);
  //     return {
  //       ...apiRes, // Mengambil struktur dari AxiosResponse pertama
  //       data: [...apiRes.data.data, ...apiMapRes.data.data], // Gabungkan hasil data
  //     } as AxiosResponse<any>;
  //   }
  
  //   // Pilih baseURL berdasarkan useMap
  //   const client = useMap ? apiMap : api;
  //   return client.get(resource, { params, headers });
  // },
  // Call API OLD:
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
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;
      const statusText = error.response.statusText;
      
      // Log 503 errors with more context
      if (status === 503) {
        console.warn(
          `API Service Unavailable (503): ${error.config?.url || 'Unknown endpoint'}. ` +
          `The server is temporarily unavailable. Please try again later.`
        );
      } else if (status === 404) {
        // 404 errors are often expected (endpoint might not exist yet)
        // Log as warning instead of error to reduce noise
        console.warn(
          `API Endpoint Not Found (404): ${error.config?.url || 'Unknown endpoint'}. ` +
          `The endpoint may not be available yet. Component will use default content.`
        );
      } else {
        console.error(
          `API Error (${status}): ${statusText} - ${error.config?.url || 'Unknown endpoint'}`
        );
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('API Request Error: No response received from server', error.config?.url);
    } else {
      // Error setting up the request
      console.error('API Request Setup Error:', error.message);
    }
    
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

