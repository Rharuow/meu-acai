import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";

import { Orders, mockedOrders } from "../../../../../entities/Order";
import ListOrder from "./List";

const Historic = () => {
	const perPage = 2;
	const [page, setPage] = useState(2);
	const [orders, setOrders] = useState<Orders>(
		mockedOrders.filter((h, index) => index < perPage)
	);

	const fetchData = () => {
		setPage((prevState) => prevState + 1);
		console.log("FETCH");
		setTimeout(() => {
			setOrders((prevState) => [
				...prevState,
				...mockedOrders.filter(
					(h, index) => index >= perPage * (page - 1) && index < perPage * page
				),
			]);
		}, 1500);
	};

	console.log("mockedOrders = ", mockedOrders);
	console.log("orders = ", orders);

	return (
		<div className="p-3">
			<InfiniteScroll
				dataLength={orders.length}
				next={fetchData}
				hasMore={mockedOrders.length > orders.length}
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
				<ListOrder orders={orders} />
			</InfiniteScroll>
		</div>
	);
};

export default Historic;
