import api from "../axios";
import Api from "../Api";

export async function fetchgamelist() {
  const response = await api
    .get(`${Api.request.URL}/api/v2/Game`)
    .then((res) => {
      //  const result = res.data.data.data.filter((x) => x.isVisible === 1);
      return res.data.data.data.filter((x) => x.isVisible === 1);
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}

export async function fetchdeclaratorList() {
  const response = await api
    .get(`${Api.request.URL}/api/v2/Users?group=ADMIN&start=0`) 
    .then((res) => {
      const result = res.data.data.data.filter(
        (x) => x.group_name === "DECLARATOR"
      );
      return result;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}



export async function fetchEvent(id) {
  const response = await api
    .get(`${Api.request.URL}/api/v2/button/event/${id}`)
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}


export async function fetchDefultButton(GameID) {
  const response = await api
    .get(`${Api.request.URL}/api/v2/Button/default/${GameID}`)
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
}



export async function fetchdrawList() {
  const response = await api
    .get(`${Api.request.URL}/game/drawtypes`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });

  return response;
}

export async function searchUser(search) {
  const arraySearh = {
    username: search,
  };

  const response = await api
    .post(`${Api.request.URL}/api/v2/users/search/player/`, arraySearh)
    .then((res) => {
      return res.data.data.data;
    })
    .catch((error) => {
      console.log("searchUser: ", error.response.data);
      return error.response.data.message;
    });
  return response;
} 


export async function insertDefaultButton(data){
  const response = await api
    .post(`${Api.request.URL}/api/v2/Button/default/`, data)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      console.log("searchUser: ", error.response.data);
      return error.response.data.message;
    });
  return response;
}


export const GameStatus = [
  {
    id: 1,
    status: "Show",
  },
  {
    id: 2,
    status: "Open",
  },
  {
    id: 3,
    status: "Paused",
  },
  {
    id: 4,
    status: "Cancelled",
  },
  {
    id: 5,
    status: "Declared",
  },
  {
    id: 6,
    status: "'Re-Declared",
  },
  {
    id: 7,
    status: "Pending",
  },
];


export const typePlayer = [
  {
    id: 1,
    value: "ALL",
    type: "ALL",
  },
  {
    id: 2,
    value: "PLATINUM",
    type: "TELLER",
  },
  {
    id: 3,
    value: "AGENT",
    type: "AGENT",
  },
  {
    id: 4,
    value: "DIRECT_PLAYER",
    type: "DIRECT_PLAYER",
  },
  {
    id: 5,
    value: "ADMIN",
    type: "ADMIN",
  },
];


export const PlayerType = [
  {
    id: 5,
    value: "SUPER_ADMIN",
    type: "SUPER_ADMIN",
  },
  {
    id: 2,
    value: "PLATINUM",
    type: "TELLER",
  },
  {
    id: 3,
    value: "DECLARATOR",
    type: "DECLARATOR",
  },
  {
    id: 4,
    value: "STAFF",
    type: "STAFF",
  },
  {
    id: 5,
    value: "ACCOUNTING",
    type: "ACCOUNTING",
  },
];
