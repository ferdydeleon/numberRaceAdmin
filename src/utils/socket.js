import io from 'socket.io-client';

const options = {
  autoConnect: false,
  rememberUpgrade: true,
  reconnectionDelay: 5000,
  transports: ['websocket', 'polling'],
};

export const socketAccounting = io(
    //"http://devopsenv.talpakan.com:3004/accounting",
    "https://pccsocket.pcc2021.live/accounting",
  options
);
export default io;