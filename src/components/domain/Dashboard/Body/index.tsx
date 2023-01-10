import React, { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useLayoutContext } from "../../../../context/LayoutContext";
import Wallet from "../Walet";
import Historic from "./Historic";
import Order from "./Order";

const Body = () => {
	const [orderOpen, setOrderOpen] = useState(false);
	const [historicOpen, setHistoricOpen] = useState(false);
	const [walletOpen, setWalletOpen] = useState(false);

	const { setClassWrapper } = useLayoutContext();

	useEffect(() => {
		setClassWrapper("d-flex flex-column");
		return () => setClassWrapper(" ");
	});

	return (
		<div className="d-flex p-3 align-items-center flex-wrap flex-grow-1">
			<div className="w-100">
				<Button
					variant="secondary"
					className="rounded-0 w-100 rounded-top"
					onClick={() => setOrderOpen((prevState) => !prevState)}
					aria-controls="order-collapse"
					aria-expanded={orderOpen}
				>
					Pedir
				</Button>
				<Collapse in={orderOpen}>
					<div id="order-collapse" className="bg-gray-400 w-100">
						<Order />
					</div>
				</Collapse>
				<Button
					variant="secondary"
					className="rounded-0 w-100"
					onClick={() => setHistoricOpen((prevState) => !prevState)}
					aria-controls="historic-collapse"
					aria-expanded={historicOpen}
				>
					Histórico
				</Button>
				<Collapse in={historicOpen}>
					<div id="historic-collapse" className="bg-gray-400 w-100">
						<Historic />
					</div>
				</Collapse>
				<Button
					variant="secondary"
					className={`w-100 rounded-0 ${walletOpen ? " " : "rounded-bottom"}`}
					onClick={() => setWalletOpen((prevState) => !prevState)}
					aria-controls="balance-collapse"
					aria-expanded={walletOpen}
				>
					Saldo
				</Button>
				<Collapse in={walletOpen}>
					<div
						id="balance-collapse"
						className="bg-gray-400 w-100 rounded-bottom"
					>
						<Wallet />
					</div>
				</Collapse>
			</div>
		</div>
	);
};

export default Body;
