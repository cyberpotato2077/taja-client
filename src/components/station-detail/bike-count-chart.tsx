import type { TodayAvailableBikeResponse } from "@/remotes/get-station";
import { HelpCircle } from "lucide-react";
import {
	Area,
	Bar,
	CartesianGrid,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface BikeCountChartProps {
	data: TodayAvailableBikeResponse;
}

export function BikeCountChart({ data }: BikeCountChartProps) {
	const formatTimestamp = (timestamp: string) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${year}.${month}.${day} ${hours}:${minutes} 기준`;
	};

	// 데이터 합치기
	const chartData = Array.from({ length: 24 }, (_, hour) => {
		const observed = data.observedBikeCountByHour?.find(
			(item) => item.hour === hour,
		);
		const predicted = data.predictedBikeCountByHour?.find(
			(item) => item.hour === hour,
		);

		return {
			hour,
			observed: observed?.bikeCount ?? null,
			predicted: predicted?.bikeCount ?? null,
		};
	});

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-4">
			{/* 헤더 */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<h3 className="text-base font-semibold text-gray-900">
						오늘의 남은 자전거
					</h3>
					<button
						type="button"
						className="text-gray-400 hover:text-gray-600"
						aria-label="도움말"
					>
						<HelpCircle className="w-4 h-4" />
					</button>
				</div>
				<p className="text-xs text-gray-500">
					{data.timeStamp ? formatTimestamp(data.timeStamp) : ""}
				</p>
			</div>

			{/* 차트 */}
			<ResponsiveContainer width="100%" height={200}>
				<ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
					<XAxis
						dataKey="hour"
						tick={{ fontSize: 12, fill: "#666" }}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						tick={{ fontSize: 12, fill: "#666" }}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "white",
							border: "1px solid #e5e7eb",
							borderRadius: "6px",
							fontSize: "12px",
						}}
						labelFormatter={(hour) => `${hour}시`}
					/>

					{/* 예측 데이터 영역 (분홍색 배경) */}
					<Area
						type="monotone"
						dataKey="predicted"
						fill="#fce7f3"
						stroke="transparent"
						fillOpacity={0.4}
					/>

					{/* 실제 관측 데이터 (파란 막대) */}
					<Bar
						dataKey="observed"
						fill="#60a5fa"
						radius={[4, 4, 0, 0]}
						barSize={12}
					/>

					{/* 예측 데이터 (초록/회색 선) */}
					<Line
						type="monotone"
						dataKey="predicted"
						stroke="#86efac"
						strokeWidth={2}
						dot={false}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}
