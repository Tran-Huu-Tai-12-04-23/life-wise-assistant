import { CircularProgress } from '@mui/material';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import uploadImage from 'src/services/firebase';
import { ButtonOutlined } from '../button';

const UploadBtn = ({ onChangeFile, value, isRequired, label }) => {
  const [isLoading, setIsLoading] = useState(false);
  const refFile = useRef(null);
  const handleAddFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const url = await uploadImage(file);
      if (url) onChangeFile(url);
      setIsLoading(false);
    }
  };
  return (
    <ButtonOutlined onClick={() => refFile.current.click()}>
      {isLoading && <CircularProgress size={20} />}
      {!isLoading && (
        <>
          Upload thumbnail
          <input
            onChange={handleAddFile}
            label="Thumbnail"
            placeholder="Choose thumbnail"
            style={{ display: 'none' }}
            type="file"
            ref={refFile}
            accept="image/*"
          />
        </>
      )}
    </ButtonOutlined>
  );
};

export const UploadBtnWrapper = forwardRef(({ onChangeFile, children }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const refFile = useRef(null);

  const handleAddFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const url = await uploadImage(file);
      if (url) onChangeFile(url);
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    refFile.current.click();
  };

  useImperativeHandle(ref, () => ({
    click: handleClick,
  }));

  return (
    <>
      <input type="file" ref={refFile} style={{ display: 'none' }} onChange={handleAddFile} />
      {!isLoading && children}
      {isLoading && <CircularProgress size={18} />}
    </>
  );
});

export default UploadBtn;
