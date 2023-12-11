import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import * as React from 'react';
import { usePopper } from 'react-popper';
import { Portal } from '@headlessui/react';

import { STYLES, DATA_TEST_ID } from './constants';
import { ESelectDropdownPosition, ESelectSize, ESelectTheme } from './enums';
import { Header } from './Header';
import {useClickBody, useSelect} from './hooks';
import { List } from './List';
import type { TSelectMessages, TSelectOption, TSelectProps, TSelectValue } from './types';
import { defaultFilterFn } from './utils';

const DEFAULT_MESSAGES: TSelectMessages = {
    searchPlaceholder: 'Поиск',
};

const SelectComponent = React.forwardRef<HTMLDivElement, TSelectProps>(
    (
        {
            classes,
            dataTestId = DATA_TEST_ID,
            defaultValue,
            disabled,
            dropdownPosition = ESelectDropdownPosition.Bottom,
            fieldError,
            fullOption = false,
            hasError,
            hasFilter,
            helperText,
            hideArrowIcon,
            hideCloseIcon,
            info,
            isDisabledItemClick,
            isFiltered = true,
            label,
            loading,
            messages: messagesProp,
            name,
            onChange,
            onClear,
            onFilter,
            options = [],
            postfixIcon,
            prefixIcon,
            required = false,
            renderList,
            renderInputBody,
            renderOption,
            size = ESelectSize.Large,
            theme = ESelectTheme.Primary,
            value,
        },
        ref,
    ) => {
        const wrapperRef = React.useRef<HTMLDivElement>(null);

        const [selectValue, setSelectValue] = React.useState<TSelectValue>(value || defaultValue);
        const [resultValue, setResultValue] = React.useState<TSelectValue>(
            isFunction(onChange) ? value : selectValue,
        );
        const {
            inputValue,
            isDirty,
            isFocus,
            isOpen,
            onChangeDirty,
            onChangeFocus,
            onChangeInputValue,
            optionsProp,
            setIsOpen,
            setOptionsProp,
        } = useSelect({ options, value: value || defaultValue });

        React.useEffect(() => {
            setSelectValue(value || defaultValue);
            setResultValue(isFunction(onChange) ? value : selectValue);
        }, [defaultValue, onChange, selectValue, value]);

        const handleClickOutside = React.useCallback(
            (event: MouseEvent) => {
                if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                    onChangeFocus?.(false);
                }
            },
            [onChangeFocus],
        );

        React.useEffect(() => {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, [handleClickOutside]);

        const notError = !hasError && !fieldError;
        const messages: TSelectMessages = React.useMemo(
            () => ({ ...DEFAULT_MESSAGES, ...messagesProp }),
            [messagesProp],
        );

        const [referenceElement, setReferenceElement] = React.useState<HTMLDivElement | null>(null);
        const [popperElement, setPopperElement] = React.useState<any>(null);
        const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
            placement: `${dropdownPosition}-start`,
        });

        const referenceElementWidth = React.useMemo(
            () => referenceElement?.clientWidth ?? 0,
            [referenceElement?.clientWidth],
        );

        const portalRef = React.useMemo(() => ({ current: popperElement }), [popperElement]);
        useClickBody({
            isOpen,
            setIsOpen,
            wrapperRef,
            portalRef,
        });

        React.useEffect(() => {
            if (isOpen) update?.();
        }, [update, isOpen]);

        React.useEffect(() => {
            if (!isOpen && options.length !== optionsProp.length) {
                setOptionsProp(options);
            }
        }, [isOpen, options, options.length, optionsProp, setOptionsProp]);

        const handleChangeOptions = React.useCallback(
            (options: TSelectOption[]) => {
                setOptionsProp(options);
            },
            [setOptionsProp],
        );

        const handleDebounce = debounce((value: string) => {
            const filterFn = onFilter ?? defaultFilterFn;
            if (!value) {
                handleChangeOptions(options);
            } else {
                handleChangeOptions(options.filter((option) => filterFn(value, option)));
            }
        }, 150);

        const handleFilterOption = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value.toLowerCase();
            !isEmpty(value) ? onChangeDirty?.(true) : onChangeDirty?.(false);
            onChangeInputValue(value);
            handleDebounce(value);
        };

        const handleClearValue = React.useCallback(() => {
            if (!disabled) {
                onChangeDirty?.(false);
                onChangeFocus?.(false);
                if (isFunction(onClear)) {
                    onClear();
                }
            }
        }, [disabled, onChangeDirty, onChangeFocus, onClear]);

        return (
            <div
                ref={wrapperRef}
                data-name={name}
                className={STYLES.root({ disabled, theme })}
                data-testid={dataTestId}
            >
                <div className={STYLES.headerWrapper({ theme })}>
                    <div
                        className={STYLES.headerInner({ disabled, isOpen, notError, theme })}
                        ref={setReferenceElement}
                    >
                        <Header
                            disabled={disabled}
                            hideArrowIcon={hideArrowIcon}
                            hideCloseIcon={hideCloseIcon}
                            info={info}
                            inputValue={inputValue}
                            isDirty={isDirty}
                            isFiltered={!disabled && isFiltered}
                            isFocus={isFocus}
                            isOpen={isOpen}
                            label={label}
                            loading={loading}
                            name={name}
                            notError={notError}
                            onChangeFocus={onChangeFocus}
                            onChangeInputValue={onChangeInputValue}
                            onFilterOption={handleFilterOption}
                            onClear={handleClearValue}
                            options={optionsProp}
                            postfixIcon={postfixIcon}
                            prefixIcon={prefixIcon}
                            ref={ref}
                            renderInputBody={renderInputBody}
                            resultValue={resultValue}
                            required={required}
                            setIsOpen={setIsOpen}
                            size={size}
                            theme={theme}
                        />
                    </div>

                    <Portal
                        as="div"
                        ref={setPopperElement}
                        style={{
                            ...styles.popper,
                            zIndex: 950,
                            minWidth: referenceElementWidth,
                            maxWidth: referenceElementWidth,
                        }}
                        {...attributes.popper}
                    >
                        {renderList ? (
                            renderList({
                                dropdownPosition,
                                isOpen,
                                onChange,
                                options,
                                resultValue,
                                setIsOpen,
                                setSelectValue,
                                theme,
                            })
                        ) : (
                            <List
                                classes={classes}
                                dataTestId={dataTestId}
                                dropdownPosition={dropdownPosition}
                                fullOption={fullOption}
                                hasFilter={hasFilter}
                                isDisabledItemClick={isDisabledItemClick}
                                inputValue={inputValue}
                                isOpen={isOpen}
                                messages={messages}
                                onChange={onChange}
                                onChangeDirty={onChangeDirty}
                                onChangeFocus={onChangeFocus}
                                onFilterOption={handleFilterOption}
                                options={optionsProp}
                                renderOption={renderOption}
                                resultValue={resultValue}
                                setIsOpen={setIsOpen}
                                setSelectValue={setSelectValue}
                                size={size}
                                theme={theme}
                            />
                        )}
                    </Portal>
                </div>

                {!!helperText && (
                    <span data-testId={`${DATA_TEST_ID}__helper-text`}>{helperText}</span>
                )}

                {!!fieldError && (
                    <span data-testId={`${DATA_TEST_ID}__field-error`}>
                        {fieldError}
                    </span>
                )}
            </div>
        );
    },
);
SelectComponent.displayName = 'Select';

export const Select = React.memo(SelectComponent);
