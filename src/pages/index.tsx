import { Button, Card, Form } from "react-bootstrap";
import React from "react";
import Image from "next/image";
import { useWindowSize } from "../Hooks/windowsize";

const Home: React.FC<{}> = () => {
	const {
		windowSize: { width },
	} = useWindowSize();
	return (
		<div className="d-flex h-100vh">
			<div className="w-100 bg-primary d-flex justify-content-center flex-wrap align-items-center">
				<div className="d-flex w-100 justify-content-center align-self-end mb-3">
					<div className="d-flex align-items-center">
						<Image
							alt="logo"
							src="/meu-acai.jpg"
							className="rounded-circle me-3"
							width={width * 0.2}
							height={width * 0.2}
						/>
						<span className="moon-dance fs-1 fw-bold text-secondary">
							Meu Açai
						</span>
					</div>
				</div>
				<Card className="align-self-start">
					<Card.Body className="bg-secondary">
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" placeholder="Digite um email" />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Senha</Form.Label>
								<Form.Control type="password" placeholder="Digite sua senha" />
							</Form.Group>
							<Form.Group className="d-flex justify-content-center">
								<Button>Entrar</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default Home;
