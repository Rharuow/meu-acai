import { useWindowSize } from "@/src/Hooks/windowsize";
import { getCreams } from "@/src/service/docs/creams";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import ReactLoading from "react-loading";
import useSWR, { Fetcher } from "swr";

import { Cream as TypeCream, Creams, Menu } from "@/src/entities/Product";
import Numeric from "@/src/components/Numeric";

const Cream: React.FC = () => {
	const fetcher: Fetcher<Creams> = async () => await getCreams();

	const { setValue, getValues } = useFormContext<Menu>();

	const { data, error, isLoading } = useSWR("creams", fetcher);

	const addCream = (cream: TypeCream) => {
		setValue("creams", [...getValues("creams"), cream]);
	};

	const removeCream = (cream: TypeCream) => {
		setValue(
			"creams",
			getValues("creams").filter((c) => c.id !== cream.id)
		);
	};

	useEffect(() => {
		setValue("creams", []);
	}, [setValue]);

	return !isLoading ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0 text-primary">Escolha</p>
			</div>
			{data?.map((cream) => (
				<div className="w-100 mb-3" key={cream.id}>
					<Numeric
						max={10}
						name={cream.name}
						label={cream.name}
						handleIncrement={() => addCream(cream)}
						handleDecrement={() => removeCream(cream)}
					/>
				</div>
			))}
		</>
	) : (
		<ReactLoading type="spinningBubbles" color="#ffccff" />
	);
};

export default Cream;
