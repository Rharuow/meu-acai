import React, { useState } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTableCells } from "@fortawesome/free-solid-svg-icons";

import { useUserContext } from "../../../../context/UserContext";
import { useContentContext } from "..";

const Header = () => {
	const user = useUserContext();

	const { setContent } = useContentContext();

	const [expanded, setExpanded] = useState(false);

	return (
		<div className="d-flex align-items-center justify-content-between rounded-bottom py-2 px-3 bg-secondary">
			<h1 className="fs-3 m-0 text-primary-dark">{user.name.split(" ")[0]}</h1>
			<div className="d-flex flex-column align-items-center flex-grow-1">
				<div className="w-50">
					<FontAwesomeIcon icon={faHome} className="text-primary" />{" "}
					<span className="text-primary-dark">{user.address.house}</span>
				</div>
				<div className="w-50">
					<FontAwesomeIcon icon={faTableCells} className="text-primary" />{" "}
					<span className="text-primary-dark">{user.address.square}</span>
				</div>
			</div>
			<div className="d-flex align-items-center">
				<Navbar expand="md" expanded={expanded}>
					<Navbar.Toggle
						aria-controls="header-button"
						onClick={() => setExpanded((prevState) => !prevState)}
					/>
					<Navbar.Offcanvas
						id="header-button"
						aria-labelledby="header-button-to-control-content"
						placement="end"
					>
						<Offcanvas.Header
							closeButton
							onClick={() => setExpanded((prevState) => !prevState)}
							className="justify-content-end"
						></Offcanvas.Header>
						<Offcanvas.Body className="d-flex flex-column">
							<Nav.Link
								className="mb-3"
								onClick={() => {
									setExpanded((prevState) => !prevState);
									setContent({
										orders: false,
										profile: true,
									});
								}}
							>
								Perfil
							</Nav.Link>
							<Nav.Link
								onClick={() => {
									setExpanded((prevState) => !prevState);
									setContent({
										orders: true,
										profile: false,
									});
								}}
							>
								Pedidos
							</Nav.Link>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Navbar>
			</div>
		</div>
	);
};

export default Header;
