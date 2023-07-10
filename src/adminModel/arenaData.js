import api from "../axios";
import Api from "../Api";



export async function fetchArena() {
    const response = await api
      .get(`${Api.request.URL}/api/v2/Arena`)
      .then((res) => {
        return  res.data.data.data;
      })
      .catch((error) => {
        return error.response.data.message;
      });
    return response;
  }


  export async function createNewArena(ArrayData) {
    const response = await api
      .post(`${Api.request.URL}/api/v2/Arena`, ArrayData)
      .then((res) => {
        return res.data.message;
      })
      .catch((error) => {
        return error.response.data.message;
      });
    return response;
  }