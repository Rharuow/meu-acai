import { Button, Card, Form } from "react-bootstrap";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
	return (
		<div className="d-flex h-100vh">
			<div className="w-100 bg-primary d-flex justify-content-center flex-wrap align-items-center">
				<div className="d-flex w-100 justify-content-center align-self-end mb-3">
					<div className="d-flex align-items-center">
						<Image
							alt="logo"
							src="/product/meu-açai.png"
							className="rounded-circle"
							width={150}
							height={150}
						/>
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
							<Form.Group className="d-flex flex-wrap justify-content-center">
								<Button className="mb-1">Entrar</Button>
								<div className="w-100 text-center">
									<small>
										<Link href="/signup">Me cadastrar</Link>
									</small>
								</div>
								<div className="w-100 text-center">
									<small>
										<Link href="/forgot-password">Esqueci minha senha</Link>
									</small>
								</div>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default Home;
