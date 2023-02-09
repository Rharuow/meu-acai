import React, { useEffect, useState } from "react";
import {
	mockedToppings,
	Toppings,
	Topping,
	Order,
} from "../../../../../../entities/Product";
import Numeric from "../../../../../Numeric";

const Extras: React.FC<{
	order: Order | undefined;
	setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
}> = ({ order, setOrder }) => {
	const [extras, setExtras] = useState<Toppings>(
		order && order.extras ? order.extras : []
	);

	const handleIncrement = (topping: Topping) => {
		setExtras((prevState) => [...prevState, topping]);
	};

	const handleDecrement = (topping: Topping) => {
		setExtras((prevState) => {
			const listExtraOptions = prevState.filter((ext) => ext.id === topping.id);
			listExtraOptions.pop();
			return [
				...prevState.filter((pvState) => pvState.id != topping.id),
				...listExtraOptions,
			];
		});
	};

	useEffect(() => {
		setOrder((prevState) => {
			if (prevState) {
				let value = prevState.size.value;
				extras.forEach((extra) => {
					value = value + extra.value;
				});
				return { ...prevState, extras, value };
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [extras]);

	return order && order.size && order.size.amountOptions ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Adicione os extras:</p>
			</div>
			{mockedToppings.map((topping) => (
				<div className="w-100" key={topping.id}>
					<Numeric
						className="me-1"
						max={10}
						handleIncrement={() => handleIncrement(topping)}
						handleDecrement={() => handleDecrement(topping)}
						name={topping.name}
						label={`${topping.name} (R$
							${topping.value.toLocaleString("pt-BR", { currency: "BRL" })})`}
					/>
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Extras;
