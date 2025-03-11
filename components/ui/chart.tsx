"use client";
import { BarChartProps } from "@/types/indes";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define a type for the chart data items
interface ChartDataItem {
  tahun: string | number;
  [key: string]: string | number | undefined; // This allows any string as a property name
}

const Chart: React.FC<BarChartProps> = ({ data, activeKeyIndex = 0 }) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    // Transform the data for Recharts
    const transformedData: ChartDataItem[] = data.map((item) => {
      const newItem: ChartDataItem = { tahun: item.tahun };

      // Process kolom1
      if (item.kolom1 !== undefined) {
        const kolom1Name = activeKeyIndex === 0 ? "Revenue" : "SPBU";
        newItem[kolom1Name] = item.kolom1;
      }

      // Process kolom2
      if (item.kolom2 !== undefined) {
        newItem["Bright"] = item.kolom2;
      }

      return newItem;
    });

    setChartData(transformedData);
  }, [data, activeKeyIndex]);

  // Check if data exists and is not empty
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Get series names (excluding tahun)
  const getSeriesNames = () => {
    if (chartData.length === 0) return [];
    return Object.keys(chartData[0]).filter((key) => key !== "tahun");
  };

  // Get color for a series
  const getColor = (seriesName: string) => {
    if (seriesName === "Revenue" || seriesName === "SPBU") {
      return "#63AE1D";
    }
    if (seriesName === "Bright") {
      return "#E1222B";
    }
    return "#005CAB";
  };

  // Calculate width
  const totalBars =
    data.length *
    Object.keys(data[0]).filter((key) => key !== "tahun" && key !== "_id")
      .length;
  const chartWidth = Math.max(totalBars * 70, 400);

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: 0 }}>{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`tooltip-${index}`}
              style={{
                color: entry.color,
                margin: "5px 0 0 0",
              }}
            >
              {`${entry.name}: ${entry.value} ${
                activeKeyIndex > 0 ? "unit" : "Rp T"
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section
      id="chart"
      style={{ minWidth: `${chartWidth}px`, height: "350px" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tahun" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {getSeriesNames().map((seriesName) => (
            <Bar
              key={seriesName}
              dataKey={seriesName}
              fill={getColor(seriesName)}
              radius={[10, 10, 0, 0]}
              barSize={50}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Chart;
