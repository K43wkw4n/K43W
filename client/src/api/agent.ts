import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store/configureStore";
import { PaginatedResponse } from "../models/pagination";
import { Routers } from "../App";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true; //อนุญาตให้เข้าถึงคุกกี้ที่ browser ได้

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise((_) => setTimeout(_, Math.random() * 1000));

axios.interceptors.request.use((config: any) => {
  const token = store.getState().account.user?.token; //เรียกใช้ State โดยตรง
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // if (process.env.NODE_ENV === "development")

    await sleep();

    console.log(response);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }

    return response;
  },
  (error: AxiosError) => {
    console.log('caught by interceptor')
    var data = error.response?.data; //obj ที่ไม่รู้ชนิด
    var json = JSON.stringify(data); //ทำให้เป็น String
    var result = JSON.parse(json);

    switch (result.status) {
      case 400:
        if (result.errors) {
          const modelStateErrors: string[] = [];
          for (const key in result.errors) {
            if (result.errors[key]) {
              modelStateErrors.push(result.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(result.title);

        console.log(result);
        break;
      case 401:
        toast.error(result.title);
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      case 404:
        toast.error(result.title);
        break;
      case 500:
        Routers.navigate("server-error", { state: data });
        toast.error(result.title);
        break;

      default:
        break;
    }
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) => axios.post(url, data, {
    headers: { 'Content-type': 'multipart/form-data' }
  }).then(responseBody),
  putForm: (url: string, data: FormData) => axios.put(url, data, {
      headers: { 'Content-type': 'multipart/form-data' }
  }).then(responseBody)

};

const TestErrors = {
  get400Error: () => requests.get("buggy/GetBadRequest"),
  get401Error: () => requests.get("buggy/GetUnAuthorized"),
  get404Error: () => requests.get("buggy/GetNotFound"),
  get500Error: () => requests.get("buggy/GetServerError"),
  getValidationError: () => requests.get("buggy/GetValidationError"),
};

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
};

const Data = {
  getStudents: () => requests.get("student"),
  getPictures: () => requests.get("picture"),
  getTeachers: () => requests.get("teacher"),
  getProjects: () => requests.get("project"),
};

const Student = {
  list: () => requests.get("student"),
  details: (id: number) => requests.get(`student/${id}`),
  fetchFilters: () => requests.get("student/filters"),
};

const Picture = {
  list: () => requests.get("picture"),
  details: (id: number) => requests.get(`picture/${id}`),
  fetchFilters: () => requests.get("picture/filters"),
};

function createFormData(item: any) {
  let formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Admin = {
  createStudent: (student: any) =>
    requests.postForm("student", createFormData(student)),
  updateStudent: (student: any) =>
    requests.putForm("student", createFormData(student)),
  deleteStudent: (id: number) => requests.delete(`student/${id}`),

  createPicture: (picture: any) =>
    requests.postForm('picture', createFormData(picture)),
  updatePicture: (picture: any) =>
    requests.putForm('picture', createFormData(picture)),
  deletePicture: (id: number) => requests.delete(`picture/${id}`),

  createProject: (project: any) =>
    requests.postForm("project", createFormData(project)),
  updateProject: (project: any) =>
    requests.putForm("project", createFormData(project)),
  deleteProject: (id: number) => requests.delete(`project/${id}`),
};

const agent = {
  TestErrors,
  Account,
  Data,
  Student,
  Picture,
  Admin,
};

export default agent;
