import { faGear, faReceipt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useContentContext } from "../..";

const NavbarMenu = () => {
	const [expanded, setExpanded] = useState(false);
	const { setContent } = useContentContext();

	return (
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
						className="mb-3 text-primary fw-bold"
						onClick={() => {
							setExpanded((prevState) => !prevState);
							setContent({
								orders: false,
								profile: true,
								settings: false,
							});
						}}
					>
						<FontAwesomeIcon icon={faUser} className="text-primary" /> Perfil
					</Nav.Link>
					<Nav.Link
						className="mb-3 fw-bold text-primary"
						onClick={() => {
							setExpanded((prevState) => !prevState);
							setContent({
								orders: true,
								profile: false,
								settings: false,
							});
						}}
					>
						<FontAwesomeIcon icon={faReceipt} className="text-primary" />{" "}
						Pedidos
					</Nav.Link>
					<Nav.Link
						className="mb-3 fw-bold text-primary"
						onClick={() => {
							setExpanded((prevState) => !prevState);
							setContent({
								orders: false,
								profile: false,
								settings: true,
							});
						}}
					>
						<FontAwesomeIcon icon={faGear} className="text-primary" />{" "}
						Configuração
					</Nav.Link>
				</Offcanvas.Body>
			</Navbar.Offcanvas>
		</Navbar>
	);
};

export default NavbarMenu;
