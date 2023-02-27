import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Confirmation from "../components/domain/Confirmation";

function ConfirmationPage() {
	const router = useRouter();

	const { code } = router.query;

	if (!code) return <></>;
	return <Confirmation />;
}

export default ConfirmationPage;
