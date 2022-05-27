import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Waiting } from '../../loading/Loading';
import { debounce } from 'lodash';

interface Props {
  progress?: number;
}

export const AniProgressBar: React.FC<Props> = ({ progress }): JSX.Element => {
  const [analyze, setAnalyze] = useState(false);
  useEffect(() => {
    const timer = debounce(setAnalyze.bind(this, true), 500);
    if (progress === 100) timer();
    return (): void => timer.cancel();
  }, [progress]);

  if (progress === null || progress === undefined) return <></>;

  return (
    <div className="jack__progress__content">
      <div className={classNames('ani-progress-wrapper', { uploaded: analyze })}>
        <div className="ani-progress-bar-wrapper">
          <div className="ani-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="ani-progress-pointer-wrppaer" style={{ left: `${progress}%` }}>
          <div className="ani-progress-ball">
            <div className="ani-progress-pointer">
              <div className="ani-progress-pointer-box">
                <span className="ani-progress-box-progress">{progress}</span>
                <span className="ani-progress-box-percent">%</span>
              </div>
              <div className="ani-progress-arrow" />
            </div>
          </div>
        </div>
      </div>

      <div className={classNames('ani-progress-comment', { uploaded: analyze })}>
        <div className="upload-success">
          <Waiting loading />
          <div className="floating-text">
            <div className="success-text">업로드 파일 분석 대기중</div>
            <div className="analyze-notice">파일 크기에 따라 분석에 소요되는 시간이 다릅니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
