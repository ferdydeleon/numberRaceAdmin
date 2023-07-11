import api from "../axios";
import Api from "../Api";
import getdate from "../utils/date";

export async function actualIncome(search, val, startingDate, endingDate) {
  const response = await api
    .get(
      `${Api.request.URL}/api/v2/report/event/list?game_code=${
        search === undefined ? "" : search
      }&start=${val === undefined ? 0 : val}&limit=10&from=${
        startingDate === undefined ? getdate.star : startingDate
      }&to=${endingDate === undefined ? getdate.end : endingDate}`
    )
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

export async function reportGameList(search,startingDate,endingDate) {
  const response = await api
    .get(`api/v2/report/event/list?game_code=${search === undefined ? "" :search}&start=0&from=${startingDate}&to=${endingDate}`)
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
    return response;
}


