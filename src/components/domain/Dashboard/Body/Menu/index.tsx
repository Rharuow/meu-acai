import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useSWR from "swr";
import Switch from "react-switch";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import Lottie from "react-lottie";

import Cream from "./Cream";
import Extras from "./Extra";
import Topping from "./Topping";
import Size from "./Size";

import { Menu } from "@/src/entities/Product";
import { getStatusStore } from "@/src/service/docs/store";

import closedAnimation from "@/src/components/closed.json";
import { pluralCase } from "@/src/utils/plural";

const defaultOptions = {
	loop: true,
	autoplay: true,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const Product = () => {
	const methods = useForm<Menu>();

	const [hasExtra, setHasExtra] = useState(false);

	const { data, error, isLoading } = useSWR("/open", getStatusStore);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		Swal.fire({
			icon: "success",
			title: "Obrigado!",
			text: "Seu pedido será preparado!",
		});
	};

	const conditions = [
		{
			condition: !methods.getValues("size"),
			text: "Escolha um tamanho",
		},
		{
			condition:
				methods.getValues("size") &&
				(!methods.getValues("creams") ||
					methods.getValues("creams").length <
						methods.getValues("size").amountCreams),
			text: `Escolha ${pluralCase(
				`${methods.getValues("size")?.amountCreams} creme`,
				methods.getValues("size")?.amountCreams
			)}`,
		},
	];

	return (
		<>
			{isLoading ? (
				<ReactLoading type="spinningBubbles" color="#ffccff" />
			) : data ? (
				<FormProvider {...methods}>
					<Form onSubmit={onSubmit}>
						<div className="d-flex py-2 px-3 flex-wrap">
							<Size />

							{methods.getValues("size") && (
								<>
									<Cream />
									{methods.getValues("creams").length ===
										methods.getValues("size").amountCreams && (
										<>
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
										</>
									)}

									<div className="w-100 mb-1">
										<p className="fs-6 fw-bold mb-0 text-primary mb-0">
											Total: R${" "}
											{methods
												.getValues("value")
												.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
										</p>
									</div>
								</>
							)}
							<div className="w-100 d-flex justify-content-end flex-wrap">
								<Button
									type="submit"
									disabled={!!conditions.find((c) => c.condition === false)}
								>
									Pedir
								</Button>
								{conditions
									.filter((cond) => cond.condition)
									.map((cond) => (
										<div
											key={cond.text}
											className="d-flex justify-content-end w-100"
										>
											<Form.Text className="text-danger fw-bold">
												{cond.text}
											</Form.Text>
										</div>
									))}
							</div>
						</div>
					</Form>
				</FormProvider>
			) : (
				<div>
					<Lottie
						options={{ ...defaultOptions, animationData: closedAnimation }}
						width={160}
						height={160}
					/>
				</div>
			)}
		</>
	);
};

export default Product;
