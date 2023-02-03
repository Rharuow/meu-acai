import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";

const Numeric: React.FC<{
	label?: string;
	name: string;

	min?: number;
	max?: number;

	getValue?: (value?: number) => void;
	width?: number;
	heigth?: number;

	className?: string;
}> = ({
	label,
	name,
	min = 0,
	getValue = () => {
		console.log("getValue");
	},
	max = 999999999,
	width = 80,
	heigth = 10,
	className = "",
}) => {
	const numericInput = useRef<any>(null);

	return (
		<Form.Group className="d-flex align-items-center mb-1">
			<div className="position-relative h-35px me-1">
				<Form.Control
					type="number"
					name={name}
					{...(min && { min })}
					{...(max && { max })}
					ref={numericInput}
					className={`w-${width}px h-100 text-center ps-3 h-${heigth} ${className}`}
				/>
				<Button
					className="position-absolute h-25px rounded-circle fw-bold z-index-1 w-25px text-center p-0 top-5px"
					size="sm"
					onClick={() => {
						max > numericInput.current.value && numericInput.current.stepUp();
						getValue(numericInput.current.value as number);
					}}
				>
					+
				</Button>
				<Button
					className="position-absolute h-25px rounded-circle fw-bold z-index-1 w-25px p-0 top-5px end-4px"
					size="sm"
					onClick={() => {
						min < numericInput.current.value && numericInput.current.stepDown();
						getValue(numericInput.current.value as number);
					}}
				>
					-
				</Button>
			</div>
			{label && <Form.Label className="w-100 mb-0">{label}</Form.Label>}
		</Form.Group>
	);
};

export default Numeric;
