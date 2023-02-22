/* eslint-disable react-hooks/exhaustive-deps */
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { useSessionContext } from "@/src/rharuow-admin/context/Session";

import Separator from "../../../../Separator";

const Profile = () => {
	const { user } = useSessionContext();

	const methods = useForm();

	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: "members",
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};

	useEffect(() => {
		user?.members?.forEach((member) => {
			append({ name: member.name, birthday: member.birthday });
		});
	}, []);

	return (
		<Card bg="secondary">
			<Card.Header>
				<Card.Title className="mb-0">Perfil</Card.Title>
			</Card.Header>
			<Card.Body>
				<FormProvider {...methods}>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<Form.Group className="mb-3">
							<Form.Label>Nome</Form.Label>
							<Form.Control defaultValue={user?.name} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Aniversário</Form.Label>
							<Form.Control defaultValue={user?.birthday} type="date" />
						</Form.Group>
						<p className="fs-4 fw-bold text-primary">Membros</p>
						<Separator className="mb-3" />
						{fields &&
							user?.members &&
							fields.map((member: any, index) => (
								<div key={member.id}>
									{index > 0 && <Separator dashed className="mb-3" />}
									<Form.Group className="mb-1">
										<Form.Label>Nome</Form.Label>
										<Form.Control
											// {...methods.register(`member.${index}.name`)}
											placeholder="Digite o nome do membro"
											defaultValue={member.name}
										/>
									</Form.Group>
									<Form.Group className="mb-1">
										<Form.Label>Aniversário</Form.Label>
										<Form.Control
											// {...methods.register(`member.${index}.birthday`)}
											defaultValue={member.birthday}
											type="date"
										/>
									</Form.Group>
									<Button
										variant="danger"
										className="mb-3"
										onClick={() => remove(index)}
									>
										<FontAwesomeIcon size="sm" icon={faTrash} />
									</Button>
								</div>
							))}
						<Form.Group className="mb-3">
							<Button onClick={() => append({})}>+ Membro</Button>
						</Form.Group>
						<Separator className="mb-3" />

						<div className="d-flex w-100 justify-content-end">
							<Button type="submit">Salvar</Button>
						</div>
					</Form>
				</FormProvider>
			</Card.Body>
		</Card>
	);
};

export default Profile;
