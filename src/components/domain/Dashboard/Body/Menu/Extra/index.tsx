import { getToppings } from "@/src/service/docs/toppings";
import React from "react";
import useSWR, { Fetcher } from "swr";
import ReactLoading from "react-loading";
import Lottie from "react-lottie";
import { useFormContext } from "react-hook-form";

import { Toppings } from "@/src/entities/Product";
import Numeric from "@/src/components/Numeric";
import animationData from "@/src/components/sorryAnimation.json";

const defaultOptions = {
	loop: true,
	autoplay: true,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const Extras: React.FC = () => {
	const fetcher: Fetcher<Toppings> = async () => await getToppings(true);

	const { getValues, setValue } = useFormContext();

	const { data, error, isLoading } = useSWR("extras", fetcher);

	console.log(data);

	return isLoading ? (
		<ReactLoading type="spinningBubbles" color="#ffccff" />
	) : (
		<>
			{data && data.length > 0 ? (
				<>
					<div className="w-100 mb-1">
						<p className="fs-6 fw-bold mb-0 text-primary">
							Adicione os extras:
						</p>
					</div>
					{data.map((topping) => (
						<div className="w-100 mb-3" key={topping.id}>
							<Numeric
								className="me-1"
								max={5}
								handleIncrement={() =>
									setValue("value", getValues("value") + topping.value)
								}
								handleDecrement={() => {
									setValue("value", getValues("value") - topping.value);
								}}
								name={topping.name}
								label={`${topping.name} (R$
						${topping.value.toLocaleString("pt-BR", { currency: "BRL" })})`}
							/>
						</div>
					))}
				</>
			) : (
				<div className="d-flex justify-content-center w-100 flex-wrap">
					<Lottie
						options={{ ...defaultOptions, animationData }}
						width={180}
						height={180}
					/>
					<p className="text-center text-primary mt-3 fw-bold">
						Não há extras para hoje!
					</p>
				</div>
			)}
		</>
	);
};

export default Extras;
