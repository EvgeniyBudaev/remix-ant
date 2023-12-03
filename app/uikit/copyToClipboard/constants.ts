import clsx from "clsx";
import { EColorType } from "~/uikit/colors/enums";

import type { TColor } from "./types";

export const THEMES = (args: { color: TColor }) => {
  return clsx(
    "shrink-0 cursor-pointer object-contain",
    `${EColorType.Text}-${args.color}`
  );
};

export const DATA_TEST_ID = "ui-kit-component__chip";

export const TIMER_DELAY_DEFAULT = 1000;
