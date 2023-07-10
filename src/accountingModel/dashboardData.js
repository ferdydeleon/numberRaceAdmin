import api from "../axios";
import Api from "../Api";

export async function fund() {
  const response = await api
    .get(`${Api.request.URL}/api/v2/company/details`)
    .then((res) => {
      return  res.data.data.data;
    })
    .catch((error) => {
      return [];
    });
  return response;
}


export async function comissionPoints() {
    const response = await api
      .get(`${Api.request.URL}/api/v2/users/total/points`)
      .then((res) => {
        return  res.data.data.comissionPoints;
      })
      .catch((error) => {
        return [];
      });
    return response;
  }

  export async function totalPoints() {
    const response = await api
      .get(`${Api.request.URL}/api/v2/users/total/points`)
      .then((res) => {
    
        return  res.data.data.totalPoints;
      })
      .catch((error) => {
        return [];
        // return error.response.data.message;
      });
    return response;
  }
