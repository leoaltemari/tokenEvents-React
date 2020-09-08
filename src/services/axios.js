import axios from "axios";

// Creates a new instance of axios in the selected URL
const instance = axios.create({
	baseURL: "http://localhost:8081",
});

export default instance;
