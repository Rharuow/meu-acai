import React from "react";
import { Button, Form } from "react-bootstrap";
import Switch from "react-switch";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";

import Cream from "./Cream";
import Extras from "./Extra";
import Topping from "./Topping";
import Size from "./Size";

const Product = () => {
	const methods = useForm();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		Swal.fire({
			icon: "success",
			title: "Obrigado!",
			text: "Seu pedido será preparado!",
		});
	};

	return (
		<>
			<FormProvider {...methods}>
				<Form onSubmit={onSubmit}>
					<div className="d-flex py-2 px-3 flex-wrap">
						<Size />

						<Cream />

						<Topping />

						<div className="my-3">
							<label className="d-flex align-items-center">
								<Switch
									onChange={(e) => methods.setValue("hasExtra", e)}
									checked={methods.watch("hasExtra")}
									onColor="#46295a"
								/>
								<span className="ms-2">Adicionar Extra?</span>
							</label>
						</div>

						<Extras />
						<div className="w-100 mb-1">
							<p className="fs-6 fw-bold mb-0">Valor: R$</p>
						</div>

						<div className="w-100 d-flex justify-content-end flex-wrap">
							<Button type="submit">Pedir</Button>
						</div>
					</div>
				</Form>
			</FormProvider>
		</>
	);
};

export default Product;
