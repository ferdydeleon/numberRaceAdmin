import api from "../axios";
import Api from "../Api";

export async function createEvent(ArrayData) {
  const response = await api
    .post(`${Api.request.URL}/api/v2/Event/`, ArrayData)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

export async function eventChangeStatus(ArrayData) {
  const response = await api
    .post(`${Api.request.URL}/api/v2/Event/status`, ArrayData)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

export async function eventList(search, game, val) {
  let GAME;
  if (game === "ALL") {
    GAME = "";
  } else if (game === undefined) {
    GAME = "";
  } else {
    GAME = game;
  }
  const response = await api
    .get(
      `${Api.request.URL}/api/v2/Event?search=${
        search === undefined ? "" : search
      }&game=${GAME}&start=${val === undefined ? 0 : val}`
    )
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

export async function eventFight(id, search) {
  const arraySearh = {
    username: search,
  };

  const response = await api
    .get(
      `${Api.request.URL}/api/v2/Fight/event?event=${id}&fightnumber=${
        search === undefined ? "" : search
      }`,
      arraySearh
    )
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

export async function eventBettors(eventId, fightId) {
  const response = await api
    .get(
      `${Api.request.URL}/api/v2/Fight/user/bet?event=${eventId}&fightId=${fightId}`
    )
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

export async function eventFightHistory(event, fightno) {
  const response = await api
    .get(
      `${Api.request.URL}/api/v2/Fight/declarator/history?event=${event}&fightNumber=${fightno}`
    )
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

export async function findEventByID(eventID) {
  const response = await api
    .get(`${Api.request.URL}/api/v2/event/${eventID}`)
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}


export async function deleteButton(arrayData) {
  const response = await api
    .post(`${Api.request.URL}/api/v2/Button/delete/`,arrayData)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

