import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {
	Product,
	mockedSizes,
	Creams,
	mockedCreams,
} from "../../../../../entities/Product";
import Cream from "./Cream";
import Size from "./Size";

const Order = () => {
	const [order, setOrder] = useState<Product>();
	const [creams, setCreams] = useState<Creams | Array<null>>([]);

	return (
		<div className="d-flex py-2 px-3 flex-wrap">
			<Size setOrder={setOrder} order={order} />

			<Cream order={order} />

			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Valor: R${" "}
					{order
						? order.value.toLocaleString("pt-BR", { currency: "BRL" })
						: "0,00"}
				</p>
			</div>
		</div>
	);
};

export default Order;
