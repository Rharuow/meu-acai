import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Switch from "react-switch";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";

import Cream from "./Cream";
import Extras from "./Extra";
import Topping from "./Topping";
import Size from "./Size";

import { Menu } from "@/src/entities/Product";

const Product = () => {
	const methods = useForm<Menu>();

	const [hasExtra, setHasExtra] = useState(false);

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

						{methods.getValues("size") && (
							<>
								<Cream />

								<Topping />

								<div className="my-3">
									<label className="d-flex align-items-center">
										<Switch
											onChange={(e) => setHasExtra(e)}
											checked={hasExtra}
											onColor="#46295a"
										/>
										<span className="ms-2">Adicionar Extra?</span>
									</label>
								</div>

								<Extras />
								<div className="w-100 mb-1">
									<p className="fs-6 fw-bold mb-0">Valor: R$</p>
								</div>
							</>
						)}
						<div className="w-100 d-flex justify-content-end flex-wrap">
							<Button type="submit" disabled={!methods.getValues("size")}>
								Pedir
							</Button>
							{!methods.getValues("size") && (
								<div className="d-flex justify-content-end w-100">
									<Form.Text className="text-danger fw-bold">
										Escolha um tamanho
									</Form.Text>
								</div>
							)}
						</div>
					</div>
				</Form>
			</FormProvider>
		</>
	);
};

export default Product;
