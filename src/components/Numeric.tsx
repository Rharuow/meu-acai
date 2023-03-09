import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

const Numeric: React.FC<{
	label?: string;
	name: string;

	min?: number;
	max?: number;

	width?: number;
	heigth?: number;

	locked?: boolean;
	vertical?: boolean;

	defaultValue?: number;
	getValue?: (value?: number) => void;
	handleIncrement?: () => void;
	handleDecrement?: () => void;

	className?: string;
}> = ({
	vertical,
	label,
	locked = false,
	name,
	min = 0,
	defaultValue = 0,
	getValue = (value?: number) => {
		console.log("getValue = ", value);
	},
	handleIncrement = () => {
		console.log("handleIncrement");
	},
	handleDecrement = () => {
		console.log("handleDecrement");
	},
	max = 999999999,
	width = 80,
	heigth = 10,
	className = "",
}) => {
	const numericInput = useRef<any>(0);

	const [maxDisabled, setMaxDisabled] = useState(false);
	const [minDisabled, setMinDisabled] = useState(false);
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		setMaxDisabled(max == value);
		setMinDisabled(min == value);
	}, [max, min, value]);

	return (
		<Form.Group
			className={`d-flex align-items-center mb-1 ${
				vertical ? "flex-wrap" : " "
			}`}
		>
			{label && vertical && (
				<Form.Label className="w-100 mb-0 text-primary">{label}</Form.Label>
			)}
			<div className="position-relative h-35px me-1">
				<Form.Control
					type="number"
					defaultValue={defaultValue}
					name={name}
					disabled
					{...(min && { min })}
					{...(max && { max })}
					ref={numericInput}
					className={`w-${width}px h-100 text-center ps-3 h-${heigth} ${className}`}
				/>
				<Button
					className="position-absolute h-25px rounded-circle fw-bold z-index-1 w-25px text-center p-0 top-5px end-4px"
					size="sm"
					disabled={maxDisabled || locked}
					onClick={() => {
						max > numericInput.current.value && numericInput.current.stepUp();
						setValue(numericInput.current.value as number);
						getValue(numericInput.current.value as number);
						handleIncrement();
					}}
				>
					+
				</Button>
				<Button
					className="position-absolute h-25px rounded-circle fw-bold z-index-1 w-25px p-0 top-5px s-0"
					size="sm"
					disabled={minDisabled || locked}
					onClick={() => {
						min < numericInput.current.value && numericInput.current.stepDown();
						setValue(numericInput.current.value as number);
						getValue(numericInput.current.value as number);
						handleDecrement();
					}}
				>
					-
				</Button>
			</div>
			{label && !vertical && (
				<Form.Label className="w-100 mb-0 text-primary">{label}</Form.Label>
			)}
		</Form.Group>
	);
};

export default Numeric;
