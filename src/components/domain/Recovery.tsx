import { getUserByCode, updateUser } from "@/src/service/docs/users";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Lottie from "react-lottie";

import sorryAnimation from "@/src/components/sorryAnimation.json";
import { User } from "@/src/entities/User";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SHA256 } from "crypto-js";
import Swal from "sweetalert2";

type FormType = {
	password: string;
	passwordConfirmation: string;
};

const defaultOptions = {
	loop: true,
	autoplay: true,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

function Recovery() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User>();

	const router = useRouter();

	const getUser = async (hashCode: string) => {
		setLoading(true);
		setUser((await getUserByCode(hashCode)) as User);

		setLoading(false);
	};

	const onSubmit = async (data: FormType) => {
		const userUpdated =
			user &&
			user.id &&
			(await updateUser(user.id, {
				password: SHA256(data.password).toString(),
			}));

		if (!userUpdated)
			Swal.fire({
				title: "Desculpe...",
				text: "Algo deu errado...",
				icon: "error",
			});
		else
			Swal.fire({
				title: "Perfeito!!",
				text: "Vá testar sua nova senha!",
				icon: "success",
				confirmButtonText: "Ir para login",
			}).then(() => {
				router.push("/");
			});
	};

	const validFieldsForms = () => {
		return (
			watch("password") &&
			watch("password").length > 0 &&
			watch("password") === watch("passwordConfirmation")
		);
	};

	const { register, handleSubmit, watch } = useForm<FormType>();

	useEffect(() => {
		router &&
			router.query &&
			router.query.code &&
			getUser(router.query.code as string);
	}, [router, router.query]);

	return (
		<div className="h-100vh bg-primary d-flex justify-content-center align-items-center">
			{loading ? (
				<ReactLoading type="spinningBubbles" />
			) : user ? (
				<Card bg="secondary">
					<Card.Body>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className="mb-3">
								<Form.Label className="fw-bold text-primary">Senha</Form.Label>
								<Form.Control
									{...register("password", { required: true })}
									type="password"
									placeholder="Password"
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="fw-bold text-primary">
									Confirme Senha
								</Form.Label>
								<Form.Control
									{...register("passwordConfirmation", { required: true })}
									type="password"
									placeholder="Password"
									required
								/>
								{!validFieldsForms() && (
									<div className="text-danger fw-bold">
										<small>Senhas não são íguais!</small>
									</div>
								)}
							</Form.Group>
							<div className="d-flex justify-content-center align-items-center">
								<Button
									type="submit"
									disabled={!validFieldsForms()}
									variant="success"
								>
									Salvar
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			) : (
				<div className="d-flex justify-content-center align-items-center flex-wrap">
					<Lottie
						options={{ ...defaultOptions, animationData: sorryAnimation }}
					/>
					<div className="w-100 d-flex flex-wrap justify-content-center align-items-center">
						<div className="w-100">
							<p className="text-secondary text-center fw-bold mt-3 mb-1">
								Desculpe...
							</p>
							<p className="text-secondary text-center fw-bold">
								Há algo de errado com seu link!
							</p>
						</div>
						<Button
							variant="danger"
							className="text-white"
							onClick={() => router.push("/")}
						>
							Voltar
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Recovery;
