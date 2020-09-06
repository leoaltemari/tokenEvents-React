import axios from "./axios";
import userRequest from "./user-requests";

// import validator from "./validators/user-validator";

function UserApi() {}

UserApi.prototype.getUser = async id => {
	try {
		const response = await axios.get(`${userRequest.route}/${id}`);
		if (response.data.name) {
			return response.data;
		}
	} catch (err) {
		console.log(err);
	}
};
UserApi.prototype.login = async (email, password) => {
	if (!email || !password) {
		return {
			status: 1,
			errors: "Os campos estão incompletos!",
		};
	}

	const userData = {
		email: email,
		password: password,
	};

	try {
		const response = await axios.post(userRequest.login, userData);
		if (response.data.token) {
			const user = response.data.data;
			user.token = response.data.token;
			return {
				status: 0,
				user: user,
			};
		} else {
			return {
				status: 1,
				errors: response.data.message,
			};
		}
	} catch (error) {
		console.log(error);
	}
};

UserApi.prototype.register = async (name, email, password, confirmPsw) => {
	if (!name || !email || !password) {
		return {
			status: 1,
			errors: "Os campos estão incompletos!",
		};
	}

	if (password !== confirmPsw) {
		return {
			status: 1,
			errors: "As senhas não são iguais!",
		};
	}

	const userData = {
		name: name,
		email: email,
		password: password,
	};

	try {
		const response = await axios.post(userRequest.route, userData);
		if (response.status === 202) {
			if (response.data.message) {
				return {
					status: 1,
					errors: response.data.message,
				};
			}
			const arrayOfErrors = new Array([]);
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

UserApi.prototype.update = async (
	name,
	email,
	password,
	confirmPsw,
	token,
	id
) => {
	const userData = {
		token: token,
	};

	if (name) {
		userData.name = name;
	}
	if (email) {
		userData.email = email;
	}
	if (password) {
		if (password !== confirmPsw) {
			return {
				status: 1,
				errors: ["As senhas não são iguais!"],
			};
		}
		userData.password = password;
	}

	try {
		const response = await axios.put(
			`${userRequest.route}/${id}`,
			userData
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

export default UserApi;
