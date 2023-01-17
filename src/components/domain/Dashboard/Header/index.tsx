import React from "react";
import { Button } from "react-bootstrap";
import { UserMoked } from "../../../../entities/User";

const Header = () => {
	return (
		<div className="d-flex align-items-center justify-content-between rounded-bottom py-2 px-3 bg-secondary">
			<h1 className="fs-3 m-0 text-primary-dark">
				{UserMoked.name.split(" ")[0]}
			</h1>
			<div className="d-flex flex-column align-items-center flex-grow-1">
				<span className="text-primary-dark">
					<i className="fa fa-home"></i> Casa {UserMoked.address.house}
				</span>
				<span className="text-primary-dark">
					<i className="fa fa-th-large"></i> Quadra {UserMoked.address.square}
				</span>
			</div>
			<div className="d-flex">
				<Button
					variant="light"
					className="fa fa-cog fs-3 text-primary-dark"
				></Button>
			</div>
		</div>
	);
};

export default Header;
