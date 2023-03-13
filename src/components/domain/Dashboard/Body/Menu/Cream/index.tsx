import { getCreams } from "@/src/service/docs/creams";
import React from "react";
import { useFormContext } from "react-hook-form";
import ReactLoading from "react-loading";
import useSWR, { Fetcher } from "swr";

import { Cream as TypeCream, Creams, Menu } from "@/src/entities/Product";
import Numeric from "@/src/components/Numeric";
import { pluralCase } from "@/src/utils/plural";

const Cream: React.FC = () => {
	const fetcher: Fetcher<Creams> = async () => await getCreams();

	const { setValue, getValues, watch } = useFormContext<Menu>();

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

	return !isLoading ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0 text-primary">
					Escolha{" "}
					{pluralCase(
						`${getValues("size").amountCreams} creme`,
						getValues("size").amountCreams
					)}
				</p>
			</div>
			{data?.map((cream) => (
				<div className="w-100 mb-3" key={cream.id}>
					<Numeric
						key={getValues("size").name}
						name={cream.name}
						lockedMax={watch("creams").length === watch("size").amountCreams}
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
