import React, { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

function DisplayCalendar({ getDate }) {
	const [date, setDate] = useState(new Date());

	const onCalendarChange = date => {
		getDate(date);
		setDate(date);
	};

	return <Calendar onChange={onCalendarChange} value={date} />;
}

export default DisplayCalendar;
