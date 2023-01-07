import React from "react";
import Lottie from "react-lottie";
import animationData from "./build.json";

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const Building: React.FC<{
	width?: number;
	height?: number;
	title?: string;
}> = ({ width = 400, height = 400, title = "Em construção" }) => {
	return (
		<div className="d-flex justify-content-center flex-column">
			<Lottie options={defaultOptions} width={width} height={height} />
			<p>{title}</p>
		</div>
	);
};

export default Building;
