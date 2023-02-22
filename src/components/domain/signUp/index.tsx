import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import InputMask from "react-input-mask";

import listAddress from "./utils/address";

const SignUp = () => {
	const route = useRouter();

	const { houses, squares } = listAddress();

	return (
		<div className="d-flex flex-wrap pb-5">
			<div className="w-100 mt-15px ms-15px mb-3">
				<Button
					className="d-flex justify-content-center align-items-center"
					onClick={() => route.back()}
				>
					<FontAwesomeIcon icon={faAngleLeft} className="me-2" />
					Voltar
				</Button>
			</div>
			<div className="w-100 d-flex justify-content-center flex-wrap align-items-center">
				<Card className="shadow-lg">
					<Card.Body className="bg-secondary">
						<Form>
							<Form.Group className="mb-3">
								<Form.Label className="text-primary">Telefone</Form.Label>
								<InputMask
									className="form-control"
									mask="+55(099)99999-9999"
									placeholder="Digite seu número"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="text-primary">Nome</Form.Label>
								<FormControl placeholder="Digite seu nome" />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="text-primary">Endereço</Form.Label>
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
								<Form.Label className="text-primary">Senha</Form.Label>
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
