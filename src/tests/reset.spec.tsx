import { render, fireEvent, RenderResult } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import moment from 'moment';
import { TimesUpdateButton } from "../components/molecules/TimeUpdateButtonComponent";
import { TimelineEventProps } from '../lib/TimelineType';
import { exItems } from '../lib/SampleState';

const queryClient = new QueryClient();

let renderResult: RenderResult;
let rerenderResult: RenderResult;
describe.skip('DnDアップデート用ボタン', () => {
  beforeEach(() => {
    renderResult = render(
      <QueryClientProvider client={queryClient}>
        <TimesUpdateButton timeChangeEvents={exItems} />
      </QueryClientProvider>);
    rerenderResult = render(
      <QueryClientProvider client={queryClient}>
        <TimesUpdateButton timeChangeEvents={[]} />
      </QueryClientProvider>);
  });

  test('まずはレンダー', () => {
    expect(renderResult.getByRole('変更回数: 3')).toBeInTheDocument();
  });
  test('buttonロールであること', () => {
    expect(renderResult.getAllByRole('button')[1].textContent).toBe('リセット');
  });
  test('ボタンクリック', () => {
    // const clickMock = vi.fn(() => {return rerenderResult});
    const resetButton = renderResult.getByRole('button', {name: 'リセット'});
    resetButton.click();
    // expect(renderResult.getByText('')).toBeInTheDocument();
  });
});
