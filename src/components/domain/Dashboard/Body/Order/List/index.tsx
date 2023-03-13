import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
import { faPix } from "@fortawesome/free-brands-svg-icons";

import { Orders } from "../../../../../../entities/Order";

const ListOrder: React.FC<{ orders: Orders | undefined }> = ({ orders }) => {
	const getIcon = (text: string) => {
		if (text === "Espécie")
			return (
				<span className="text-white fw-bolder text-truncate">
					<FontAwesomeIcon icon={faMoneyBill1} inverse /> Espécie
				</span>
			);
		if (text === "Cartão")
			return (
				<span className="text-white fw-bolder text-truncate">
					<FontAwesomeIcon icon={faCreditCard} /> Cartão
				</span>
			);
		return (
			<span className="text-white fw-bolder text-truncate">
				<FontAwesomeIcon icon={faPix} /> Pix
			</span>
		);
	};
	return (
		<>
			{orders &&
				orders.map((order) => (
					<Card
						key={order.id}
						className="mb-3"
						bg={
							order.payment_date
								? "primary-dark"
								: order.status === "making"
								? "warning-dark"
								: "danger-dark"
						}
					>
						<Card.Header>
							<Card.Title className="d-flex justify-content-center m-0 flex-wrap">
								<span className="fs-6 text-white">
									{order.created_at} ({order.id})
								</span>
							</Card.Title>
						</Card.Header>
						<Card.Body>
							<Row className="ps-2">
								<Col xs={7} className="p-0">
									<p className="fw-bolder text-white me-2">Tamanho:</p>
								</Col>
								<Col xs={5} className="p-0">
									<p className="fw-bolder text-truncate text-white">
										{order.product.size.name}
									</p>
								</Col>
							</Row>
							<Row className="ps-2">
								<Col xs={7} className="p-0">
									<p className="fw-bolder text-white me-2">Cremes:</p>
								</Col>
								<Col xs={5} className="p-0">
									<ul className="fw-bolder p-0">
										{order.product.creams.map((cream) => (
											<ol
												key={cream.id}
												className="p-0 text-white text-truncate"
											>
												{cream.name}
											</ol>
										))}
									</ul>
								</Col>
							</Row>
							{order.product.toppings && (
								<Row className="ps-2">
									<Col xs={7} className="p-0">
										<p className="fw-bolder text-white me-2">Complementos:</p>
									</Col>
									<Col xs={5} className="p-0">
										<ul className="fw-bolder text-white p-0">
											{order.product.toppings.map((topping) => (
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
							{order.product.extras && (
								<Row className="ps-2">
									<Col xs={7} className="p-0">
										<p className="fw-bolder text-white me-2">Extras:</p>
									</Col>
									<Col xs={5} className="p-0">
										<ul className="fw-bolder p-0">
											{order.product.extras.map((extras) => (
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
									<p className="fw-bolder text-white">
										{order.payment_method
											? getIcon(order.payment_method)
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
										{order.product.value.toLocaleString("pt-BR", {
											currency: "BRL",
											minimumFractionDigits: 2,
										})}
									</span>
								</Col>
							</Row>
						</Card.Footer>
					</Card>
				))}
		</>
	);
};

export default ListOrder;
