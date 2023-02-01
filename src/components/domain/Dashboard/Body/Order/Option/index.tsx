import React from "react";
import { Form } from "react-bootstrap";
import { mockedOptions, Product } from "../../../../../../entities/Product";

const Option: React.FC<{ order: Product | undefined }> = ({ order }) => {
	return order && order.size && order.size.amoutnOptions ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{order.size.amoutnOptions > 1 ? " até " : " "}
					{order.size.amoutnOptions} opç
					{order.size.amoutnOptions > 1 ? "ões:" : "ão:"}
				</p>
			</div>
			{mockedOptions.map((option) => (
				<div className="w-100" key={option.id}>
					<Form.Check type="checkbox" name="option" label={option.name} />
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Option;
