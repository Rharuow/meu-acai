import React from "react";
import { Form } from "react-bootstrap";
import ReactLoading from "react-loading";
import useSWR, { Fetcher } from "swr";

import { Size } from "@/src/entities/Product";
import { getSizes } from "@/src/service/docs/size";
import { useWindowSize } from "@/src/Hooks/windowsize";

const Size: React.FC = () => {
	const { isMobile } = useWindowSize();

	const fetcher: Fetcher<Array<Size>> = async () => await getSizes();

	const { data, error, isLoading } = useSWR("sizes", fetcher);
	console.log(error);

	return (
		<>
			{isLoading ? (
				<ReactLoading type="spinningBubbles" color="#ffccff" />
			) : (
				<>
					<div className="w-100 mb-1">
						<p className="fs-6 fw-bold mb-0">Tamanho</p>
					</div>
					<div className="d-flex flex-wrap justify-content-around w-100 mb-3">
						{data &&
							data.map((size) => (
								<div key={size.id} className={`${isMobile ? "w-50" : "w-25"} `}>
									<Form.Check
										type="radio"
										className="text-primary fw-bold"
										name="size"
										label={size.name}
									/>
								</div>
							))}
					</div>
				</>
			)}
		</>
	);
};

export default Size;
