import React, { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useLayoutContext } from "../../../../context/LayoutContext";
import Wallet from "../Wallet";
import Order from "./Order";
import Tracking from "./Order/Tracking";
import Product from "./Product";

const Body = () => {
	const [productOpen, setProductOpen] = useState(false);
	const [orderOpen, setOrderOpen] = useState(false);
	const [trackingOpen, setTrackingOpen] = useState(false);
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
					className="rounded-0 border-bottom w-100 rounded-top fw-bold"
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
					className="rounded-0 border-bottom w-100 fw-bold"
					onClick={() => setTrackingOpen((prevState) => !prevState)}
					aria-controls="tracking-collapse"
					aria-expanded={trackingOpen}
				>
					Acompanhar
				</Button>
				<Collapse in={trackingOpen}>
					<div id="tracking-collapse" className="bg-gray-400 w-100">
						<Tracking />
					</div>
				</Collapse>
				<Button
					size="lg"
					variant="secondary"
					className="rounded-0 border-bottom w-100 fw-bold"
					onClick={() => setOrderOpen((prevState) => !prevState)}
					aria-controls="orders-collapse"
					aria-expanded={orderOpen}
				>
					Histórico
				</Button>
				<Collapse in={orderOpen}>
					<div id="orders-collapse" className="bg-gray-400 w-100">
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
