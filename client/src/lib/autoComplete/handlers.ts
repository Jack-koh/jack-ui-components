import { cloneDeep, isEqual } from 'lodash';
import type { M_Auto } from './Types';

type Return<T> = { data: M_Auto.Data<T>[]; choice: M_Auto.Choice<T> };
export const handlers = {
  choice: <T>(arg: M_Auto.Check<T>): Return<T> => {
    const clone = cloneDeep(arg);
    const { data, check, item, choice } = clone;
    const idx = data.findIndex((el: M_Auto.Data<T>) => isEqual(el.value, item.value));
    item['selected'] = !!check;
    data[idx] = item;

    const isAllExcutor = (): void => {
      switch (!!check) {
        case true: {
          const idx = choice.exclude.findIndex((el) => isEqual(el.value, item.value));
          choice.exclude.splice(idx, 1);
          break;
        }
        case false:
          choice['exclude'] = [...choice.exclude, item];
          if (choice.exclude.length === data[0]?.value.rnum) {
            choice['isAllCheck'] = 0;
            choice.exclude = [];
          }
          break;
      }
    };

    const isNotAllExcutor = (): void => {
      switch (!!check) {
        case true:
          choice['include'] = [...choice.include, item];
          // 모든 체크를 선택했을시
          if (choice.include.length === data[0]?.value.rnum) {
            choice['isAllCheck'] = 1;
            choice.include = [];
          }
          break;
        case false: {
          const idx = choice.include.findIndex((el) => isEqual(el.value, item.value));
          choice.include.splice(idx, 1);
          break;
        }
      }
    };
    // prettier-ignore
    switch (!!choice.isAllCheck) {
        case true: isAllExcutor(); break;
        case false: isNotAllExcutor(); break;
      }
    return { data, choice };
  },
  check: <T>(arg: M_Auto.Check<T>): Return<T> => {
    const clone = cloneDeep(arg);
    const { data, item, check, choice } = clone;
    const idx = data.findIndex((el: M_Auto.Data<T>) => isEqual(el.value, item.value));
    item['selected'] = !!check;
    data[idx] = item;

    switch (!!check) {
      case true:
        choice['include'] = [...choice.include, item];
        break;
      case false: {
        const idx = choice.include.findIndex((el) => isEqual(el.value, item.value));
        choice.include.splice(idx, 1);
        break;
      }
    }

    return { data, choice };
  },
  // check: <T>(arg: Auto.Check<T>): Return<T> => {
  //   const clone = cloneDeep(arg);
  //   const { data, check, index, choice } = clone;
  //   const item = data[index];
  //   data[index]['selected'] = !!check;

  //   switch (!!check) {
  //     case true:
  //       choice['include'] = [...choice.include, item];
  //       break;
  //     case false:
  //       choice['include'] = choice.include.filter((el: Auto.Data<T>) => el !== item);
  //       break;
  //   }

  //   return { data, choice };
  // },
  select: <T>(arg: M_Auto.Select<T>): Return<T> => {
    const clone = cloneDeep(arg);
    const { data, item, check } = clone;
    const idx = data.findIndex((el: M_Auto.Data<T>) => isEqual(el.value, item.value));
    for (const i of data) i.selected = false;
    item['selected'] = !!check;
    data[idx] = item;
    return {
      data,
      choice: { isAllCheck: 0, include: check ? [item] : [], exclude: [] },
    };
  },
};
