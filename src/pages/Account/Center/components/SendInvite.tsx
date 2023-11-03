import { SmileOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { Button, Modal, notification } from 'antd';
import { Input } from 'antd/lib';
import React from 'react';

export type Props = {
  open?: boolean;
  onCancel: () => void;
  invitationCode?: string;
};

const SendInvite: React.FC<Props> = (props) => {
  const { open, onCancel, invitationCode } = props;
  const [api, contextHolder] = notification.useNotification();

  const text =
    '接口开放平台为您提供稳定、安全、高效的接口调用服务！注册即送100金币💰奖励！快来领取吧！';
  const openNotification = () => {
    navigator.clipboard.writeText(text + window.location.origin + '/' + invitationCode);
    api.open({
      message: '复制成功,快分享给好友吧',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  return (
    <Modal footer={null} centered open={open} width={800} onCancel={onCancel}>
      <ProCard direction={'column'}>
        <ProCard layout={'center'}>
          <div style={{ fontSize: 18, marginTop: -15 }}>邀请奖励</div>
        </ProCard>
        <ProCard>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <div style={{ marginRight: '20px', fontWeight: 'bold' }}>
              每邀请一个用户注册，您和被邀请者都会获得 “<strong>100金币 </strong>💰奖励”
            </div>
          </div>
        </ProCard>
        <ProCard layout={'center'}>
          <Input.TextArea
            style={{
              resize: 'none',
              height: 60,
              backgroundColor: 'rgba(0,254,224,0.06)',
              marginTop: -15,
            }}
            value={text + window.location.origin + '    邀请码：' + invitationCode}
          ></Input.TextArea>
        </ProCard>
        <ProCard layout={'center'}>
          {contextHolder}
          <Button
            size={'large'}
            style={{ marginTop: -15, backgroundColor: 'rgb(0,148,254)', color: 'white' }}
            onClick={() => openNotification()}
          >
            复制邀请文案链接
          </Button>
        </ProCard>
        <ProCard layout={'center'}>{contextHolder}</ProCard>
      </ProCard>
    </Modal>
  );
};

export default SendInvite;
