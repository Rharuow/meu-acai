import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import {
	mockedToppings,
	Toppings,
	Order,
} from "../../../../../../entities/Product";

const Topping: React.FC<{
	order: Order | undefined;
	setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
}> = ({ order, setOrder }) => {
	const [toppings, setToppings] = useState<Toppings>(
		order && order.toppings ? order.toppings : []
	);

	const checkboxsRef = useRef(new Array());

	useEffect(() => {
		setOrder(
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
	}, [order?.size]);

	return order && order.size && order.size.amountOptions ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{order.size.amountOptions > 1 ? " até " : " "}
					{order.size.amountOptions} opç
					{order.size.amountOptions > 1 ? "ões:" : "ão:"}
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
							toppings.length >= order.size.amountOptions &&
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
