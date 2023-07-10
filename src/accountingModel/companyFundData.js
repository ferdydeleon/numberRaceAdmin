import api from "../axios";
import Api from "../Api";

export async function createFund(ArrayFund) {
  const response = await api
    .post(`${Api.request.URL}/api/v2/company/fund/`, ArrayFund)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}
