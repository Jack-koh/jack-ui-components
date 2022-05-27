import React, { Dispatch } from "react";
import { cloneDeep } from "lodash";
import { M_Table } from "./table.model";

const resize = (
  index: number,
  e: MouseEvent,
  target: HTMLElement,
  setState: Dispatch<(state: M_Table.state) => M_Table.state>
): void => {
  document.body.classList.add("table-resizing");
  const next = target.nextElementSibling as HTMLElement;

  if (target) {
    const t_rect = target.getBoundingClientRect();
    const n_rect = next.getBoundingClientRect();
    const min = 60;
    const sum = t_rect.width + n_rect.width;
    const size = e.clientX - t_rect.left;

    if (min <= size && sum - size > 60) {
      target.style.width = `${size}px`;
      next.style.width = `${sum - size}px`;
      setState((state: M_Table.state) => {
        const header = cloneDeep(state.header);
        header[index].width = size;
        let nextHeader;
        for (let i = index + 1; i < header.length; i++) {
          if (!header[i].hidden) {
            nextHeader = header[i];
            break;
          }
        }

        if (nextHeader) {
          nextHeader.width = sum - size;
          delete nextHeader.flex;
        }
        delete header[index].flex;
        return { ...state, header, windowSize: window.innerWidth };
      });
    }
  }
};

export const resizeHandler = (
  index: number,
  ev: React.SyntheticEvent,
  setState: Dispatch<(state: M_Table.state) => M_Table.state>
) => {
  const t = ev.target as HTMLElement;
  const p = t.parentNode as HTMLElement;
  const resizer = (e: MouseEvent) => resize(index, e, p, setState);
  const stopResize = (): void => {
    document.body.removeAttribute("class");
    window.removeEventListener("mousemove", resizer, false);
    window.removeEventListener("mouseup", stopResize, false);
  };
  window.addEventListener("mousemove", resizer, false);
  window.addEventListener("mouseup", stopResize, false);
};
