import { Button, Card, Form } from "react-bootstrap";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import InputMask from "react-input-mask";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type Inputs = {
	phone: string;
	password: string;
};

const Home = () => {
	const { register, handleSubmit, watch } = useForm<Inputs>();

	const hasData = !!watch("phone") && !!watch("password");

	const route = useRouter();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log("data = ", data);
		route.push("/dashboard");
	};

	return (
		<div className="d-flex">
			<div className="d-flex justify-content-center flex-wrap align-items-center">
				<div className="d-flex w-100 justify-content-center align-self-end mb-3">
					<div className="d-flex align-items-center">
						<Image
							alt="logo"
							priority
							src="/product/meu-açai.png"
							className="rounded-circle"
							width={150}
							height={150}
						/>
					</div>
				</div>
				<Card className="align-self-start">
					<Card.Body className="bg-secondary">
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className="mb-3">
								<Form.Label>Telefone</Form.Label>
								<InputMask
									className="form-control"
									mask="+55 (099) 99999-9999"
									placeholder="Digite seu número"
									{...register("phone")}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Senha</Form.Label>
								<Form.Control
									type="password"
									placeholder="Digite sua senha"
									{...register("password")}
								/>
							</Form.Group>
							<Form.Group className="d-flex flex-wrap justify-content-center">
								<Button
									type="submit"
									className="mb-1"
									disabled={!hasData && process.env.NODE_ENV !== "development"}
								>
									Entrar
								</Button>
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
