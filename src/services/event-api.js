import axios from "./axios";
import eventRequest from "./event-requests";

function EventApi() {}

EventApi.prototype.getAll = async () => {
	try {
		const response = await axios.get(eventRequest.route);
		return response;
	} catch (err) {
		console.log(err);
	}
};

EventApi.prototype.getByDate = async date => {
	try {
		const response = await axios.get(`${eventRequest.route}/${date}`);
		return response;
	} catch (err) {
		console.log(err);
	}
};

export default EventApi;
