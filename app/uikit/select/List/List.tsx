import isFunction from 'lodash/isFunction';
import throttle from 'lodash/throttle';
import * as React from 'react';
import clsx from 'clsx';
import { HIDE_LIST_DELAY, LISTS, STYLES, DATA_TEST_ID } from '../constants';
import type { TSelectOption } from '../types';
import type { TListProps } from './types';
import {useIntervalId} from "~/uikit/select/hooks";

const ListComponent: React.FC<TListProps> = ({
                                                 classes,
                                                 dataTestId,
                                                 dropdownPosition,
                                                 fullOption,
                                                 hasFilter,
                                                 inputValue,
                                                 isDisabledItemClick,
                                                 isOpen,
                                                 messages,
                                                 onChange,
                                                 onChangeDirty,
                                                 onChangeFocus,
                                                 onFilterOption,
                                                 options,
                                                 renderOption,
                                                 resultValue,
                                                 setIsOpen,
                                                 setSelectValue,
                                                 size,
                                                 theme,
                                             }) => {
    const intervalId = useIntervalId();

    const onClickItem = React.useCallback(
        (event: React.MouseEvent, option: TSelectOption) => {
            event.stopPropagation();

            if (!option?.disabled && option.value !== resultValue) {
                clearTimeout(intervalId.current);
                onChangeDirty?.(true);

                if (isFunction(onChange)) {
                    onChange(fullOption ? option : option.value);
                } else {
                    setSelectValue(option.value);
                }

                if (isOpen) {
                    intervalId.current = setTimeout(() => setIsOpen(false), HIDE_LIST_DELAY);
                }
            }
        },
        [
            fullOption,
            intervalId,
            isOpen,
            onChange,
            onChangeDirty,
            resultValue,
            setIsOpen,
            setSelectValue,
        ],
    );

    const onClickDebounce = React.useCallback(throttle(onClickItem, 300), [onClickItem]);

    const CurrentList = LISTS[theme];

    return (
        <div
            className={clsx(STYLES.listWrapper({ dropdownPosition, theme }), classes?.listWrapper)}
            data-testid={`${dataTestId}__wrapper-list`}
        >
            <div className={isOpen ? 'block' : 'hidden'}>
                {hasFilter && (
                    <div className={STYLES.listSearchWrapper({ theme })}>
                        <div className={STYLES.listSearch({ theme, size })}>
                            <input
                                className={STYLES.listSearchInput({ theme, size })}
                                data-testid={`${DATA_TEST_ID}__input`}
                                onChange={onFilterOption}
                                placeholder={messages.searchPlaceholder}
                                type="text"
                                value={inputValue}
                            />

                            <span data-testId={`${DATA_TEST_ID}__search-icon`} />
                        </div>
                    </div>
                )}

                <div
                    className={STYLES.scrollListWrapper({ theme })}
                    data-testid={`${DATA_TEST_ID}__scroll-list`}
                >
                    <CurrentList
                        className={classes?.itemList}
                        onClickItem={onClickDebounce}
                        options={options}
                        renderOption={renderOption}
                        selectValue={resultValue}
                        size={size}
                        theme={theme}
                        isDisabledItemClick={isDisabledItemClick}
                    />
                </div>
            </div>
        </div>
    );
};

export const List = React.memo(ListComponent);
