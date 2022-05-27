import React, { useRef, useReducer } from 'react';
import classNames from 'classnames';
import produce from 'immer';
import styled from 'styled-components';
import { AniProgressBar } from './progressbar/AniProgressBar';
import Label from './Label';

const Container = styled.div<{ width?: number | string; height?: number }>`
  height: ${({ height }) => `${height ?? 180}px`};
  width: ${({ width }) => {
    if (typeof width === 'string') return width;
    return `${width ?? 300}px`;
  }};
`;

export type actions =
  | {
      type: 'state';
      value: {
        file: File | null;
        dragStatus: boolean;
        invalidFile: File | null;
      };
    }
  | { type: 'dragStatus'; value: boolean }
  | { type: 'invalidFile'; value: File | null }
  | { type: 'file'; value: File | null };

interface Props {
  className?: string;
  onChange?: (file: File | null) => void;
  file?: File | null;
  extensions?: string[];
  loading?: boolean;
  progressGage?: number;
  error?: string;
  styles?: { width?: number | string; height?: number };
}

interface State {
  dragStatus: boolean;
  invalidFile: File | null;
  file: File | null;
}

const initialState = { dragStatus: false, file: null, invalidFile: null };
// prettier-ignore
const reducer = (state: State, action: actions) => {
  return produce(state, (draft: State) => {
    switch (action.type) {
      case 'dragStatus': draft['dragStatus'] = action.value; break;
      case 'invalidFile': draft['invalidFile'] = action.value; break;
      case 'file': draft['file'] = action.value; break;
      case 'state':
        draft['file'] = action.value.file;
        draft['invalidFile'] = action.value.invalidFile;
        draft['dragStatus'] = action.value.dragStatus;
      break;
    }
  });
};

export const DropZone: React.FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useReducer(reducer, initialState, (init) => ({
    ...init,
    file: props.file ?? null,
  }));
  const { file, dragStatus, invalidFile } = state;
  const { extensions = [], className = '', loading = false, progressGage, styles, error } = props;

  const cancelHandler = (): void => {
    if (inputRef.current) inputRef.current.value = '';
    if (props.onChange) props.onChange(null);
    setState({ type: 'invalidFile', value: null });
    setState({ type: 'file', value: null });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputFile = e.target.files ? e.target.files[0] : null;
    if (inputFile) {
      const lastDot = inputFile.name.lastIndexOf('.');
      if (props.extensions && props.extensions.length) {
        const fileExt = inputFile.name.substring(lastDot + 1);
        const extPassed =
          lastDot > -1 &&
          props.extensions.some((ext) => {
            if (ext.indexOf('.') > -1) return inputFile.name === ext;
            return ext === fileExt;
          });
        const map = new Map();
        map.set('file', extPassed ? inputFile : null);
        map.set('invalidFile', !extPassed ? inputFile : null);
        if (props.onChange) props.onChange(map.get('file'));
        setState({
          type: 'state',
          value: {
            file: map.get('file'),
            invalidFile: map.get('invalidFile'),
            dragStatus: false,
          },
        });
      } else {
        if (props.onChange) props.onChange(inputFile);
        setState({ type: 'file', value: inputFile });
      }
    }
  };

  const LABELS = (): JSX.Element => {
    if (error) return <Label.Error error={error} />;
    if (!file && !invalidFile) return <Label.Default />;
    if (file) return <Label.ValidFile fileName={file.name} />;
    if (invalidFile) return <Label.InvalidFile fileName={invalidFile.name} extensions={extensions} />;
    return <></>;
  };

  return (
    <Container
      {...styles}
      className={classNames('react_drop__zone_wrapper', {
        [className]: className,
      })}
    >
      <div className={classNames('drop__zone', { active: dragStatus, loading })}>
        <div className="file__input">
          {loading && <AniProgressBar progress={progressGage} />}
          {!loading && (
            <>
              {LABELS()}
              <input
                type="file"
                ref={inputRef}
                onDragOver={(): void => {
                  if (!dragStatus) setState({ type: 'dragStatus', value: true });
                }}
                onDragLeave={(): void => setState({ type: 'dragStatus', value: false })}
                onChange={onChangeHandler}
              />
              {(file || invalidFile) && !error && <i className="cancel-button" onClick={cancelHandler} />}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
