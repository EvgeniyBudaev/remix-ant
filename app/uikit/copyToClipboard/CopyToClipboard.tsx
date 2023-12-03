import * as React from "react";
import clsx from "clsx";

import { ETextColor } from "~/uikit/colors/enums";
import { TIMER_DELAY_DEFAULT, THEMES, DATA_TEST_ID } from "./constants";
import { useCopyToClipboard } from "./hooks";
import type { TCopyToClipboardProps } from "./types";

const CopyToClipboardComponent: React.FC<TCopyToClipboardProps> = ({
  classes,
  className,
  color = ETextColor.Dark,
  timerDelay = TIMER_DELAY_DEFAULT,
  type = "icon",
  value,
  dataTestId = DATA_TEST_ID,
}) => {
  const [hasCopied, setHasCopied] = React.useState(false);
  const [hoverCopyIcon, setHoverCopyIcon] = React.useState(false);
  const [, copy] = useCopyToClipboard();
  const currentThemeCopyIcon = THEMES({ color });

  const handleCopyToClipboard = (value: string) => {
    copy(value);
    setHasCopied(true);
  };

  React.useEffect(() => {
    const copyTimer = setTimeout(() => {
      setHasCopied(false);
    }, timerDelay);
    return () => clearTimeout(copyTimer);
  }, [hasCopied, timerDelay]);

  const handleHoverCopyIcon =
    (hover: boolean | ((prevState: boolean) => boolean)) => () => {
      setHoverCopyIcon(hover);
    };

  const renderContent = (value: string) => {
    if (type === "button") {
      return (
        <button
          className={clsx(
            "bg-grey hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg",
            className
          )}
          onClick={() => handleCopyToClipboard(value)}
          onMouseOver={handleHoverCopyIcon(true)}
          onMouseOut={handleHoverCopyIcon(false)}
          data-testid={dataTestId}
        >
          {hasCopied ? (
            <div
              className="text-accent3 shrink-0 object-contain"
              data-testId={`${DATA_TEST_ID}__icon-success`}
            >
              SuccessIcon
            </div>
          ) : (
            <div
              className={clsx(
                currentThemeCopyIcon,
                { "hover:text-primary": hoverCopyIcon },
                classes?.copyIcon
              )}
              onClick={() => handleCopyToClipboard(value)}
              data-testId={`${DATA_TEST_ID}__icon-copy`}
            >
              CopyIcon
            </div>
          )}
        </button>
      );
    } else {
      return hasCopied ? (
        <div className={className} data-testid={dataTestId}>
          <div
            className={"text-accent3 shrink-0 object-contain"}
            data-testId={`${DATA_TEST_ID}__icon-success`}
          >
            SuccessIcon
          </div>
        </div>
      ) : (
        <div
          className={className}
          onMouseOver={handleHoverCopyIcon(true)}
          onMouseOut={handleHoverCopyIcon(false)}
          data-testid={dataTestId}
        >
          <div
            className={clsx(
              currentThemeCopyIcon,
              { "hover:text-primary": hoverCopyIcon },
              classes?.copyIcon
            )}
            onClick={() => handleCopyToClipboard(value)}
            data-testId={`${DATA_TEST_ID}__icon-copy`}
          >
            CopyIcon
          </div>
        </div>
      );
    }
  };

  return renderContent(value);
};

export const CopyToClipboard = React.memo(
  CopyToClipboardComponent
) as typeof CopyToClipboardComponent;
