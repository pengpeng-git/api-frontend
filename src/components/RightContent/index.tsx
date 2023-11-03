import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import {Button} from "antd";

export type SiderTheme = 'light' | 'dark';

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <Button
        size={'small'}
        style={{  backgroundColor: 'rgb(0,148,254)', color: 'white' }}
      >
        下载SDK
      </Button>

    </div>
  );
};
