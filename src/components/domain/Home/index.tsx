import { Button, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InputMask from "react-input-mask";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { createSession, userIsActive } from "@/src/service/docs/users";
import { useSessionContext } from "@/src/rharuow-admin/context/Session";
import { User } from "@/src/entities/User";
import { whatsappNumerFormatter } from "@/src/utils/whatsappNumberFormatter";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";

type Inputs = {
	phone: string;
	password: string;
};

const Home = () => {
	const { register, handleSubmit, watch } = useForm<Inputs>();

	const [loading, setLoading] = useState(true);

	const hasData = !!watch("phone") && !!watch("password");

	const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
		setLoading(true);
		const hasSession = await createSession(data as User);

		if (hasSession && !hasSession.hasOwnProperty("type")) {
			Cookies.set("user", JSON.stringify(hasSession));
			return (window.location.href = `${process.env.NEXT_PUBLIC_URL}/dashboard`);
		}
		if (hasSession && hasSession.hasOwnProperty("type"))
			return Swal.fire({
				title: "Oppsss...",
				text: "Você precisa ativar sua conta!",
				icon: "info",
				confirmButtonText: "Ativar!",
			}).then(() => {
				const user: User = hasSession as unknown as User;
				const encondeText = encodeURI(
					`Click no link para ativar sua conta: ${process.env.NEXT_PUBLIC_URL}/confirmation?code=${user.hashCode}`
				);
				window.open(
					`https://wa.me/55${whatsappNumerFormatter(
						user.phone
					)}?text=${encondeText}`,
					"_blank"
				);
			});

		Swal.fire({
			title: "Oppsss...",
			text: "Senha ou número errados!",
			icon: "error",
		});
		setLoading(false);
	};

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<>
			{loading ? (
				<div className="d-flex justify-content-center w-100 h-100vh align-items-center">
					<ReactLoading type="spinningBubbles" />
				</div>
			) : (
				<div className="d-flex justify-content-center h-100vh flex-wrap align-items-center p-3">
					<div className="d-flex w-100 justify-content-center align-self-end">
						<div className="d-flex align-items-center">
							<Image
								alt="logo"
								priority
								src="/product/meu-açai.png"
								className="rounded-circle"
								width={120}
								height={120}
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
										mask="+55(099)99999-9999"
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
									<Button type="submit" className="mb-1" disabled={!hasData}>
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
			)}
		</>
	);
};

export default Home;
