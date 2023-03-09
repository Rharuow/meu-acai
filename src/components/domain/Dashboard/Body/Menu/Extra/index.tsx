import { getToppings } from "@/src/service/docs/toppings";
import React, { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import ReactLoading from "react-loading";

import { Toppings, Topping, Menu } from "../../../../../../entities/Product";
import Numeric from "../../../../../Numeric";

const Extras: React.FC = () => {
	const fetcher: Fetcher<Toppings> = async () => await getToppings();

	const { data, error, isLoading } = useSWR("extras", fetcher);

	return isLoading ? (
		<ReactLoading type="spinningBubbles" color="#ffccff" />
	) : (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Adicione os extras:</p>
			</div>
			{data &&
				data.map((topping) => (
					<div className="w-100" key={topping.id}>
						<Numeric
							className="me-1"
							max={10}
							name={topping.name}
							label={`${topping.name} (R$
						${topping.value.toLocaleString("pt-BR", { currency: "BRL" })})`}
						/>
					</div>
				))}
		</>
	);
};

export default Extras;
