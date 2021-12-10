import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: new Date(price.time_open),
                y: [
                  price.open.toFixed(2),
                  price.high.toFixed(2),
                  price.low.toFixed(2),
                  price.close.toFixed(2),
                ],
              })),
            },
          ]}
          options={{
            chart: {
              toolbar: {
                show: false,
              },
              height: 400,
              width: 480,
              background: "transparent",
            },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
            yaxis: {
              show: false,
            },
            grid: {
              show: false,
            },
            theme: {
              mode: "dark",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
