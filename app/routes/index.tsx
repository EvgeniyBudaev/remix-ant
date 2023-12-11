import { Chart, EChartVariants } from "~/uikit/chart";
import {
  bdChartMockData,
  chartMockData,
  tdChartMockData,
} from "~/uikit/chart/mockData";
import { dataClouds, WordCloud } from "~/uikit/wordCloud";

export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>
        <WordCloud data={dataClouds} />
      </div>
      <h1>Chart variant 1</h1>
      <Chart
        banknote={"BTC"}
        currencyCode={"RUB"}
        currencyUnit=""
        data={tdChartMockData}
        listCurrenciesShow={["crypto", "fiat"]}
        max={54}
        min={-54}
        theme="light"
        variantChart={EChartVariants.Variant1}
      />
      <div></div>
      <h1>Chart variant 2</h1>
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
      <div></div>
      <h1>Chart variant 3</h1>
      <Chart
        banknote={"BTC"}
        currencyCode={"RUB"}
        currencyUnit=""
        data={chartMockData}
        listCurrenciesShow={["crypto", "fiat"]}
        max={54}
        min={-54}
        theme="light"
        variantChart={EChartVariants.Variant3}
      />
    </div>
  );
}
