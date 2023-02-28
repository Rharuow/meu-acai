import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import InputMask from "react-input-mask";

function ForgotPassword() {
	const [loading, setLoading] = useState(true);

	const methods = useForm<{ phone: string }>();

	const onSubmit = (data: { phone: string }) => {
		console.log(data);
	};

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
							<Button type="submit">Recuperar</Button>
						</Form>
					</Card.Body>
				</Card>
			)}
		</div>
	);
}

export default ForgotPassword;
