import React from "react";
import DisplayCalendar from "../utils/DisplayCalendar";

function DateSelect({ getDate }) {
	return (
		<div className="calendar__container">
			<DisplayCalendar className="calendar__display" getDate={getDate} />
		</div>
	);
}

export default DateSelect;
