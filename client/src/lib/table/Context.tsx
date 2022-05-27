import { createContext } from 'react';
import { M_Table } from './table.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<M_Table.context<any>>({
  state: { header: [], windowSize: 0 },
  config: { order: null, check: null },
  data: [],
  setState: () => false,
});

export default TableContext;
