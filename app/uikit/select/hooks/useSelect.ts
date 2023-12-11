import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { useCallback, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {TSelectOption, TSelectValue} from "~/uikit/select";

type TProps = {
    options: TSelectOption[];
    value: TSelectValue;
};

type TUseSelectResponse = {
    inputValue?: any;
    isDirty: boolean;
    isFocus: boolean;
    isOpen: boolean;
    onChangeDirty: (value: boolean) => void;
    onChangeInputValue: (value: TSelectValue) => void;
    onChangeFocus: (value: boolean) => void;
    optionsProp: TSelectOption[];
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setOptionsProp: Dispatch<SetStateAction<TSelectOption[]>>;
};

type TUseSelect = (props: TProps) => TUseSelectResponse;

export const useSelect: TUseSelect = ({ options, value }) => {
    const [inputValue, setInputValue] = useState<TSelectValue>('');
    const [isDirty, setIsDirty] = useState(!!value);
    const [isFocus, setIsFocus] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [optionsProp, setOptionsProp] = useState(options);

    useEffect(() => {
        setOptionsProp(options);
    }, [options]);

    const getInputValue = useCallback(
        (value: TSelectValue) => {
            if (isNil(value)) {
                return '';
            }
            const searchValue = String(value);
            if (!isNil(options) && !isEmpty(options)) {
                const inputOption = options.find((option) => String(option.value) === searchValue);
                return inputOption?.name ?? searchValue;
            }
        },
        [options],
    );

    const handleChangeInputValue = useCallback((value: TSelectValue) => {
        const val = getInputValue(value);
        setInputValue(val);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeDirty = useCallback((value: boolean) => {
        setIsDirty(value);
    }, []);

    const handleChangeFocus = useCallback((value: boolean) => {
        setIsFocus(value);
    }, []);

    return {
        inputValue: inputValue,
        isDirty,
        isFocus,
        isOpen,
        onChangeDirty: handleChangeDirty,
        onChangeInputValue: handleChangeInputValue,
        onChangeFocus: handleChangeFocus,
        optionsProp,
        setIsOpen,
        setOptionsProp,
    };
};
