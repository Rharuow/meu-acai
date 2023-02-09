import React, { useEffect, useState } from "react";
import {
	mockedToppings,
	Toppings,
	Topping,
	Product,
} from "../../../../../../entities/Product";
import Numeric from "../../../../../Numeric";

const Extras: React.FC<{
	product: Product | undefined;
	setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}> = ({ product, setProduct }) => {
	const [extras, setExtras] = useState<Toppings>(
		product && product.extras ? product.extras : []
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
		setProduct((prevState) => {
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

	return product && product.size && product.size.amountOptions ? (
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
