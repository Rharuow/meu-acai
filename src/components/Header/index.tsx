import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTableCells } from "@fortawesome/free-solid-svg-icons";

import NavbarMenu from "./Navbar";
import { useSessionContext } from "@/src/rharuow-admin/context/Session";

const Header = () => {
	const { user } = useSessionContext();

	return (
		<div className="d-flex align-items-center justify-content-between rounded-bottom py-2 px-3 bg-secondary">
			<h1 className="fs-3 m-0 text-primary-dark">{user?.name.split(" ")[0]}</h1>
			<div className="d-flex flex-column align-items-center flex-grow-1">
				<div className="w-50">
					<FontAwesomeIcon icon={faHome} className="text-primary" />{" "}
					<span className="text-primary-dark">{user?.address.house}</span>
				</div>
				<div className="w-50">
					<FontAwesomeIcon icon={faTableCells} className="text-primary" />{" "}
					<span className="text-primary-dark">{user?.address.square}</span>
				</div>
			</div>
			<div className="d-flex align-items-center">
				<NavbarMenu />
			</div>
		</div>
	);
};

export default Header;
