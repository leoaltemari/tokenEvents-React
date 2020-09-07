import React from "react";

import "../../styles/utils.css";

function Input({ type, fieldName, icon, place, inputData, handleLogin }) {
	return (
		<div className="form__field">
			<div className="form__name">
				<img src={require(`../../assets/icons/${icon}.png`)} alt="" />
				<label>{fieldName}</label>
			</div>
			<input
				type={type}
				placeholder={place}
				className="form__input"
				name={inputData.name}
				value={inputData.value}
				onChange={handleLogin}
			/>
		</div>
	);
}

export default Input;
