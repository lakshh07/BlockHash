import axios from "axios";

const instance = axios.create({
  baseURL: "https://ipfs.infura.io/ipfs/",
});

export default instance;
