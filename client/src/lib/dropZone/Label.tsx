import React from "react";

const Default: React.FC = () => {
  return (
    <div className="label">
      <i className="upload-icon" />
      <div className="label-text">파일을 드래그 하거나, 여기를 눌러주세요.</div>
    </div>
  );
};

const InvalidFile: React.FC<{ fileName: string; extensions: string[] }> = ({
  fileName,
  extensions,
}) => {
  return (
    <div className="label">
      <div className="valid-text">
        <div className="red-text">
          <span>{fileName}</span>
        </div>
        <div className="normal-text">
          <span>업로드 가능한 파일이 아닙니다.</span>
        </div>
        <div className="normal-text">{`확장자가 ${extensions.join(
          ", "
        )}인 파일만 업로드 가능합니다.`}</div>
      </div>

      <div className="gray-text">
        다시 업로드 하시려면 파일을 드래그 하거나, 여기를 눌러주세요.
      </div>
    </div>
  );
};

const ValidFile: React.FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <div className="label">
      <div className="valid-text">
        <div className="blue-text">
          <span>{fileName}</span>
        </div>
        <div className="normal-text">
          <span>업로드 가능한 파일입니다.</span>
        </div>
      </div>

      <div className="gray-text">계속 진행하려면 업로드 버튼을 누르세요.</div>
    </div>
  );
};

const Error: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="label">
      <div className="valid-text">
        <div className="red-text error">
          <span>{error}</span>
        </div>
      </div>

      <div className="gray-text">
        다시 업로드 하시려면 파일을 드래그 하거나, 여기를 눌러주세요.
      </div>
    </div>
  );
};

export default { Default, ValidFile, InvalidFile, Error };
