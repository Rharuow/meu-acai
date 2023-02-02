import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Switch from "react-switch";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import { Product } from "../../../../../entities/Product";
import Cream from "./Cream";
import Extras from "./Extra";
import Option from "./Option";
import Size from "./Size";

const Order = () => {
	const methods = useForm();

	const [order, setOrder] = useState<Product>();

	const [hasExtra, setHasExtra] = useState(false);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(order);
	};

	return (
		<>
			<FormProvider {...methods}>
				<Form onSubmit={onSubmit}>
					<div className="d-flex py-2 px-3 flex-wrap">
						<Size setOrder={setOrder} />

						<Cream order={order} />

						<Option order={order} />

						{order && (
							<div className="my-3">
								<label className="d-flex align-items-center">
									<Switch
										onChange={() => setHasExtra((prevState) => !prevState)}
										checked={hasExtra}
										onColor="#46295a"
									/>
									<span className="ms-2">Adicionar Extra?</span>
								</label>
							</div>
						)}

						{hasExtra && <Extras order={order} />}
						<div className="w-100 mb-1">
							<p className="fs-6 fw-bold mb-0">
								Valor: R${" "}
								{order
									? order.value.toLocaleString("pt-BR", { currency: "BRL" })
									: "0,00"}
							</p>
						</div>

						<div className="w-100 d-flex justify-content-end">
							<Button type="submit">Pedir</Button>
						</div>
					</div>
				</Form>
			</FormProvider>
		</>
	);
};

export default Order;
