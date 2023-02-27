import { useRouter } from "next/router";
import React from "react";
import Confirmation from "../components/domain/Confirmation";

function ConfirmationPage() {
	const router = useRouter();

	console.log("router = ", router);

	return <Confirmation />;
}

export default ConfirmationPage;
