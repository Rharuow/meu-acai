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
	const methods = useForm();

	const [menu, setMenu] = useState<Menu>();

	const [hasExtra, setHasExtra] = useState(false);

	const orderWithoutCream = !menu || !menu.creams || menu.creams?.length < 1;

	const orderWithoutSize = !menu;

	const orderIsInvalid = orderWithoutCream || orderWithoutSize;

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		Swal.fire({
			icon: "success",
			title: "Obrigado!",
			text: "Seu pedido será preparado!",
		});
		console.log(menu);
	};

	return (
		<>
			<FormProvider {...methods}>
				<Form onSubmit={onSubmit}>
					<div className="d-flex py-2 px-3 flex-wrap">
						<Size menu={menu} setMenu={setMenu} />

						<Cream menu={menu} setMenu={setMenu} />

						<Topping menu={menu} setMenu={setMenu} />

						{menu && (
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

						{hasExtra && <Extras menu={menu} setMenu={setMenu} />}
						<div className="w-100 mb-1">
							<p className="fs-6 fw-bold mb-0">
								Valor: R${" "}
								{menu
									? menu.value.toLocaleString("pt-BR", {
											currency: "BRL",
											minimumFractionDigits: 2,
									  })
									: "0,00"}
							</p>
						</div>

						<div className="w-100 d-flex justify-content-end flex-wrap">
							<Button type="submit" disabled={orderIsInvalid}>
								Pedir
							</Button>
							{orderIsInvalid && (
								<div className="w-100 d-flex justify-content-end">
									<small className="text-danger">
										Escolha um {orderWithoutSize ? "tamanho" : "creme"}
									</small>
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
