import React from "react";
import { Card } from "react-bootstrap";
import { mockedHistory } from "../../../../../entities/Historic";

const Historic = () => {
	return (
		<div className="p-3">
			{mockedHistory.map((historic) => (
				<Card
					key={historic.id}
					className="mb-3"
					bg={historic.payment_date ? "success" : "danger"}
				>
					<Card.Header>
						<Card.Title className="d-flex justify-content-center">
							<span className="fs-6 text-white">{historic.created_at}</span>
						</Card.Title>
					</Card.Header>
					<Card.Body>
						<span className="fw-bolder text-white me-2">Tamanho:</span>
						<span className="fw-bolder text-white">
							{historic.order.size.name}
						</span>
						<span className="fw-bolder text-white me-2">Cremes:</span>
						<span className="fw-bolder text-white">
							{historic.order.creams.map((cream) => (
								<span key={cream.id}>{cream.name}</span>
							))}
						</span>
					</Card.Body>
				</Card>
			))}
		</div>
	);
};

export default Historic;
