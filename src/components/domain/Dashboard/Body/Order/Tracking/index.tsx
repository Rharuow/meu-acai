import React from "react";
import { Card } from "react-bootstrap";
import { useUserContext } from "../../../../../../context/UserContext";
import { mockedOrders, OrderStatus } from "../../../../../../entities/Order";
import { glossary } from "../../../../../../utils/glossary";
import Step from "../../../../../Step";

const Tracking = () => {
	const user = useUserContext();

	const orders = mockedOrders.filter(
		(order) =>
			(order.status === OrderStatus.making ||
				order.status === OrderStatus.waiting ||
				order.status === OrderStatus.delivering) &&
			order.user_id === user.id
	);

	const ordersInWating = mockedOrders
		.filter((order) => order.status === OrderStatus.waiting)
		.map((order, index) => ({ id: order.id, position: index + 1 }));

	const stepIsDone = (status: OrderStatus, currentStatus: OrderStatus) => {
		if (
			status === OrderStatus.delivering &&
			currentStatus === OrderStatus.making
		)
			return true;
		return false;
	};

	return (
		<div className="d-flex p-2 flex-wrap">
			{orders.map((order) => (
				<Card key={order.id} className="w-100 mb-2" bg="primary-dark">
					<Card.Header className="text-center text-white fw-bold">
						Pedido {order.id}
					</Card.Header>
					<Card.Body>
						<p className="fw-bold text-white">
							Tamanho: {order.product.size.name}
						</p>
						<p className="fw-bold text-white">
							Valor: R${" "}
							{order.product.value.toLocaleString("pt-BR", {
								currency: "BRL",
								minimumFractionDigits: 2,
							})}
						</p>
						<div className="d-flex justify-content-between w-100">
							{order.status === OrderStatus.waiting &&
								[OrderStatus.waiting].map((status) => (
									<Step
										key={status}
										text={`${glossary.status.pt[status]} (${
											ordersInWating.find((or) => or.id === order.id)?.position
										})`}
										className="w-100 text-center"
										isCurrent={order.status === status}
									/>
								))}
						</div>
						<div className="d-flex justify-content-between w-100">
							{[
								OrderStatus.making,
								OrderStatus.delivering,
								OrderStatus.done,
							].map((status, index) => (
								<Step
									key={status}
									text={glossary.status.pt[status]}
									className="w-100 text-center"
									isCurrent={order.status === status}
									isDone={stepIsDone(order.status, status)}
								/>
							))}
						</div>
					</Card.Body>
				</Card>
			))}
		</div>
	);
};

export default Tracking;
