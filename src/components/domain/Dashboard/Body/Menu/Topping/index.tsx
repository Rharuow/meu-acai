import { getToppings } from "@/src/service/docs/toppings";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Toppings, Menu } from "../../../../../../entities/Product";

const Topping: React.FC<{
	menu: Menu | undefined;
	setMenu: React.Dispatch<React.SetStateAction<Menu | undefined>>;
}> = ({ menu, setMenu }) => {
	const [toppings, setToppings] = useState<Toppings>(
		menu && menu.toppings ? menu.toppings : []
	);

	const checkboxsRef = useRef(new Array());

	const {
		data,
		error,
		isLoading,
	}: { data: Toppings; error: any; isLoading: boolean } = useSWR(
		"/toppings",
		getToppings
	);

	useEffect(() => {
		setMenu(
			(prevState) =>
				prevState && {
					...prevState,
					toppings,
				}
		);
	}, [setMenu, toppings]);

	return menu && menu.size && menu.size.amountOptions ? (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">
					Escolha{menu.size.amountOptions > 1 ? " até " : " "}
					{menu.size.amountOptions} opç
					{menu.size.amountOptions > 1 ? "ões:" : "ão:"}
				</p>
			</div>
			{data.map((topping, index) => (
				<div className="w-100" key={topping.id}>
					<Form.Check
						type="checkbox"
						ref={(element: any) => checkboxsRef.current.push(element)}
						checked={toppings.map((top) => top.id).includes(topping.id)}
						name="topping"
						disabled={
							toppings.length >= menu.size.amountOptions &&
							!checkboxsRef.current[index].checked
						}
						onChange={(e: any) => {
							setToppings((prevState) => {
								if (e.target.checked) {
									return [...prevState, topping];
								}
								return prevState.filter((cr) => cr.id !== topping.id);
							});
						}}
						label={topping.name}
					/>
				</div>
			))}
		</>
	) : (
		<></>
	);
};

export default Topping;
function useSWR(
	arg0: string,
	fetcher: any
): { data: any; error: any; isLoading: any } {
	throw new Error("Function not implemented.");
}
