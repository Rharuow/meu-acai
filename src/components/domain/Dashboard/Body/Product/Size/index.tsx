import React from "react";
import { Form } from "react-bootstrap";

import { mockedSizes, Product } from "../../../../../../entities/Product";

const Size: React.FC<{
	setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}> = ({ setProduct }) => {
	return (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Tamanho</p>
			</div>
			<div className="d-flex justify-content-around w-100 mb-3">
				{mockedSizes.map((size) => (
					<Form.Check
						key={size.id}
						type="radio"
						name="size"
						onClick={() => {
							setProduct({
								size,
								value: size.value,
								creams: [],
							});
						}}
						label={size.name}
					/>
				))}
			</div>
		</>
	);
};

export default Size;
