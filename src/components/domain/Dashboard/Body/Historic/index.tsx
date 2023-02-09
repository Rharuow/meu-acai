import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";

import { Orders, mockedOrders } from "../../../../../entities/Order";
import CardHistoric from "./Card";

const Historic = () => {
	const perPage = 2;
	const [page, setPage] = useState(2);
	const [listHistoric, setListHistoric] = useState<Orders>(
		mockedOrders.filter((h, index) => index < perPage)
	);

	const fetchData = () => {
		setPage((prevState) => prevState + 1);
		setTimeout(() => {
			setListHistoric((prevState) => [
				...prevState,
				...mockedOrders.filter(
					(h, index) => index >= perPage * (page - 1) && index < perPage * page
				),
			]);
		}, 1500);
	};

	console.log("mockedOrders.length = ", mockedOrders.length);

	return (
		<div className="p-3">
			<InfiniteScroll
				dataLength={mockedOrders.length}
				next={fetchData}
				hasMore={mockedOrders.length > listHistoric.length}
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
					<CardHistoric key={historic.id} historic={historic} />
				))}
			</InfiniteScroll>
		</div>
	);
};

export default Historic;
