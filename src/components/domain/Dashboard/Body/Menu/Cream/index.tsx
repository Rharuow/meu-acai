import { getCreams } from "@/src/service/docs/creams";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ReactLoading from "react-loading";

import { Creams, Menu } from "../../../../../../entities/Product";

const Cream: React.FC<{
	menu: Menu | undefined;
	setMenu: React.Dispatch<React.SetStateAction<Menu | undefined>>;
}> = ({ menu, setMenu }) => {
	const [creams, setCreams] = useState<Creams>([]);
	const [creamsSelected, setCreamsSelected] = useState<Creams>(
		menu && menu.creams ? menu.creams : []
	);
	const [loading, setLoading] = useState<boolean>(true);

	const checkboxsRef = useRef(new Array());

	const allCreams = async () => {
		setCreams(await getCreams());
		setLoading(false);
	};

	useEffect(() => {
		loading && allCreams();
		setMenu(
			(prevState) =>
				prevState && {
					...prevState,
					creamsSelected,
				}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return !loading && menu ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{menu.size.amountCreams > 1 ? " até " : " "}
					{menu.size.amountCreams} Creme
					{menu.size.amountCreams > 1 ? "s:" : ":"}
				</p>
			</div>
			{creams.map((cream, index) => (
				<div className="w-100" key={cream.id}>
					<Form.Check
						ref={(element: any) => checkboxsRef.current.push(element)}
						type="checkbox"
						disabled={
							creams.length >= menu.size.amountCreams &&
							!checkboxsRef.current[index].checked
						}
						checked={creams.map((cr) => cr.id).includes(cream.id)}
						onChange={(e: any) => {
							setCreamsSelected((prevState) => {
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
		<ReactLoading type="spinningBubbles" color="#ffccff" />
	);
};

export default Cream;
