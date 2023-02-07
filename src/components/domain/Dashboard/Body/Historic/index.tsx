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
					bg={historic.payment_date ? "primary-dark" : "danger-dark"}
				>
					<Card.Header>
						<Card.Title className="d-flex justify-content-center m-0 flex-wrap">
							<span className="fs-6 text-white">{historic.created_at}</span>
						</Card.Title>
					</Card.Header>
					<Card.Body>
						<Row className="ps-2">
							<Col xs={7} className="p-0">
								<p className="fw-bolder text-white me-2">Tamanho:</p>
							</Col>
							<Col xs={5} className="p-0">
								<p className="fw-bolder text-truncate text-white">
									{historic.order.size.name}
								</p>
							</Col>
						</Row>
						<Row className="ps-2">
							<Col xs={7} className="p-0">
								<p className="fw-bolder text-white me-2">Cremes:</p>
							</Col>
							<Col xs={5} className="p-0">
								<ul className="fw-bolder p-0">
									{historic.order.creams.map((cream) => (
										<ol key={cream.id} className="p-0 text-white text-truncate">
											{cream.name}
										</ol>
									))}
								</ul>
							</Col>
						</Row>
						{historic.order.toppings && (
							<Row className="ps-2">
								<Col xs={7} className="p-0">
									<p className="fw-bolder text-white me-2">Complementos:</p>
								</Col>
								<Col xs={5} className="p-0">
									<ul className="fw-bolder text-white p-0">
										{historic.order.toppings.map((topping) => (
											<ol
												key={topping.id}
												className="p-0 text-white text-truncate"
											>
												{topping.name}
											</ol>
										))}
									</ul>
								</Col>
							</Row>
						)}
						{historic.order.extras && (
							<Row className="ps-2">
								<Col xs={7} className="p-0">
									<p className="fw-bolder text-white me-2">Extras:</p>
								</Col>
								<Col xs={5} className="p-0">
									<ul className="fw-bolder p-0">
										{historic.order.extras.map((extras) => (
											<ol
												key={extras.id}
												className="p-0 text-white text-truncate"
											>
												{extras.name}
											</ol>
										))}
									</ul>
								</Col>
							</Row>
						)}
						<Row className="ps-2">
							<Col xs={7} className="p-0">
								<p className="fw-bolder text-white me-2">Pagamento:</p>
							</Col>
							<Col xs={5} className="p-0">
								<p className="fw-bolder text-truncate text-white">
									{historic.payment_method
										? historic.payment_method
										: "Em Aberto"}
								</p>
							</Col>
						</Row>
					</Card.Body>
					<Card.Footer>
						<Row className="d-flex">
							<Col xs={7} className="p-0">
								<span className="text-white fw-bolder me-3">Valor:</span>
							</Col>
							<Col xs={5} className="p-0 fw-bolder">
								<span className="text-white">
									R${" "}
									{historic.order.value.toLocaleString("pt-BR", {
										currency: "BRL",
										minimumFractionDigits: 2,
									})}
								</span>
							</Col>
						</Row>
					</Card.Footer>
				</Card>
			))}
		</div>
	);
};

export default Historic;
