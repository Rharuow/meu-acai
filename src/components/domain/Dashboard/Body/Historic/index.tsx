import React from "react";
import { Col } from "react-bootstrap";
import { Card, Row } from "react-bootstrap";
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
						<Card.Title className="d-flex justify-content-center flex-wrap">
							<span className="fs-6 text-white">{historic.created_at}</span>
						</Card.Title>
					</Card.Header>
					<Card.Body>
						<Row className="ps-2">
							<Col xs={8} className="p-0">
								<p className="fw-bolder text-white me-2">Tamanho:</p>
							</Col>
							<Col xs={4} className="p-0">
								<p className="fw-bolder">{historic.order.size.name}</p>
							</Col>
						</Row>
						<Row className="ps-2">
							<Col xs={8} className="p-0">
								<p className="fw-bolder text-white me-2">Cremes:</p>
							</Col>
							<Col xs={4} className="p-0">
								<ul className="fw-bolder text-white p-0">
									{historic.order.creams.map((cream) => (
										<ol key={cream.id} className="p-0">
											{cream.name}
										</ol>
									))}
								</ul>
							</Col>
						</Row>
						{historic.order.toppings && (
							<Row className="ps-2">
								<Col xs={8} className="p-0">
									<p className="fw-bolder text-white me-2">Complementos:</p>
								</Col>
								<Col xs={4} className="p-0">
									<ul className="fw-bolder text-white p-0">
										{historic.order.toppings.map((topping) => (
											<ol key={topping.id} className="p-0">
												{topping.name}
											</ol>
										))}
									</ul>
								</Col>
							</Row>
						)}
						{historic.order.extras && (
							<Row className="ps-2">
								<Col xs={8} className="p-0">
									<p className="fw-bolder text-white me-2">Extras:</p>
								</Col>
								<Col xs={4} className="p-0">
									<ul className="fw-bolder text-white p-0">
										{historic.order.extras.map((extras) => (
											<ol key={extras.id} className="p-0">
												{extras.name}
											</ol>
										))}
									</ul>
								</Col>
							</Row>
						)}
					</Card.Body>
				</Card>
			))}
		</div>
	);
};

export default Historic;
