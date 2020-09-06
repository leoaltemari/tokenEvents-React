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

EventApi.prototype.getByUser = async (id, token) => {
	try {
		const response = await axios.get(
			`${eventRequest.getUserEvents}/${id}/${token}`
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

EventApi.prototype.create = async (data, token) => {
	const eventData = data;
	eventData.token = token;

	try {
		const response = await axios.post(`${eventRequest.route}`, eventData);

		if (response.status === 202) {
			if (response.data.message) {
				return {
					status: 1,
					errors: response.data.message,
				};
			}
			const arrayOfErrors = [];
			response.data.forEach(item => arrayOfErrors.push(item.message));
			return {
				status: 2,
				errors: arrayOfErrors,
			};
		} else {
			return {
				status: 0,
				success: response.data.message,
			};
		}
	} catch (error) {
		console.log(error);
	}
};

EventApi.prototype.update = async (eventId, data, token) => {
	const eventData = {
		token: token,
	};

	if (data.name) {
		eventData.name = data.name;
	}
	if (data.description) {
		eventData.description = data.description;
	}
	if (data.startDate) {
		eventData.startDate = data.startDate;
	}
	if (data.finishDate) {
		eventData.startDate = data.finishDate;
	}

	if (data.startHour) {
		eventData.startHour = data.startHour;
	}
	if (data.finishHour) {
		eventData.startHour = data.finishHour;
	}

	try {
		const response = await axios.put(
			`${eventRequest.route}/${eventId}`,
			eventData
		);

		if (response.status === 202) {
			if (response.data.message) {
				return {
					status: 1,
					errors: response.data.message,
				};
			}
			const arrayOfErrors = [];
			response.data.forEach(item => arrayOfErrors.push(item.message));
			return {
				status: 2,
				errors: arrayOfErrors,
			};
		} else {
			return {
				status: 0,
				success: response.data.message,
			};
		}
	} catch (error) {
		console.log(error);
	}
};

EventApi.prototype.remove = async (eventId, token) => {
	try {
		const response = await axios.delete(
			`${eventRequest.route}/${token}/${eventId}`
		);

		if (response.status === 202) {
			if (response.data.message) {
				return {
					status: 1,
					errors: response.data.message,
				};
			}
		} else {
			return {
				status: 0,
				success: response.data.message,
			};
		}
	} catch (error) {
		console.log(error);
	}
};

export default EventApi;
