import { getToppings } from "@/src/service/docs/toppings";
import React, { useRef } from "react";
import useSWR, { Fetcher } from "swr";
import ReactLoading from "react-loading";

import { Menu, Topping as ToppingType, Toppings } from "@/src/entities/Product";
import Numeric from "@/src/components/Numeric";
import { useFormContext } from "react-hook-form";
import { pluralCase } from "@/src/utils/plural";

const Topping: React.FC = () => {
	const fetcher: Fetcher<Toppings> = async () => await getToppings();

	const { getValues, watch, setValue } = useFormContext<Menu>();

	const addTopping = (topping: ToppingType) => {
		setValue("toppings", [...(getValues("toppings") || []), topping]);
	};

	const removeTopping = (topping: ToppingType) => {
		setValue(
			"toppings",
			getValues("toppings")?.filter((t) => t.id !== topping.id)
		);
	};

	const { data, error, isLoading } = useSWR("/toppings", fetcher);

	return data && !isLoading ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0 text-primary">
					Escolha{" "}
					{pluralCase(
						`${getValues("size").amountOptions} acompanhamento`,
						getValues("size").amountOptions
					)}
				</p>
			</div>
			{data.map((topping, index) => (
				<div className="w-100 mb-3" key={topping.id}>
					<Numeric
						key={getValues("size").name}
						name={topping.name}
						lockedMax={
							watch("toppings")?.length === watch("size").amountOptions
						}
						label={topping.name}
						handleIncrement={() => addTopping(topping)}
						handleDecrement={() => removeTopping(topping)}
					/>
				</div>
			))}
		</>
	) : (
		<ReactLoading type="spinningBubbles" color="#ffccff" />
	);
};

export default Topping;
