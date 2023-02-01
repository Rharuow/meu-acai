import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {
	Cream,
	mockedCreams,
	Product,
} from "../../../../../../entities/Product";

const Cream: React.FC<{ order: Product | undefined }> = ({ order }) => {
	const [creams, setCreams] = useState<Array<Cream | null>>([]);

	return order && order.size && order.size.amountCreams ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{order.size.amountCreams > 1 ? " até " : " "}
					{order.size.amountCreams} Creme
					{order.size.amountCreams > 1 ? "s:" : ":"}
				</p>
			</div>
			{mockedCreams.map((cream) => (
				<div className="w-100" key={cream.id}>
					<Form.Check type="checkbox" name="cream" label={cream.name} />
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Cream;
