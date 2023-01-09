import { useRouter } from "next/router";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useWindowSize } from "../../../Hooks/windowsize";

const SignUp = () => {
	const route = useRouter();
	return (
		<div className="d-flex h-100vh">
			<Button
				className="position-absolute t-25px l-25px d-flex justify-content-center align-items-end"
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
								<Form.Control type="number" placeholder="Digite seu telefone" />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Endereço</Form.Label>
								<Form.Select aria-label="Default select example">
									<option>Quadra</option>
									[1,]
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
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
