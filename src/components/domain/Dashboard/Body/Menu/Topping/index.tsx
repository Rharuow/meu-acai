import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import {
	mockedToppings,
	Toppings,
	Product,
} from "../../../../../../entities/Product";

const Topping: React.FC<{
	product: Product | undefined;
	setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}> = ({ product, setProduct }) => {
	const [toppings, setToppings] = useState<Toppings>(
		product && product.toppings ? product.toppings : []
	);

	const checkboxsRef = useRef(new Array());

	useEffect(() => {
		setProduct(
			(prevState) =>
				prevState && {
					...prevState,
					toppings,
				}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toppings]);

	useEffect(() => {
		setToppings([]);
	}, [product?.size]);

	return product && product.size && product.size.amountOptions ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{product.size.amountOptions > 1 ? " até " : " "}
					{product.size.amountOptions} opç
					{product.size.amountOptions > 1 ? "ões:" : "ão:"}
				</p>
			</div>
			{mockedToppings.map((topping, index) => (
				<div className="w-100" key={topping.id}>
					<Form.Check
						type="checkbox"
						ref={(element: any) => checkboxsRef.current.push(element)}
						checked={toppings.map((top) => top.id).includes(topping.id)}
						name="topping"
						disabled={
							toppings.length >= product.size.amountOptions &&
							!checkboxsRef.current[index].checked
						}
						onChange={(e: any) => {
							setToppings((prevState) => {
								if (e.target.checked) {
									return [...prevState, topping];
								}
								return prevState.filter((cr) => cr.id !== topping.id);
							});
						}}
						label={topping.name}
					/>
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Topping;
