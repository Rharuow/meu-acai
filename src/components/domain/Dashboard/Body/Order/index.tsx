import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Product, SizeEnum } from "../../../../../entities/Product";

const Order = () => {
	const [order, setOrder] = useState<Product>();

	const sizes = [
		...Object.values(SizeEnum).filter((s) => typeof s === "string"),
	];

	return (
		<div className="d-flex py-2 px-3 flex-wrap">
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Tamanho</p>
			</div>
			<div className="d-flex justify-content-around w-100">
				{sizes.map((sizeEnum) => (
					<Form.Check
						key={sizeEnum}
						type="radio"
						name="size"
						onClick={() => console.log("dasdnsia")}
						label={sizeEnum}
					/>
				))}
			</div>
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
