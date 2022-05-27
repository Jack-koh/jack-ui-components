import { Dispatch } from "react";

export declare module M_Table {
  interface state {
    header: header[];
    windowSize: number;
  }

  interface header {
    title: string;
    property: string;
    order?: boolean;
    toolTip?: boolean;
    align?: string;
    width?: number;
    flex?: number;
    hidden?: boolean;
  }

  type choice<T> = { isAllCheck: number; include: T[]; exclude: T[] };
  type ordering = "DESC" | "ASC";

  interface config<T> {
    check: config.check<T> | null;
    order: config.order | null;
  }

  namespace config {
    export type order = {
      sort: sortPayload;
      onClick: (order: sortPayload) => void;
    };
    export type check<T> = {
      choice: choice<T>;
      onChange: (payload: { data: T[]; choice: choice<T> }) => void;
      disabled?: { key: string; value: number | string } | { key: string; value: number | string }[];
      type?: "pagination" | "infinite";
    };
  }

  interface context<T> {
    data: T[];
    state: { header: header[]; windowSize: number };
    setState: Dispatch<(state: state) => state>;
    config: config<T>;
  }

  type checkPayload<T> = { data: T[]; choice: choice<T> };
  type sortPayload = { [key: string]: ordering };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type rowProps<T> = { property: string; rowData: T; value: any };
}
