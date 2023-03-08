import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { Menu, Size } from "@/src/entities/Product";
import { getSizes } from "@/src/service/docs/size";
import { useWindowSize } from "@/src/Hooks/windowsize";

const Size: React.FC<{
	product: Menu | undefined;
	setProduct: React.Dispatch<React.SetStateAction<Menu | undefined>>;
}> = ({ product, setProduct }) => {
	const [sizes, setSizes] = useState<Array<Size>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const { isMobile } = useWindowSize();

	const recoverySizes = async () => {
		setSizes(await getSizes());
		setLoading(false);
	};

	useEffect(() => {
		loading && recoverySizes();
	}, [loading]);

	return (
		<>
			<div className="w-100 mb-1">
				<p className="fs-6 fw-bold mb-0">Tamanho</p>
			</div>
			<div className="d-flex flex-wrap justify-content-around w-100 mb-3">
				{sizes.map((size) => (
					<div key={size.id} className={`${isMobile ? "w-50" : "w-25"} `}>
						<Form.Check
							type="radio"
							className="text-primary fw-bold"
							name="size"
							onClick={() => {
								const value =
									product && product.extras
										? size.value +
										  product.extras.reduce(
												(accumulator, currentValue) =>
													accumulator + currentValue.value,
												0
										  )
										: size.value;

								setProduct({
									id: "1",
									name: "Produto montado",
									visible: true,
									size,
									value,
									creams: [],
									extras:
										product && product.extras ? product.extras : undefined,
								});
							}}
							label={size.name}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default Size;
