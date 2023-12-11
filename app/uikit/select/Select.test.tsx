import { describe, it, expect, vitest, beforeEach, vi, afterEach } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { DATA_TEST_ID, optionsTest } from './constants';
import { ESelectDropdownPosition, ESelectTheme } from './enums';
import { Select } from './Select';

const defaultProps = {
    dataTestId: DATA_TEST_ID,
    dropdownPosition: ESelectDropdownPosition.Bottom,
    fullOption: false,
    isFiltered: false,
    label: 'Тип реквизита',
    options: optionsTest,
    required: false,
    theme: ESelectTheme.Primary,
};

const renderSelect = () => {
    return render(<Select {...defaultProps} />);
};

describe('Select component', () => {
    afterEach(() => {
        vi.clearAllTimers();
    });

    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    it('should render the select', () => {
        const { getByTestId } = renderSelect();
        const select = getByTestId(DATA_TEST_ID);
        expect(select).toBeInTheDocument();
    });

    it('renders correctly with label prop', () => {
        const { getByTestId } = render(<Select {...defaultProps} />);
        const label = getByTestId(`${DATA_TEST_ID}__label`);
        expect(label).toHaveTextContent('Тип реквизита');
    });

    it('renders correctly with disabled prop is true', () => {
        const { getByTestId } = render(<Select {...defaultProps} disabled />);
        const select = getByTestId(DATA_TEST_ID);
        expect(select).toHaveClass('cursor-not-allowed');
    });

    it('should onClick first list item and display header value correcty', () => {
        const onClick = vitest.fn();
        const { getAllByTestId, getByTestId } = render(
            <Select {...defaultProps} onChange={onClick} value={1} />,
        );
        const list = getAllByTestId(`${DATA_TEST_ID}__item`);
        fireEvent.click(list[0]);
        const headerValue = getByTestId(`${DATA_TEST_ID}__input-value`);
        expect(headerValue).toHaveTextContent('Банковская карта');
    });

    it('should isFiltered prop is true', () => {
        const { getByTestId } = render(<Select {...defaultProps} isFiltered />);
        const filter = getByTestId(`${DATA_TEST_ID}__filter`);
        expect(filter).toBeInTheDocument();
    });

    it('should ignore show list options', async () => {
        const { getByTestId } = render(<Select {...defaultProps} disabled={true} />);
        const select = getByTestId(DATA_TEST_ID) as HTMLInputElement;

        fireEvent.mouseDown(select);
        const list = select.querySelectorAll(`${DATA_TEST_ID}__list`);

        expect(list.length).toBe(0);
    });
});
