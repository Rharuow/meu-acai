import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useSWR from "swr";
import Switch from "react-switch";
import { useForm, FormProvider } from "react-hook-form";
import ReactLoading from "react-loading";
import Lottie from "react-lottie";
import { DateTime } from "luxon";

import Cream from "./Cream";
import Extras from "./Extra";
import Topping from "./Topping";
import Size from "./Size";

import { Menu } from "@/src/entities/Product";
import { getStatusStore } from "@/src/service/docs/store";

import closedAnimation from "@/src/components/closed.json";
import { pluralCase } from "@/src/utils/plural";
import { Order } from "@/src/entities/Order";
import { useSessionContext } from "@/src/rharuow-admin/context/Session";
import { createOrder } from "@/src/service/docs/orders";
import Swal from "sweetalert2";

const defaultOptions = {
	loop: true,
	autoplay: true,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const Product = () => {
	const methods = useForm<Menu>();

	const { user } = useSessionContext();

	const [hasExtra, setHasExtra] = useState(false);

	const { data, error, isLoading } = useSWR("/open", getStatusStore);

	const [loading, setLoading] = useState(isLoading);

	const onSubmit = async (data: Menu) => {
		setLoading(true);
		const dataOrderFormatted = {
			created_at: DateTime.now().toUTC().toString(),
			product: { ...data, name: "Custom", visible: true },
			status: "making",
			user,
		} as Order;
		try {
			await createOrder(dataOrderFormatted);
			Swal.fire({
				text: "Seu pedido foi realizado com Sucesso!",
				icon: "success",
				title: "Parabéns!",
			});
		} catch (error) {
			Swal.fire({
				title: "Opps...",
				text: "Algo deu errado!",
				icon: "error",
			});
		}
		setLoading(false);
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
			{loading ? (
				<ReactLoading type="spinningBubbles" color="#ffccff" />
			) : data ? (
				<FormProvider {...methods}>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
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
													<span className="ms-2 text-primary">
														Adicionar Extra?
													</span>
												</label>
											</div>

											{hasExtra && <Extras />}
										</>
									)}

									<div className="w-100 mb-1">
										<p
											key={methods.watch("value")}
											className="fs-6 fw-bold mb-0 text-primary mb-0"
										>
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
									disabled={
										!methods.getValues("size") ||
										methods.getValues("creams").length <
											methods.getValues("size").amountCreams
									}
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
