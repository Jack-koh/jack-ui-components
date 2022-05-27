import React from "react";
import { FlattenSimpleInterpolation } from "styled-components";

export const convertDigit = (epoch: number, digit: number): number => {
  const stringEpoch = Math.floor(epoch).toString();
  if (digit === 10 && stringEpoch.length === 13) return Math.floor(+stringEpoch / 1000);
  if (digit === 13 && stringEpoch.length === 10) return Math.floor(+stringEpoch * 1000);
  return Math.floor(epoch);
};

// epoch 시간을 utc 시간으로 변환
export const timeFormatFromUTCEpoch = (epoch: string | number | null, formatType: number): string => {
  const doubleDigit = (n: number): string | number => (n < 10 ? `0${n}` : n);
  if (!epoch) return "-";
  const epochUTC = convertDigit(epoch ? +epoch : 0, 10);
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(epochUTC);
  const yyyy = d.getFullYear();
  const MM = d.getMonth() + 1;
  const dd = d.getDate();
  const hh = d.getHours();
  const mm = d.getMinutes();
  const ss = d.getSeconds();
  if (localStorage.getItem("language") === "en") {
    // prettier-ignore
    switch(formatType) {
      case 1: return `${doubleDigit(MM)}/${doubleDigit(dd)}/${yyyy} ${doubleDigit(hh)}:${doubleDigit(mm)}:${doubleDigit(ss)}`;
      case 2: return `${doubleDigit(MM)}/${doubleDigit(dd)}/${yyyy} ${doubleDigit(hh)}:${doubleDigit(mm)}`;
      case 3: return `${doubleDigit(MM)}/${doubleDigit(dd)}/${yyyy}`;
      case 10: return `${doubleDigit(hh)}:${doubleDigit(mm)}:${doubleDigit(ss)}`;
    }
  } else {
    // prettier-ignore
    switch(formatType) {
      case 1: return `${yyyy}-${doubleDigit(MM)}-${doubleDigit(dd)} ${doubleDigit(hh)}:${doubleDigit(mm)}:${doubleDigit(ss)}`;
      case 2: return `${yyyy}-${doubleDigit(MM)}-${doubleDigit(dd)} ${doubleDigit(hh)}:${doubleDigit(mm)}`;
      case 3: return `${yyyy}-${doubleDigit(MM)}-${doubleDigit(dd)}`;
      case 4: return `${yyyy}-${doubleDigit(MM)}`;
      case 10: return `${doubleDigit(hh)}:${doubleDigit(mm)}:${doubleDigit(ss)}`;
    }
  }
  return "-";
};

type Margin = {
  margin?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

export const margin = ({
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: Margin): FlattenSimpleInterpolation | string | undefined => {
  type Merge = {
    "margin-top"?: number;
    "margin-bottom"?: number;
    "margin-left"?: number;
    "margin-right"?: number;
  };
  const merge: Partial<Merge> = {};
  if (margin) return `margin: ${margin};`;
  if (marginTop) merge["margin-top"] = marginTop;
  if (marginBottom) merge["margin-bottom"] = marginBottom;
  if (marginLeft) merge["margin-left"] = marginLeft;
  if (marginRight) merge["margin-right"] = marginRight;

  if (marginTop || marginBottom || marginLeft || marginRight) {
    let string = "";
    for (const key in merge) {
      const castKey = key as keyof Merge;
      string += `${key}: ${merge[castKey]}px;`;
    }
    return string;
  }

  return "";
};

type Padding = {
  padding?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
};

export const padding = ({
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
}: Padding): FlattenSimpleInterpolation | string | undefined => {
  type Merge = {
    "padding-top"?: number;
    "padding-bottom"?: number;
    "padding-left"?: number;
    "padding-right"?: number;
  };
  const merge: Partial<Merge> = {};
  if (padding) return `padding: ${padding};`;
  if (paddingTop) merge["padding-top"] = paddingTop;
  if (paddingBottom) merge["padding-bottom"] = paddingBottom;
  if (paddingLeft) merge["padding-left"] = paddingLeft;
  if (paddingRight) merge["padding-right"] = paddingRight;

  if (paddingTop || paddingBottom || paddingLeft || paddingRight) {
    let string = "";
    for (const key in merge) {
      const castKey = key as keyof Merge;
      string += `${key}: ${merge[castKey]}px;`;
    }
    return string;
  }

  return "";
};

interface props {
  target: HTMLElement | HTMLElement[] | null;
  toggle: boolean;
  close: () => void;
}

const closeHandler = (
  setToggle: () => void,
  target: HTMLElement | HTMLElement[] | null,
  eTarget: EventTarget | null
): void => {
  if (target) {
    if (Array.isArray(target)) {
      for (const t of target as HTMLElement[]) if (t.contains(eTarget as Node)) return;
    } else if ((target as HTMLElement).contains(eTarget as Node)) {
      return;
    }
  }
  setToggle();
};

export const ClickOutsideEffect = ({ target, toggle, close }: props): void => {
  React.useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => closeHandler(close, target, e.target);
    document.addEventListener("mousedown", clickOutsideHandler);
    return (): void => document.removeEventListener("mousedown", clickOutsideHandler);
  }, [target, close, toggle]);
};
