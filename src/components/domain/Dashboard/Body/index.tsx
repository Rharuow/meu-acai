import React, { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useLayoutContext } from "../../../../context/LayoutContext";
import Wallet from "../Wallet";
import Order from "./Order";
import Product from "./Product";

const Body = () => {
	const [productOpen, setProductOpen] = useState(false);
	const [OrderOpen, setOrderOpen] = useState(false);
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
					size="lg"
					variant="secondary"
					className="rounded-0 border-bottom w-100 rounded-top"
					onClick={() => setProductOpen((prevState) => !prevState)}
					aria-controls="order-collapse"
					aria-expanded={productOpen}
				>
					Pedir
				</Button>
				<Collapse in={productOpen}>
					<div id="order-collapse" className="bg-gray-400 w-100">
						<Product />
					</div>
				</Collapse>
				<Button
					size="lg"
					variant="secondary"
					className="rounded-0 border-bottom w-100"
					onClick={() => setOrderOpen((prevState) => !prevState)}
					aria-controls="historic-collapse"
					aria-expanded={OrderOpen}
				>
					Histórico
				</Button>
				<Collapse in={OrderOpen}>
					<div id="historic-collapse" className="bg-gray-400 w-100">
						<Order />
					</div>
				</Collapse>
				{/* <Button
					size="lg"
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
				</Collapse> */}
			</div>
		</div>
	);
};

export default Body;
