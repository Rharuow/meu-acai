import React, { useState } from "react";
import {
	mockedOptions,
	Options,
	Option,
	Order,
} from "../../../../../../entities/Product";
import Numeric from "../../../../../Numeric";

const Extras: React.FC<{ order: Order | undefined }> = ({ order }) => {
	const [extras, setExtras] = useState<Options>([]);

	const handleChange = (value: number | undefined, option: Option) => {
		setExtras((prevState) => {
			if (prevState.length > 0) {
				return [...prevState, option];
			}
			return [...prevState];
		});
	};

	return order && order.size && order.size.amountOptions ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Adicione os extras:</p>
			</div>
			{mockedOptions.map((option) => (
				<div className="w-100" key={option.id}>
					<Numeric
						className="me-1"
						getValue={(value) => handleChange(value, option)}
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
