export const http_url = process.env.NODE_ENV == "development"  ? "http://192.168.1.10:3000" : "https://feedme-server.herokuapp.com" ;
export const ws_url = process.env.NODE_ENV == "development" ? "ws://192.168.1.10:3000" : "ws://feedme-server.herokuapp.com";
