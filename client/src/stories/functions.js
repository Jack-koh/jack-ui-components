export const margin = ({
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}) => {
  const merge = {};
  if (marginTop) merge["margin-top"] = marginTop;
  if (marginBottom) merge["margin-bottom"] = marginBottom;
  if (marginLeft) merge["margin-left"] = marginLeft;
  if (marginRight) merge["margin-right"] = marginRight;

  if (margin) return margin;

  if (marginTop || marginBottom || marginLeft || marginRight) {
    let string = "";
    for (const key in merge) {
      const castKey = key;
      string += `${key}: ${merge[castKey]}px;`;
    }
    return string;
  }

  return "";
};
