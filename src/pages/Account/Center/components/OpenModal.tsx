import { Button, Modal } from 'antd';
import React, { useState } from 'react';

export type Props = {
  buttonName?: string;
  title?: string;
  contents?: string;
  onClick?: () => void;
};

const OpenModel: React.FC<Props> = (props) => {
  const { buttonName, title, contents ,onClick} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onClick?.();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonName}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        mousePosition={{ x: 300, y: 300 }}
      >
        <p>{contents}</p>
      </Modal>
    </>
  );
};

export default OpenModel;
