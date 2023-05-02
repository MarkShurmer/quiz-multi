/* eslint-disable react-refresh/only-export-components */
import { ReactElement, useEffect } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MutableSnapshot, RecoilRoot, RecoilValue, useRecoilValue } from 'recoil';
import { convertToGameInfo } from '../src/api/api-helper';
import mockData from '../public/data.json';

// const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
//   return <RecoilRoot initializeState={}>{children}</RecoilRoot>;
// };

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
    initialStateSetter?: (mutableSnapshot: MutableSnapshot) => void
) => render(<RecoilRoot initializeState={initialStateSetter}>{ui}</RecoilRoot>, options);

export type RecoilChangeEvent<T> = (value: T) => void;
export type RecoilObserverProps<T> = {
    node: RecoilValue<T>;
    onChange: RecoilChangeEvent<T>;
};

export const RecoilObserver = (props: RecoilObserverProps<unknown>) => {
    const { node, onChange } = props;
    const value = useRecoilValue(node);
    useEffect(() => onChange(value), [onChange, value]);
    return null;
};

export const getMockQuestions = () => convertToGameInfo(mockData);

// // act and advance jest timers
// export function flushPromisesAndTimers(): Promise<void> {
//   return act(
//     () =>
//       new Promise((resolve) => {
//         setTimeout(resolve, 100);
//         vi.runAllTimers();
//       })
//   );
// }

export * from '@testing-library/react';
export { customRender as render };
