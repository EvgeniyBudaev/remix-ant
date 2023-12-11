import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import * as React from 'react';
import { STYLES, DATA_TEST_ID } from '../constants';
import type { THeaderProps } from './types';
import {useDefaultRef} from "~/uikit/select/hooks";
import {TSelectValue} from "~/uikit/select";
import {ESelectSize, ESelectTheme} from "~/uikit/select/enums";

const HeaderComponent = React.forwardRef<HTMLDivElement, THeaderProps>(
    (
        {
            disabled,
            hideArrowIcon,
            hideCloseIcon,
            inputValue,
            info,
            isDirty,
            isFiltered,
            isFocus,
            isOpen,
            label,
            loading,
            name,
            notError,
            onChangeFocus,
            onChangeInputValue,
            onClear,
            onFilterOption,
            options,
            prefixIcon,
            postfixIcon,
            renderInputBody,
            required,
            resultValue,
            setIsOpen,
            size,
            theme,
        }: THeaderProps,
        ref,
    ) => {
        const iconClearRef = React.useRef<HTMLDivElement | null>(null);
        const inputWrapperRef = React.useRef<HTMLDivElement | null>(null);
        const inputRef = React.useRef<HTMLInputElement | null>(null);
        const resultRef = useDefaultRef<HTMLDivElement>(ref);

        React.useEffect(() => {
            onChangeInputValue?.((resultValue as string) || '');
        }, [onChangeInputValue, resultValue]);

        const setRef = React.useCallback(
            (node: HTMLDivElement) => {
                inputWrapperRef.current = node;
                isFunction(resultRef) ? resultRef(node) : (resultRef.current = node);
            },
            [inputWrapperRef, resultRef],
        );

        const onClickInput: React.MouseEventHandler = React.useCallback(
            (event) => {
                const isIconClearClicked = iconClearRef.current?.contains(event.target as Node);
                if (!isIconClearClicked && !disabled) {
                    onChangeFocus?.(true);
                    setIsOpen((prevState) => !prevState);
                    if (!disabled && isFiltered) {
                        inputRef.current?.focus();
                    }
                } else {
                    setIsOpen(false);
                }
            },
            [disabled, isFiltered, onChangeFocus, setIsOpen],
        );

        const getInputValue = React.useCallback(
            (value: TSelectValue) => {
                if (isNil(value)) {
                    return undefined;
                }
                const searchValue = String(value);
                if (options.length) {
                    const inputOption = options.find((option) => String(option.value) === searchValue);

                    return inputOption?.name;
                }
            },
            [options],
        );

        const textVariant =
            size === ESelectSize.Large && theme === ESelectTheme.Notch
                ? 'Gilroy/L'
                : size === ESelectSize.Large
                    ? 'Gilroy/M'
                    : 'Gilroy/XS';

        return (
            <div
                ref={setRef}
                className={STYLES.inputWrapper({
                    isOpen,
                    disabled,
                    notError,
                    theme,
                    size,
                })}
                data-testid={`${DATA_TEST_ID}__input-wrapper`}
                onClick={onClickInput}
            >
                {!!prefixIcon && (
                    <div className="mr-2">
                        <span
                            color="grey-dark"
                            data-testId={`${DATA_TEST_ID}__prefix-icon`}
                        >
                            {prefixIcon}
                        </span>
                    </div>
                )}

                <div className={STYLES.inputBody({ theme, size })}>
                    {renderInputBody ? (
                        renderInputBody({ inputValue: getInputValue(resultValue), label })
                    ) : (
                        <>
                            {!!label && (
                                <div
                                    className={STYLES.inputLabel({
                                        inputValue: getInputValue(resultValue),
                                        isDirty,
                                        isFocus,
                                        isFiltered,
                                        theme,
                                    })}
                                    data-testid={`${DATA_TEST_ID}__label`}
                                >
                                    {label}
                                    {required && <div className={STYLES.required} />}
                                </div>
                            )}

                            {!isFiltered && (
                                <>
                                    {!isNil(getInputValue(resultValue)) && (
                                        <div className={STYLES.inputValue({ label, theme })}>
                                            <span
                                                data-testId={`${DATA_TEST_ID}__input-value`}
                                            >
                                                {getInputValue(resultValue)}
                                            </span>
                                        </div>
                                    )}

                                    {/* TODO: Выпилить вместе с remix-validated-form */}
                                    <input name={name} value={(resultValue as string) || ''} hidden readOnly />
                                </>
                            )}

                            {isFiltered && (
                                <div
                                    className={STYLES.inputValue({ label, theme })}
                                    data-testid={`${DATA_TEST_ID}__filter`}
                                >
                                    <input
                                        autoComplete="off"
                                        className={STYLES.headerSearchInput({ theme, size })}
                                        data-testid={`${DATA_TEST_ID}__filter-input`}
                                        name={name}
                                        onChange={onFilterOption}
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                {!hideCloseIcon && !disabled && !isNil(getInputValue(resultValue)) && (
                    <div data-testid={`${DATA_TEST_ID}__icon-clear`} onClick={onClear} ref={iconClearRef}>
                        <span>
                            CrossIcon
                        </span>
                    </div>
                )}

                PostfixIcon

                {info && (
                    <span data-testId={`${DATA_TEST_ID}__info-tooltip`}>
                        <span
                            data-testId={`${DATA_TEST_ID}__info-icon`}
                        />
                    </span>
                )}
            </div>
        );
    },
);

HeaderComponent.displayName = 'HeaderComponent';

export const Header = React.memo(HeaderComponent);
