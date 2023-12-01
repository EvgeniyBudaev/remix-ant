import { Chart, EChartVariants } from "~/uikit/chart";
import { bdChartMockData } from "~/uikit/chart/mockData";
import { dataClouds, WordCloud } from "~/uikit/wordCloud";

export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>
        <WordCloud data={dataClouds} />
      </div>
      <h1>Chart</h1>
      <Chart
        banknote={"BTC"}
        currencyCode={"RUB"}
        currencyUnit=""
        data={bdChartMockData}
        listCurrenciesShow={["crypto", "fiat"]}
        max={54}
        min={-54}
        theme="light"
        variantChart={EChartVariants.Variant2}
      />
    </div>
  );
}
