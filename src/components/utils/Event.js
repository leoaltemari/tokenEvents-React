import React, { useState, useEffect } from "react";

const eventsImages = [
	"evento1.jpg",
	"evento2.jpg",
	"evento3.jpg",
	"evento4.jpg",
	"evento5.jpg",
];

function Event({ eventData }) {
	const [currImage, setCurrImage] = useState("");

	useEffect(() => {
		const rand = parseInt(Math.random() * 10) % eventsImages.length;
		setCurrImage(eventsImages[rand]);
	}, []);

	function transformDate(date) {
		if (!date) return;
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	}

	return (
		<div className="event__content">
			<div className="event__image">
				{currImage.length > 0 && (
					<img
						src={require(`../../assets/images/${currImage}`)}
						alt="event_image"
					/>
				)}
			</div>
			<div className="event__info">
				<div className="event__date">
					<h4>
						De: {transformDate(eventData.startDate)} às{" "}
						{eventData.startHour}h
					</h4>
					<h4>
						Até: {transformDate(eventData.finishDate)} às{" "}
						{eventData.finishHour}h
					</h4>
				</div>
				<div className="event__name">{eventData.name}</div>
				<div className="event__description">
					{eventData.description}
				</div>
			</div>
		</div>
	);
}

export default Event;
