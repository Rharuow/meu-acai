import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Card, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
import { faPix } from "@fortawesome/free-brands-svg-icons";

import {
	mockedHistory,
	Historic as HistoryType,
} from "../../../../../entities/Historic";

const Historic = () => {
	const perPage = 2;
	const [page, setPage] = useState(2);
	const [listHistoric, setListHistoric] = useState<HistoryType>(
		mockedHistory.filter((h, index) => index < perPage)
	);

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

	const fetchData = () => {
		setPage((prevState) => prevState + 1);
		setTimeout(() => {
			console.log("page = ", page);
			setListHistoric((prevState) => [
				...prevState,
				...mockedHistory.filter(
					(h, index) => index >= perPage * (page - 1) && index < perPage * page
				),
			]);
		}, 1500);
	};

	// console.log("page = ", page);
	console.log("mockedHistory.length = ", mockedHistory.length);
	console.log("listHistoric.length = ", listHistoric.length);
	console.log("listHistoric = ", listHistoric);

	return (
		<div className="p-3">
			<InfiniteScroll
				dataLength={mockedHistory.length} //This is important field to render the next data
				next={fetchData}
				hasMore={mockedHistory.length > listHistoric.length}
				loader={
					<div className="d-flex justify-content-center">
						<ReactLoading type="spinningBubbles" color="#46295a" />
					</div>
				}
				pullDownToRefreshThreshold={50}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>Todas as compras foram carregadas!</b>
					</p>
				}
			>
				{listHistoric.map((historic) => (
					<Card
						key={historic.id}
						className="mb-3"
						bg={historic.payment_date ? "primary-dark" : "danger-dark"}
					>
						<Card.Header>
							<Card.Title className="d-flex justify-content-center m-0 flex-wrap">
								<span className="fs-6 text-white">
									{historic.created_at}({historic.id})
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
									<p className="fw-bolder text-white">
										{historic.payment_method
											? getIcon(historic.payment_method)
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
			</InfiniteScroll>
		</div>
	);
};

export default Historic;
