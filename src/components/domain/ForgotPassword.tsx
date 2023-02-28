import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import InputMask from "react-input-mask";
import { getUserByPhone } from "@/src/service/docs/users";
import Swal from "sweetalert2";
import { User } from "@/src/entities/User";
import {
	validateSizeNumbers,
	whatsappNumerFormatter,
} from "@/src/utils/whatsappNumberFormatter";
import { useRouter } from "next/router";

function ForgotPassword() {
	const [loading, setLoading] = useState(true);

	const methods = useForm<{ phone: string }>();

	const onSubmit = async ({ phone }: { phone: string }) => {
		const user = (await getUserByPhone(phone)) as User;

		if (!user)
			Swal.fire({
				title: "Ops...",
				text: "Não foi possível encontrar seu número...",
				icon: "error",
				confirmButtonText: "OK",
			});
		else {
			Swal.fire({
				title: "Perfeito!",
				text: "Enviaremos uma menssagem para seu whatsapp...",
				icon: "success",
				confirmButtonText: "OK",
			}).then(() => {
				const encondeText = encodeURI(
					`Click no link recuperar sua senha: ${process.env.NEXT_PUBLIC_URL}/recovery?code=${user.hashCode}`
				);
				window.open(
					`https://wa.me/55${whatsappNumerFormatter(
						user.phone
					)}?text=${encondeText}`,
					"_blank"
				);
			});
		}
	};

	const router = useRouter();

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<div className="d-flex justify-content-center flex-wrap align-items-center h-100vh bg-primary">
			{loading ? (
				<ReactLoading type="spinningBubbles" />
			) : (
				<Card bg="secondary">
					<Card.Body>
						<Form onSubmit={methods.handleSubmit(onSubmit)}>
							<Form.Group className="mb-3">
								<Form.Label>Phone Number</Form.Label>
								<InputMask
									{...methods.register("phone")}
									className="form-control"
									mask="+55(099)99999-9999"
									placeholder="Digite seu número"
									required
								/>
							</Form.Group>
							<div className="d-flex justify-content-between">
								<Button
									variant="danger"
									className="text-white"
									onClick={() => router.back()}
								>
									Voltar
								</Button>
								<Button
									variant="success"
									type="submit"
									disabled={
										!methods.watch("phone") ||
										!validateSizeNumbers(methods.watch("phone"))
									}
								>
									Recuperar
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			)}
		</div>
	);
}

export default ForgotPassword;
