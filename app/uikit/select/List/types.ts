import type * as React from 'react';
import type { ESelectTheme, ESelectSize } from '../enums';
import type {
    TSelectDropdownPosition,
    TSelectOption,
    TSelectValue,
    TRenderOption,
    TSelectClasses,
    TFilterOptionFn,
    TSelectMessages,
} from '../types';

export type TListProps = {
    classes?: TSelectClasses;
    dataTestId?: string;
    dropdownPosition: TSelectDropdownPosition;
    fullOption: boolean;
    hasFilter?: boolean;
    inputValue?: string | number | undefined;
    isDisabledItemClick?: boolean;
    isOpen: boolean;
    messages: TSelectMessages;
    onChange?: (value: any) => void;
    onChangeDirty?: (value: boolean) => void;
    onChangeFocus?: (value: boolean) => void;
    onFilter?: TFilterOptionFn;
    onFilterOption?: React.ChangeEventHandler<HTMLInputElement>;
    options: TSelectOption[];
    renderOption?: TRenderOption;
    resultValue: TSelectValue;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectValue: React.Dispatch<React.SetStateAction<TSelectValue>>;
    size: `${ESelectSize}`;
    theme: `${ESelectTheme}`;
};
