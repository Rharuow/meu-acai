import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faTableCells,
	faBars,
} from "@fortawesome/free-solid-svg-icons";

import { useUserContext } from "../../../../context/UserContext";

const Header = () => {
	const user = useUserContext();

	return (
		<div className="d-flex align-items-center justify-content-between rounded-bottom py-2 px-3 bg-secondary">
			<h1 className="fs-3 m-0 text-primary-dark">{user.name.split(" ")[0]}</h1>
			<div className="d-flex flex-column align-items-center flex-grow-1">
				<span className="text-primary-dark">
					<FontAwesomeIcon icon={faHome} className="text-primary" />{" "}
					{user.address.house}
				</span>
				<span className="text-primary-dark">
					<FontAwesomeIcon icon={faTableCells} className="text-primary" />{" "}
					{user.address.square}
				</span>
			</div>
			<div className="d-flex">
				<Button variant="light" className="fs-3">
					<FontAwesomeIcon icon={faBars} className="text-primary" />
				</Button>
			</div>
		</div>
	);
};

export default Header;
