import { ChartConfig } from "@/types/indes";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart:React.FC<ChartConfig> = ({
	data
}) => {
	const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

	return ( 
			<section id="chart">
				<Bar data={data} options={options}/>
			</section>
		);
}
 
export default Chart;