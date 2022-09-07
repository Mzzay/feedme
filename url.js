const url = process.env.NODE_ENV == "development"  ? "http://192.168.1.10:3000" : "https://feedme-server.herokuapp.com" ;
export default url;
