import type { StationDetailResponse } from "@/remotes/get-station";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export function StationStatistics({
	station,
}: {
	station: StationDetailResponse;
}) {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}.${month}.${day} 기준`;
	};

	const dayMap: Record<string, string> = {
		월: "월",
		화: "화",
		수: "수",
		목: "목",
		금: "금",
		토: "토",
		일: "일",
	};

	return (
		<div className="p-4 space-y-6">
			{/* 헤더 */}
			<div className="border-b pb-4">
				<h1 className="text-xl font-bold text-gray-900 mb-2">
					대여소별 이용 통계
				</h1>
				<h2 className="text-lg font-semibold text-gray-800">
					{station.name}
				</h2>
			</div>

			{/* 시간대별 대여 가능량 */}
			<div className="bg-white rounded-lg border border-gray-200 p-4">
				<div className="mb-4">
					<h3 className="text-base font-semibold text-gray-900 mb-1">
						시간대별 대여 가능량
					</h3>
					{station.hourlyAvailable && station.hourlyAvailable.length > 0 && (
						<p className="text-xs text-gray-500">
							{formatDate(station.hourlyAvailable[0].baseDate)}
						</p>
					)}
				</div>
				<ResponsiveContainer width="100%" height={250}>
					<BarChart
						data={station.hourlyAvailable}
						margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
					>
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
						<Bar
							dataKey="count"
							fill="#9ca3af"
							radius={[4, 4, 0, 0]}
							barSize={20}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* 요일별 대여 가능량 */}
			<div className="bg-white rounded-lg border border-gray-200 p-4">
				<div className="mb-4">
					<h3 className="text-base font-semibold text-gray-900 mb-1">
						요일별 대여 가능량
					</h3>
					{station.dailyAvailable && station.dailyAvailable.length > 0 && (
						<p className="text-xs text-gray-500">
							{formatDate(station.dailyAvailable[0].baseDate)}
						</p>
					)}
				</div>
				<ResponsiveContainer width="100%" height={250}>
					<BarChart
						data={station.dailyAvailable}
						margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
						<XAxis
							dataKey="day"
							tick={{ fontSize: 12, fill: "#666" }}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => dayMap[value] || value}
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
							labelFormatter={(day) => `${dayMap[day] || day}요일`}
						/>
						<Bar
							dataKey="count"
							fill="#9ca3af"
							radius={[4, 4, 0, 0]}
							barSize={40}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* 기온별 대여 가능량 */}
			<div className="bg-white rounded-lg border border-gray-200 p-4">
				<div className="mb-4">
					<h3 className="text-base font-semibold text-gray-900 mb-1">
						기온별 대여 가능량
					</h3>
					{station.temperatureAvailable &&
						station.temperatureAvailable.length > 0 && (
							<p className="text-xs text-gray-500">
								{formatDate(station.temperatureAvailable[0].baseDate)}
							</p>
						)}
				</div>
				<ResponsiveContainer width="100%" height={250}>
					<LineChart
						data={station.temperatureAvailable}
						margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
						<XAxis
							dataKey="temperature"
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
							labelFormatter={(temp) => `${temp}°C`}
						/>
						<Line
							type="monotone"
							dataKey="count"
							stroke="#9ca3af"
							strokeWidth={2}
							dot={{ fill: "#9ca3af", r: 4 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
