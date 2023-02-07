import React, { useEffect, useState } from "react";
import {
	mockedOptions,
	Options,
	Option,
	Order,
} from "../../../../../../entities/Product";
import Numeric from "../../../../../Numeric";

const Extras: React.FC<{
	order: Order | undefined;
	setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
}> = ({ order, setOrder }) => {
	const [extras, setExtras] = useState<Options>([]);

	const handleIncrement = (option: Option) => {
		setExtras((prevState) => [...prevState, option]);
	};

	const handleDecrement = (option: Option) => {
		setExtras((prevState) => {
			const listExtraOptions = prevState.filter((ext) => ext.id === option.id);
			listExtraOptions.pop();
			return [
				...prevState.filter((pvState) => pvState.id != option.id),
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
			{mockedOptions.map((option) => (
				<div className="w-100" key={option.id}>
					<Numeric
						className="me-1"
						max={10}
						handleIncrement={() => handleIncrement(option)}
						handleDecrement={() => handleDecrement(option)}
						name={option.name}
						label={`${option.name} (R$
							${option.value.toLocaleString("pt-BR", { currency: "BRL" })})`}
					/>
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Extras;
