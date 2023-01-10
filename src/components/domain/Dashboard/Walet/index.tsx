import React from "react";
import { Button } from "react-bootstrap";
import { UserMoked } from "../../../../entities/user";

const Wallet = () => {
	return (
		<div className="d-flex align-items-center flex-column p-3">
			<h2>{UserMoked.wallet} R$</h2>
			<Button>Depositar</Button>
		</div>
	);
};

export default Wallet;
