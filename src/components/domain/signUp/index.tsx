import { useRouter } from "next/router";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import InputMask from "react-input-mask";

import listAddress from "./utils/address";

const SignUp = () => {
	const route = useRouter();

	const { houses, squares } = listAddress();

	return (
		<div className="d-flex h-100vh">
			<Button
				className="position-absolute t-15px l-15px d-flex justify-content-center align-items-end"
				onClick={() => route.back()}
			>
				<i className="fs-1 fa fa-angle-left me-2"></i>Voltar
			</Button>
			<div className="w-100 bg-primary d-flex justify-content-center flex-wrap align-items-center">
				<Card className="shadow-lg">
					<Card.Body className="bg-secondary">
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Telefone</Form.Label>
								<InputMask
									className="form-control"
									mask="+55(099)99999-9999"
									placeholder="Digite seu número"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Endereço</Form.Label>
								<Form.Select
									aria-label="What's your square house address"
									className="mb-3"
								>
									{squares.map((square, index) => (
										<option key={index} value={index + 1}>
											Quadra {index + 1}
										</option>
									))}
								</Form.Select>
								<Form.Select aria-label="What's your house number address">
									{houses.map((house, index) => (
										<option key={index} value={index + 1}>
											Casa {index + 1}
										</option>
									))}
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Senha</Form.Label>
								<Form.Control type="password" placeholder="Digite sua senha" />
							</Form.Group>
							<Form.Group className="d-flex flex-wrap justify-content-center">
								<Button className="mb-1">Entrar</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default SignUp;
