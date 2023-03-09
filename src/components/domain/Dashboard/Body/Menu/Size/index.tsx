import React from "react";
import { Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import useSWR, { Fetcher } from "swr";

import { Size } from "@/src/entities/Product";
import { getSizes } from "@/src/service/docs/size";
import { useWindowSize } from "@/src/Hooks/windowsize";
import { useFormContext } from "react-hook-form";

const Size: React.FC = () => {
	const { isMobile } = useWindowSize();

	const { setValue, watch } = useFormContext();

	const fetcher: Fetcher<Array<Size>> = async () => await getSizes();

	const { data, error, isLoading } = useSWR("sizes", fetcher);

	return (
		<>
			{isLoading ? (
				<ReactLoading type="spinningBubbles" color="#ffccff" />
			) : (
				<>
					<div className="w-100 mb-1">
						<p className="fs-6 text-primary fw-bold mb-0">Tamanho</p>
					</div>
					<div className="d-flex flex-wrap justify-content-around w-100 mb-3">
						{data &&
							data.map((size) => (
								<div key={size.id} className={`${isMobile ? "w-50" : "w-25"} `}>
									<Button
										className="w-80 mb-2"
										variant={
											size.name === watch("size")?.name
												? "primary"
												: "outline-primary"
										}
										onClick={() => setValue("size", size)}
									>
										{size.name}
									</Button>
								</div>
							))}
					</div>
				</>
			)}
		</>
	);
};

export default Size;
