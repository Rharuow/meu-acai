import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";

import listAddress from "./utils/address";
import { userAlreadyExists } from "@/src/service/docs/users";
import { Role, User } from "@/src/entities/User";
import { getRoles } from "@/src/service/docs/roles";

const SignUp = () => {
	const route = useRouter();
	const [validated, setValidated] = useState(false);
	const [numberMessageValidator, setNumberMessageValidator] = useState(
		"O número de telefone é obrigatório!"
	);

	const { houses, squares } = listAddress();

	const methods = useForm<User>();

	const onSubmit = async (data: User, event: any) => {
		const form = event.target;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		const roles = (await getRoles()) as Array<Role>;

		console.log(roles);

		const dataFormatted: User = {
			...data,
			isActive: false,
			roles: roles.filter((role) => role.name === "user"),
		};

		console.log(dataFormatted);

		setValidated(true);
	};

	const handleCellPhoneValidation = async (
		e: React.FocusEvent<HTMLInputElement, Element>
	) => {
		const userExists = await userAlreadyExists(e.target.value);
		console.log(
			e.target.value.split("").filter((v) => v !== "_" && v !== "-").length
		);
		if (userExists) {
			setValidated(true);
			e.target.value = "";
			setNumberMessageValidator("Número já cadastrado!");
		} else if (
			e.target.value.split("").filter((v) => v !== "_" && v !== "-").length < 18
		) {
			setValidated(true);
			e.target.value = "";
			setNumberMessageValidator("Número muito curto.");
		}
	};
	return (
		<div className="d-flex flex-wrap pb-5 bg-primary">
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
				<Card className="shadow-lg border-primary">
					<Card.Body className="bg-secondary">
						<Form
							noValidate
							validated={validated}
							onSubmit={methods.handleSubmit(onSubmit)}
						>
							<Form.Group className="mb-3">
								<Form.Label className="text-primary">Telefone</Form.Label>
								<InputMask
									{...methods.register("phone")}
									className="form-control"
									mask="+55(099)99999-9999"
									placeholder="Digite seu número"
									onBlur={(e) => handleCellPhoneValidation(e)}
									required
								/>
								<Form.Control.Feedback type="invalid">
									{numberMessageValidator}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="text-primary">Nome</Form.Label>
								<FormControl placeholder="Digite seu nome" required />
								<Form.Control.Feedback type="invalid">
									O nome é obrigatório
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="text-primary">Endereço</Form.Label>
								<Form.Select
									aria-label="What's your square house address"
									className="mb-3"
									required
									{...methods.register("address.square")}
								>
									{squares.map((square, index) => (
										<option key={index} value={index + 1}>
											Quadra {index + 1}
										</option>
									))}
								</Form.Select>
								<Form.Select
									{...methods.register("address.house")}
									aria-label="What's your house number address"
									required
								>
									{houses.map((house, index) => (
										<option key={index} value={index + 1}>
											Casa {index + 1}
										</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									O endereço é obrigatório
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="text-primary">Senha</Form.Label>
								<Form.Control
									type="password"
									{...methods.register("password")}
									placeholder="Digite sua senha"
									required
								/>
								<Form.Control.Feedback type="invalid">
									A senha é obrigatória
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="d-flex flex-wrap justify-content-center">
								<Button type="submit" className="mb-1">
									Entrar
								</Button>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default SignUp;
