import { getCreams } from "@/src/service/docs/creams";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ReactLoading from "react-loading";
import useSWR, { Fetcher } from "swr";

import { Creams, Menu } from "../../../../../../entities/Product";

const Cream: React.FC = () => {
	const [creams, setCreams] = useState<Creams>([]);

	const checkboxsRef = useRef(new Array());

	const fetcher: Fetcher<Creams> = async () => await getCreams();

	const { data, error, isLoading } = useSWR("creams", fetcher);

	console.log(error);

	useEffect(() => {
		data && setCreams(data);
	}, [data]);

	return !isLoading ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Escolha</p>
			</div>
			{creams.map((cream, index) => (
				<div className="w-100" key={cream.id}>
					<Form.Check
						ref={(element: any) => checkboxsRef.current.push(element)}
						type="checkbox"
						checked={creams.map((cr) => cr.id).includes(cream.id)}
						name="cream"
						label={cream.name}
					/>
				</div>
			))}
		</>
	) : (
		<ReactLoading type="spinningBubbles" color="#ffccff" />
	);
};

export default Cream;
