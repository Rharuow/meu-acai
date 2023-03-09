import { getToppings } from "@/src/service/docs/toppings";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import useSWR, { Fetcher } from "swr";
import ReactLoading from "react-loading";

import { Toppings, Menu } from "../../../../../../entities/Product";

const Topping: React.FC = () => {
	const fetcher: Fetcher<Toppings> = async () => await getToppings();

	const checkboxsRef = useRef(new Array());

	const { data, error, isLoading } = useSWR("/toppings", fetcher);

	return data && !isLoading ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Escolha</p>
			</div>
			{data.map((topping, index) => (
				<div className="w-100" key={topping.id}>
					<Form.Check
						type="checkbox"
						ref={(element: any) => checkboxsRef.current.push(element)}
						name="topping"
						label={topping.name}
					/>
				</div>
			))}
		</>
	) : (
		<ReactLoading type="spinningBubbles" color="#ffccff" />
	);
};

export default Topping;
