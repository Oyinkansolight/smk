/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

export type GlobalContent = {
  isDataLoading: boolean;
  setIsDataLoading: (v: boolean) => void;
  loadingCount: number;
  setLoadingCount: (v: number) => void;
  maxLoadingCount: number;
  setMaxLoadingCount: (v: number) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  isDataLoading: false,
  setIsDataLoading: () => {},
  loadingCount: 0,
  setLoadingCount: () => {},
  maxLoadingCount: 0,
  setMaxLoadingCount: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);