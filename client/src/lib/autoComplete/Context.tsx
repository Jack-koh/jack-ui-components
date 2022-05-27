import { createContext } from 'react';
import type { M_Auto } from './Types';

const AutoContext = createContext<M_Auto.Context<any>>({
  data: [],
  config: {
    choice: { isAllCheck: 0, include: [], exclude: [] },
    onChange: () => false,
    searchText: '',
  },
  disabled: false,
  target: null,
  allCheck: false,
  focus: false,
  loading: false,
  clickInside: false,
  setFocus: () => false,
});

export default AutoContext;
