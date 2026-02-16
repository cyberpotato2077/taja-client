import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState } from "react";
import { useFavoriteStation } from "./use-favorite-station";

interface FavoriteButtonProps {
	stationId: number;
}

export function FavoriteButton({ stationId }: FavoriteButtonProps) {
	const { isLoggedIn } = useAuth();

	if (isLoggedIn) {
		return <LoggedInFavoriteButton stationId={stationId} />;
	}

	return <LoggedOutFavoriteButton />;
}

function LoggedInFavoriteButton({ stationId }: { stationId: number }) {
	const { isFavorite, toggleFavorite, isLoading } =
		useFavoriteStation(stationId);

	return (
		<button
			type="button"
			onClick={toggleFavorite}
			className="p-2 rounded-full hover:bg-gray-100 transition-colors"
			disabled={isLoading}
		>
			<Star
				className={`w-5 h-5 ${
					isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
				} transition-colors`}
			/>
		</button>
	);
}

function LoggedOutFavoriteButton() {
	const [showLoginDialog, setShowLoginDialog] = useState(false);
	const navigate = useNavigate();

	const handleGoToMyPage = () => {
		setShowLoginDialog(false);
		navigate({ to: "/my" });
	};

	return (
		<>
			<button
				type="button"
				onClick={() => setShowLoginDialog(true)}
				className="p-2 rounded-full hover:bg-gray-100 transition-colors"
			>
				<Star className="w-5 h-5 text-gray-400 transition-colors" />
			</button>

			<Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>회원 전용 기능</DialogTitle>
						<DialogDescription>
							즐겨찾기는 회원만 사용할 수 있는 기능입니다.
							<br />
							로그인 또는 회원가입을 진행하시겠습니까?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowLoginDialog(false)}
						>
							취소
						</Button>
						<Button onClick={handleGoToMyPage}>로그인/회원가입</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
