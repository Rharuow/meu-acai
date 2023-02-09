import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

import {
	Creams,
	mockedCreams,
	Product,
} from "../../../../../../entities/Product";

const Cream: React.FC<{
	product: Product | undefined;
	setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}> = ({ product, setProduct }) => {
	const [creams, setCreams] = useState<Creams>(
		product && product.creams ? product.creams : []
	);

	const checkboxsRef = useRef(new Array());

	useEffect(() => {
		setProduct(
			(prevState) =>
				prevState && {
					...prevState,
					creams,
				}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creams]);

	useEffect(() => {
		setCreams([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product?.size]);

	return product && product.size && product.size.amountCreams ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{product.size.amountCreams > 1 ? " até " : " "}
					{product.size.amountCreams} Creme
					{product.size.amountCreams > 1 ? "s:" : ":"}
				</p>
			</div>
			{mockedCreams.map((cream, index) => (
				<div className="w-100" key={cream.id}>
					<Form.Check
						ref={(element: any) => checkboxsRef.current.push(element)}
						type="checkbox"
						disabled={
							creams.length >= product.size.amountCreams &&
							!checkboxsRef.current[index].checked
						}
						checked={creams.map((cr) => cr.id).includes(cream.id)}
						onChange={(e: any) => {
							setCreams((prevState) => {
								if (e.target.checked) {
									return [...prevState, cream];
								}
								return prevState.filter((cr) => cr.id !== cream.id);
							});
						}}
						name="cream"
						label={cream.name}
					/>
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Cream;
