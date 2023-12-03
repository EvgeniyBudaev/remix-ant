import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import { CopyToClipboard } from "./CopyToClipboard";
import { DATA_TEST_ID, TIMER_DELAY_DEFAULT } from "./constants";

const VALUE = "COPY TO CLIPBOARD VALUE";

describe("CopyToClipboard component", () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  // Корректное отображение Data Test Id
  it("renders correctly with data test id", () => {
    const { getByTestId } = render(<CopyToClipboard value={VALUE} />);
    const copyToClipboard = getByTestId(DATA_TEST_ID);

    expect(copyToClipboard).toBeInTheDocument();
  });

  // Проверка начального статуса
  it("check default status", async () => {
    render(<CopyToClipboard type="button" value={VALUE} />);
    const copyToClipboardSuccess = screen.getByTestId(
      `${DATA_TEST_ID}__icon-copy`
    );
    expect(copyToClipboardSuccess).toBeInTheDocument();
  });

  // Проверка скопированного значения
  it("check copy to clipboard value", async () => {
    const { getByTestId } = render(
      <CopyToClipboard type="button" value={VALUE} />
    );
    const user = userEvent.setup();
    const copyToClipboard = getByTestId(DATA_TEST_ID);
    await act(async () => user.click(copyToClipboard));
    const text = await act(async () => navigator.clipboard.readText());

    expect(text).toBe(VALUE);
  });

  // Проверка успешного статуса
  it("check success status", async () => {
    const { getByTestId } = render(
      <CopyToClipboard type="button" value={VALUE} />
    );
    const user = userEvent.setup();
    const copyToClipboard = getByTestId(DATA_TEST_ID);
    await act(async () => user.click(copyToClipboard));
    const copyToClipboardSuccess = screen.getByTestId(
      `${DATA_TEST_ID}__icon-success`
    );

    expect(copyToClipboardSuccess).toBeInTheDocument();
  });

  // Проверка возврата в начальный статус
  it("check return to default status", async () => {
    const { getByTestId } = render(
      <CopyToClipboard type="button" value={VALUE} />
    );
    const user = userEvent.setup();
    const copyToClipboard = getByTestId(DATA_TEST_ID);
    await act(async () => {
      await user.click(copyToClipboard);
      vi.advanceTimersByTime(TIMER_DELAY_DEFAULT);
    });

    const copyToClipboardSuccess = screen.getByTestId(
      `${DATA_TEST_ID}__icon-copy`
    );
    expect(copyToClipboardSuccess).toBeInTheDocument();
  });
});
