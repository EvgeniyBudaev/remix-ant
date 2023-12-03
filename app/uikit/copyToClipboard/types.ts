import type { ETextColor } from "~/uikit/colors/enums";

type TCopyToClipboardElement = {
  copyIcon?: string;
};

type TCopyToClipboardClasses = Partial<TCopyToClipboardElement>;

export type TColor = `${ETextColor}` | "inherit";

export type TCopyToClipboardProps = {
  classes?: TCopyToClipboardClasses;
  className?: string;
  color?: TColor;
  dataTestId?: string;
  timerDelay?: number;
  type?: "button" | "icon";
  value: string;
};
