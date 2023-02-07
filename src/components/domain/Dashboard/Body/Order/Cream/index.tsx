import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

import {
	Creams,
	mockedCreams,
	Order,
} from "../../../../../../entities/Product";

const Cream: React.FC<{
	order: Order | undefined;
	setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
}> = ({ order, setOrder }) => {
	const [creams, setCreams] = useState<Creams>([]);

	const checkboxsRef = useRef(new Array());

	useEffect(() => {
		setOrder(
			(prevState) =>
				prevState && {
					...prevState,
					creams,
				}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [creams]);

	return order && order.size && order.size.amountCreams ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{order.size.amountCreams > 1 ? " até " : " "}
					{order.size.amountCreams} Creme
					{order.size.amountCreams > 1 ? "s:" : ":"}
				</p>
			</div>
			{mockedCreams.map((cream, index) => (
				<div className="w-100" key={cream.id}>
					<Form.Check
						ref={(element: any) => checkboxsRef.current.push(element)}
						type="checkbox"
						disabled={
							creams.length >= order.size.amountCreams &&
							!checkboxsRef.current[index].checked
						}
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
