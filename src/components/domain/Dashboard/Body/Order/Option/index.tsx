import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import {
	mockedOptions,
	Options,
	Order,
} from "../../../../../../entities/Product";

const Option: React.FC<{
	order: Order | undefined;
	setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
}> = ({ order, setOrder }) => {
	const [options, setOptions] = useState<Options>([]);

	const checkboxsRef = useRef(new Array());

	useEffect(() => {
		setOrder(
			(prevState) =>
				prevState && {
					...prevState,
					options,
				}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options]);

	return order && order.size && order.size.amountOptions ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{order.size.amountOptions > 1 ? " até " : " "}
					{order.size.amountOptions} opç
					{order.size.amountOptions > 1 ? "ões:" : "ão:"}
				</p>
			</div>
			{mockedOptions.map((option, index) => (
				<div className="w-100" key={option.id}>
					<Form.Check
						type="checkbox"
						ref={(element: any) => checkboxsRef.current.push(element)}
						name="option"
						disabled={
							options.length >= order.size.amountOptions &&
							!checkboxsRef.current[index].checked
						}
						onChange={(e: any) => {
							setOptions((prevState) => {
								if (e.target.checked) {
									return [...prevState, option];
								}
								return prevState.filter((cr) => cr.id !== option.id);
							});
						}}
						label={option.name}
					/>
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Option;
