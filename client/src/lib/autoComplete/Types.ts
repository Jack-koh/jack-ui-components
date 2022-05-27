namespace Api {
  export interface Pagination {
    rnum: number;
    info: { current: number; total: number };
    format: { limit: number; offset: number };
  }

  export interface Paging {
    loadType: 'init' | 'loadMore';
    pagination: Pagination;
  }

  export interface ReqData {
    url: string;
    params?: any;
    alert?: boolean;
  }

  export interface Response {
    data: { message: string; list: any[]; manager: any[] };
    status: number;
  }

  export interface Fullfilled {
    response: Api.Response;
    reqData: Api.ReqData;
  }

  export interface InfiFullfilled {
    response: Api.Response;
    reqData: Api.ReqData;
    paging: Api.Paging;
  }
}

export declare namespace M_Auto {
  type Data<T> = {
    title: string;
    value: T & { rnum: number };
    selected: boolean;
  };

  interface State<T> {
    choice: { isAllCheck: number; include: Data<T>[]; exclude: Data<T>[] };
    data: Data<T>[];
    loading: boolean;
    searchText: string;
    pagination: Api.Pagination;
  }

  type Choice<T> = {
    isAllCheck: number;
    include: Data<T>[];
    exclude: Data<T>[];
  };
  type Patch<T> = { choice: Choice<T>; searchText: string; data: Data<T>[] };
  type Config<T> = {
    choice: Choice<T>;
    onChange: (payload: Patch<T>) => void;
    searchText: string;
  };
  type Select<T> = { data: Data<T>[]; item: Data<T>; check: number };
  type Check<T> = {
    data: Data<T>[];
    item: Data<T>;
    choice: Choice<T>;
    check: number;
  };

  interface Context<T> {
    data: Data<T>[];
    config: Config<T>;
    disabled: boolean;
    target: React.RefObject<HTMLDivElement> | null;
    allCheck?: boolean;
    focus: boolean;
    loading?: boolean;
    clickInside?: boolean;
    setFocus: (focus: boolean) => void;
  }

  type Actions<T> =
    | { type: 'choice'; value: Choice<T> }
    | { type: 'searchText'; value: string }
    | { type: 'data'; value: Data<T>[] }
    // 위에타입들 제거
    | { type: 'patch'; value: Patch<T> }
    | {
        type: 'init';
        value: { loadType: 'init' | 'loadMore'; searchText?: string };
      }
    | { type: 'paging'; value: { data: T[]; pagination: Api.Pagination } };
}
