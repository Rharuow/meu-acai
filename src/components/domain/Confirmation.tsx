import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Lottie from "react-lottie";
import congratsAnimation from "@/src/components/congrateAnitmation.json";
import sorryAnimation from "@/src/components/sorryAnimation.json";
import { getUserByCode, updateUser } from "@/src/service/docs/users";

const defaultOptions = {
	loop: true,
	autoplay: true,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

export default function Confirmation() {
	const [loading, setLoading] = useState(true);
	const [animationData, setAnimationData] = useState<any>();
	const [refused, setRefused] = useState(false);

	const router = useRouter();
	const { code } = router.query as { code: string };

	const getConfirmationCode = async () => {
		const user = await getUserByCode(code);

		if (!user) {
			setAnimationData(sorryAnimation);
			setRefused(true);
		} else {
			setAnimationData(congratsAnimation);
			user.id && updateUser(user.id, { isActive: true });
			setRefused(false);
		}

		setLoading(false);
	};

	useEffect(() => {
		getConfirmationCode();
		// eslint-disable-next-line react-hooks/exhaustive-deps

		setTimeout(() => {
			router.push("/");
		}, 3000);
	}, []);

	return (
		<div className="d-flex justify-content-center flex-wrap align-items-center h-100vh bg-primary">
			{loading ? (
				<ReactLoading type="spinningBubbles" color="#ffccff" />
			) : (
				<div>
					<Lottie
						options={{ ...defaultOptions, animationData }}
						width={180}
						height={180}
					/>
					<p className="text-center text-secondary mt-3 fw-bold">
						{refused
							? "Desculpe, há um problema com seu link!"
							: "Parabéns, sua conta está ativa!"}
					</p>
				</div>
			)}
		</div>
	);
}
