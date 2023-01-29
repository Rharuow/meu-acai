import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { PixQRCode } from "pix-react";

import { UserMoked } from "../../../../entities/User";

const Wallet = () => {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState<number>(1);

	const handleClick = () => setShow(true);
	const handleCloseModal = () => setShow(false);

	return (
		<div className="d-flex align-items-center flex-column p-3">
			<Modal centered show={show} onHide={handleCloseModal}>
				<Modal.Header closeButton>Depositar</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Valor</Form.Label>
						<CurrencyInput
							name="money"
							placeholder="Digite o valor"
							allowNegativeValue={false}
							decimalScale={2}
							min={1.0}
							defaultValue={1}
							fixedDecimalLength={2}
							intlConfig={{ locale: "pt-BR", currency: "BRL" }}
							onValueChange={(value) => {
								if (value) {
									setValue(parseFloat(value.replace(",", ".")));
								} else setValue(0);
							}}
						/>
						<Form.Text className="text-muted">
							Valor mínimo de R$ 1,00
						</Form.Text>
					</Form.Group>
					{value >= 1 && (
						<div className="d-flex justify-content-center flex-wrap">
							<PixQRCode
								pixParams={{
									chave: `${process.env.NEXT_PUBLIC_PIX_KEY}`,
									recebedor: `${process.env.NEXT_PUBLIC_PIX_NAME}`,
									cidade: `${process.env.NEXT_PUBLIC_PIX_CITY}`,
									identificador: `${process.env.NEXT_PUBLIC_PIX_IDENTIFIER}`,
									valor: value,
									mensagem: `Por favor, despoistar esse valor na minha carteira. (${UserMoked.name})`,
								}}
								renderAs="svg"
								size={256}
							/>
							<Button className="mt-3">Depósito feito</Button>
						</div>
					)}
				</Modal.Body>
			</Modal>
			<h2>{UserMoked.wallet} R$</h2>
			<Button onClick={handleClick}>Depositar</Button>
		</div>
	);
};

export default Wallet;
