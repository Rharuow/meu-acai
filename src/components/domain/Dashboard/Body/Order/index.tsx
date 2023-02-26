import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import { useSessionContext } from "@/src/rharuow-admin/context/Session";

import { Orders, OrderStatus } from "../../../../../entities/Order";
import ListOrder from "./List";

const Historic = () => {
	const perPage = 2;
	const [page, setPage] = useState(2);
	const [orders, setOrders] = useState<Orders>();

	const { user } = useSessionContext();

	const fetchData = () => {
		setPage((prevState) => prevState + 1);
	};

	return (
		<div className="p-3">
			{orders && (
				<InfiniteScroll
					dataLength={orders.length}
					next={fetchData}
					hasMore={true}
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
			)}
		</div>
	);
};

export default Historic;
