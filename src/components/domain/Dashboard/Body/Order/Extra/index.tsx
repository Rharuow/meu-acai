import React from "react";
import { Form } from "react-bootstrap";
import { mockedOptions, Product } from "../../../../../../entities/Product";

const Extras: React.FC<{ order: Product | undefined }> = ({ order }) => {
	return order && order.size && order.size.amoutnOptions ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Adicione os extras:</p>
			</div>
			{mockedOptions.map((option) => (
				<div className="w-100" key={option.id}>
					<Form.Check
						type="checkbox"
						name="option"
						label={`${option.name} (+ R$ ${option.value.toLocaleString(
							"pt-BR",
							{ currency: "BRL" }
						)})`}
					/>
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Extras;
