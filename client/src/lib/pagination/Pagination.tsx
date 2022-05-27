import React from 'react';
import classNames from 'classnames';

interface Props {
  format: { offset: number; limit: number };
  totalPage: number;
  onChange: (offset: number) => void;
}

export const Pagination: React.FC<Props> = ({ format, totalPage, onChange }) => {
  const { offset, limit } = format;
  const curPageIndex = offset / limit;
  const pageChaper = Math.floor(curPageIndex / 10) * 10;

  const pageHandler = (index: number): void => onChange(index * limit);

  const leftChapterHandler = (): void => {
    if (curPageIndex > 0) onChange((curPageIndex - 1) * limit);
  };

  const leftChapterStartHandler = (): void => {
    if (curPageIndex !== 0) onChange(0);
  };

  const rightChapterHandler = (): void => {
    if (totalPage !== 1 && curPageIndex + 1 !== totalPage) {
      onChange(offset + limit);
    }
  };
  const rightChapterEndHandler = (): void => {
    if (curPageIndex === totalPage - 1) return;
    onChange((totalPage - 1) * limit);
  };

  const chapter = [...Array(totalPage)].slice(pageChaper, pageChaper + 10);
  const items = chapter.map((_, i) => {
    const index = i + pageChaper;
    return (
      <div
        key={index}
        className={classNames('pagination-item', { active: curPageIndex === index })}
        onClick={(): void => pageHandler(index)}
      >
        {index + 1}
      </div>
    );
  });

  return (
    <div className="jack__pagination">
      <div className="jack__pagination__buttons">
        <div className="jack__left__arrow__start" onClick={leftChapterStartHandler}>
          <i />
        </div>
        <div className="jack__left__arrow" onClick={leftChapterHandler}>
          <i />
        </div>
        <div className="jack__page__items">{items}</div>
        <div className="jack__right__arrow" onClick={rightChapterHandler}>
          <i />
        </div>
        <div className="jack__right__arrow-end" onClick={rightChapterEndHandler}>
          <i />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
