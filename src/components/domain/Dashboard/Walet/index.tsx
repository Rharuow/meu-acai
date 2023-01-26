import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { UserMoked } from "../../../../entities/User";

const Wallet = () => {
	const [show, setShow] = useState(false);

	const handleClick = () => setShow(true);

	const handleCloseModal = () => setShow(false);

	return (
		<div className="d-flex align-items-center flex-column p-3">
			<Modal centered show={show} onHide={handleCloseModal}>
				<Modal.Header closeButton>Depositar</Modal.Header>
				<Modal.Body></Modal.Body>
			</Modal>
			<h2>{UserMoked.wallet} R$</h2>
			<Button onClick={handleClick}>Depositar</Button>
		</div>
	);
};

export default Wallet;
