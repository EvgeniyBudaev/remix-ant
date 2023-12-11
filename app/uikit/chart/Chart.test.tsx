import { describe, it, expect, vitest, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Chart } from "./Chart";
import { DATA_TEST_ID } from "./constants";
import { EChartVariants } from "./types";
import { chartMockData, bdChartMockData, tdChartMockData } from "./mockData";

const DEFAULT_PROPS = {
  banknote: "BTC",
  currencyCode: "RUB",
  currencyUnit: "",
  dataTestId: DATA_TEST_ID,
  max: 54,
  min: -54,
  theme: "light",
};

describe("Chart component", () => {
  beforeEach(() => {
    vitest.useFakeTimers({ shouldAdvanceTime: true });
  });

  it("should render the Chart variant 1", () => {
    const debounce = 1000;
    const { getByTestId } = render(
      <Chart
        {...DEFAULT_PROPS}
        data={tdChartMockData}
        listCurrenciesShow={["crypto", "fiat"]}
        variantChart={EChartVariants.Variant1}
      />
    );

    const chart = getByTestId(DATA_TEST_ID);
    vitest.advanceTimersByTime(debounce);
    expect(chart).toBeInTheDocument();
  });

  it("should render the Chart variant 2", () => {
    const debounce = 1000;
    const { getByTestId } = render(
      <Chart
        {...DEFAULT_PROPS}
        data={bdChartMockData}
        listCurrenciesShow={["crypto", "fiat"]}
        variantChart={EChartVariants.Variant2}
      />
    );

    const chart = getByTestId(DATA_TEST_ID);
    vitest.advanceTimersByTime(debounce);
    expect(chart).toBeInTheDocument();
  });

  it("should render the Chart variant 3", () => {
    const debounce = 1000;
    const { getByTestId } = render(
      <Chart
        {...DEFAULT_PROPS}
        data={chartMockData}
        listCurrenciesShow={["crypto", "fiat"]}
        variantChart={EChartVariants.Variant3}
      />
    );

    const chart = getByTestId(DATA_TEST_ID);
    vitest.advanceTimersByTime(debounce);
    expect(chart).toBeInTheDocument();
  });
});
