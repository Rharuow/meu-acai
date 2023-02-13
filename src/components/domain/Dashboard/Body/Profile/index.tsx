/* eslint-disable react-hooks/exhaustive-deps */
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";

import { useUserContext } from "../../../../../context/UserContext";
import Separator from "../../../../Separator";

const Profile = () => {
	const { name, birthday, members } = useUserContext();

	const methods = useForm();

	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: "members",
	});

	useEffect(() => {
		members?.forEach((member) => {
			append({ name: member.name, birthday: member.birthday });
		});
	}, []);

	console.log(fields);

	return (
		<Card bg="secondary">
			<Card.Header>
				<Card.Title className="mb-0">Perfil</Card.Title>
			</Card.Header>
			<Card.Body>
				<FormProvider {...methods}>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Nome</Form.Label>
							<Form.Control defaultValue={name} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Aniversário</Form.Label>
							<Form.Control defaultValue={birthday} type="date" />
						</Form.Group>
						<Separator className="mb-3" />
						{fields &&
							members &&
							fields.map((member: any, index) => (
								<div key={member.id}>
									<Form.Group className="mb-1">
										<Form.Label>Nome</Form.Label>
										<Form.Control
											{...methods.register(`member.${index}.name`)}
											placeholder="Digite o nome do membro"
											defaultValue={member.name}
										/>
									</Form.Group>
									<Form.Group className="mb-1">
										<Form.Label>Aniversário</Form.Label>
										<Form.Control
											{...methods.register(`member.${index}.birthday`)}
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
									<Separator dashed className="mb-3" />
								</div>
							))}
						<Form.Group className="mb-3">
							<Button onClick={() => append({})}>Adicionar Membro</Button>
						</Form.Group>
					</Form>
				</FormProvider>
			</Card.Body>
		</Card>
	);
};

export default Profile;
