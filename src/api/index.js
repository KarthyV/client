import axios from "axios";

const URL = "https://guvi-task-server.herokuapp.com";

export default axios.create({
  baseURL: URL,
});
