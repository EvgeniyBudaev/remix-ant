import { describe, it, expect, vitest, beforeEach } from "vitest";
import canvas from "vitest-canvas-mock";
import { render } from "@testing-library/react";
import { Chart } from "./Chart";
import { DATA_TEST_ID } from "./constants";
import { EChartVariants } from "./types";
import { bdChartMockData, tdChartMockData } from "./mockData";

const DEFAULT_PROPS = {
  banknote: "BTC",
  currencyCode: "RUB",
  currencyUnit: "",
  dataTestId: DATA_TEST_ID,
  theme: "light",
};

describe("Chart component", () => {
  beforeEach(() => {
    vitest.useFakeTimers({ shouldAdvanceTime: true });
  });

  it("should render the Chart", () => {
    const debounce = 5000;
    const { getByTestId } = render(
      //   <Chart
      //   {...DEFAULT_PROPS}
      //   data={tdChartMockData}
      //   listCurrenciesShow={['crypto', 'fiat']}
      //   max={54}
      //   min={-54}
      //   variantChart={EChartVariants.Variant1}
      // />,
      <Chart
        {...DEFAULT_PROPS}
        data={bdChartMockData}
        listCurrenciesShow={["crypto", "fiat"]}
        max={54}
        min={-54}
        variantChart={EChartVariants.Variant2}
      />
    );

    const chart = getByTestId(DATA_TEST_ID);
    vitest.advanceTimersByTime(debounce);
    expect(chart).toBeInTheDocument();
  });
});
