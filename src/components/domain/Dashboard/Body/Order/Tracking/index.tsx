import React from "react";
import { Card } from "react-bootstrap";

import { useSessionContext } from "@/src/rharuow-admin/context/Session";
import { Order, OrderStatus } from "@/src/entities/Order";
import { glossary } from "@/src//utils/glossary";
import Step from "@/src/components/Step";

const Tracking = () => {
	const { user } = useSessionContext();

	const orders: Array<Order> = [];

	const ordersInWating: Array<any> = [];

	const stepIsDone = (status: OrderStatus, currentStatus: OrderStatus) => {
		if (status === "delivering" && currentStatus === "making") return true;
		return false;
	};

	return (
		<div className="d-flex p-2 flex-wrap">
			{orders &&
				orders.map((order) => (
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
								{order.status === "waiting" &&
									["waiting"].map((status) => (
										<Step
											key={status}
											text={`${glossary.status.pt[status as OrderStatus]} (${
												ordersInWating.find((or) => or.id === order.id)
													?.position
											})`}
											className="w-100 text-center"
											isCurrent={order.status === status}
										/>
									))}
							</div>
							<div className="d-flex justify-content-between w-100">
								{["making", "delivering", "done"].map((status, index) => (
									<Step
										key={status}
										text={glossary.status.pt[status as OrderStatus]}
										className="w-100 text-center"
										isCurrent={order.status === status}
										isDone={stepIsDone(order.status, status as OrderStatus)}
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
