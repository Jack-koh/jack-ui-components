import { cloneDeep } from 'lodash';
import { M_Table } from './table.model';

type Return<T> = { data: T[]; choice: M_Table.choice<T> };
type AllCheckArg<T> = {
  check: number;
  data: T[];
  type?: 'pagination' | 'infinite';
  disabled?: { key: string; value: string | number } | { key: string; value: string | number }[];
};
type CheckArg<T> = {
  data: T[];
  choice: M_Table.choice<T>;
  check: number;
  index: number;
  type?: 'pagination' | 'infinite';
};

export type Extention<T> = T & {
  state: { selected: boolean };
  rnum: number;
} & { [key: string]: string };

export const tableHandler = {
  check: <T>(arg: CheckArg<T>): Return<T> => {
    const clone = cloneDeep(arg);
    const { data, check, index, choice } = clone;
    const rowData = data[index] as Extention<T>;
    const rnum = (data[0] as Extention<T>)?.rnum;
    rowData['state']['selected'] = !!check;

    if (arg.type === 'pagination') {
      // 페이징 테이블일 경우
      choice.include = check ? [...choice.include, rowData] : choice.include.filter((el: T) => el !== rowData);
      return { data, choice };
    } else {
      // prettier-ignore
      const isAllExcutor = (): void => {
      switch (!!check) {
        case true: choice['exclude'] = choice.exclude.filter((el: T) => el !== rowData); break;
        case false:
          choice['exclude'] = [...choice.exclude, rowData];
          if (choice.exclude.length === rnum) {
            choice['isAllCheck'] = 0;
            choice.exclude= [];
          }
          break;
      }
    };

      // prettier-ignore
      const isNotAllExcutor = (): void => {
      switch (!!check) {
        case true:
          // 모든 체크를 선택했을시
          choice['include'] = [...choice.include, rowData];
          if (choice.include.length === rnum) {
            choice['isAllCheck'] = 1;
            choice.include = [];
          }
          break;
        case false: choice['include'] = choice.include.filter((el: T) => el !== rowData); break;
      }
  };
      // prettier-ignore
      switch (!!choice.isAllCheck) {
      case true: isAllExcutor(); break;
      case false: isNotAllExcutor(); break;
    }
      return { data, choice };
    }
  },
  allCheck: <T>(arg: AllCheckArg<Extention<T>>): Return<T> => {
    const { check, type } = arg;
    const data = arg.data.map((item) => ({ ...item, state: { ...item.state, selected: !!check } }));
    const include = () => {
      if (type === 'pagination') return check ? data : [];
      return [];
    };
    let choice = { isAllCheck: check, include: include(), exclude: [] };
    return { data, choice };
  },
};
