// @ts-ignore
import { listInterfaceInfoVOByPageUsingPOST } from '@/services/api-backend/interfaceInfoController';
// @ts-ignore
import EmailModal from '@/pages/Account/Center/components/EmailModal';
import OpenModel from '@/pages/Account/Center/components/OpenModal';
import SendInvite from '@/pages/Account/Center/components/SendInvite';
import {deleteAllCallRecordUsingPOST, getCallRecordListUsingPOST} from '@/services/api-backend/callRecordController';
import {
  dayAttendanceUsingGET,
  updateMyUserUsingPOST,
  updateMyVoucherUsingGET,
} from '@/services/api-backend/userController';
import { history } from '@@/core/history';
import { EditOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { GridContent } from '@ant-design/pro-layout';
import { useModel } from '@umijs/max';
import { Button, Card, Col, Descriptions, Divider, Row, Tooltip, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import HistoryList from "@/pages/Account/Center/components/HistoryList";

const { Paragraph } = Typography;

export const valueLength = (val: any) => {
  return val && val.trim().length > 0;
};

const Index: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [data, setData] = useState<API.CallRecordVO[]>([]);
  const [userName, setUserName] = useState<string | undefined>('');
  const [dayAttendanceLoading, setDayAttendanceLoading] = useState<boolean>(false);
  const [voucherLoading, setVoucherLoading] = useState<boolean>(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const loginUser = initialState?.currentUser || {};

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const updateUserInfo = async () => {
    try {
      const res = await updateMyUserUsingPOST({
        userName: userName,
      });
      if (res.data && res.code === 0) {
        await fetchUserInfo();
        message.success(`信息更新成功`);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const dayAttendance = async () => {
    setDayAttendanceLoading(true);
    try {
      const res = await dayAttendanceUsingGET();
      if (res.data) {
        await fetchUserInfo();
        message.success('签到成功');
      }
      setTimeout(() => {
        setDayAttendanceLoading(false);
      }, 1000);
    } catch (error: any) {
      message.error(error.message);
      setDayAttendanceLoading(false);
    }
  };
  const updateVoucher = async () => {
    setVoucherLoading(true);
    try {
      const res = await updateMyVoucherUsingGET();
      if (res.data) {
        await fetchUserInfo();
        message.success('修改成功');
      }
      setTimeout(() => {
        setVoucherLoading(false);
      }, 1000);
    } catch (error: any) {
      message.error(error.message);
      setVoucherLoading(false);
    }
  };

  const loadHistoryList = async () => {
    try {
      const res = await getCallRecordListUsingPOST({});
      if (res.code === 0 && res.data) {
        setData(res.data);
      }
    } catch (error: any) {
      message.error('数据加载失败,' + error.message);
    }
  };

  const deleteHistoryList = async () => {
    try {
      const res = await deleteAllCallRecordUsingPOST({});
      if (res.data) {
        await loadHistoryList();
        message.success('删除成功');
      }
      setTimeout(() => {}, 1000);
    } catch (error: any) {
      message.error(error.message);
    }
  };



  const loadData = async () => {
    fetchUserInfo();
    try {
      await listInterfaceInfoVOByPageUsingPOST({});
      return true;
    } catch (error: any) {
      message.error('数据加载失败,' + error.message);
      return false;
    }
  };

  useEffect(() => {
    loadData();
    loadHistoryList();
  }, []);

  return (
    <>
      <GridContent>
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 16,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <strong>🙎‍♂️ 个人信息</strong>
                </div>
                <Button size={'small'} onClick={updateUserInfo}>
                  保存
                </Button>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img
                  alt=""
                  style={{
                    width: 104,
                    height: 104,
                    marginBottom: 20,
                  }}
                  src={loginUser.avatar}
                />
                <Paragraph
                  style={{
                    marginBottom: 20,
                    fontWeight: 50,
                    fontSize: 20,
                    lineHeight: '28px',
                  }}
                  editable={{
                    icon: <EditOutlined />,
                    tooltip: '编辑',
                    onChange: (value) => {
                      setUserName(value);
                    },
                  }}
                >
                  {loginUser.userName}
                </Paragraph>
              </div>
              <Descriptions contentStyle={{ height: 20 }} column={1}>
                <div>
                  <h4>ID：</h4>
                  <Paragraph copyable={valueLength(loginUser?.id)}>{loginUser?.id}</Paragraph>
                </div>
                <div>
                  <Tooltip title={'邀请好友注册双方都可获得100积分'}>
                    <h4>邀请码：</h4>
                  </Tooltip>
                  <Paragraph copyable={valueLength(loginUser?.inviteCode)}>
                    {' '}
                    {loginUser.inviteCode}
                  </Paragraph>
                </div>
                <div>
                  <h4>我的邮箱：</h4>
                  <Paragraph copyable={valueLength(loginUser?.email)}>
                    {valueLength(loginUser?.email) ? (
                      <a
                        onClick={() => {
                          setOpenEmailModal(true);
                        }}
                      >
                        {loginUser?.email}
                      </a>
                    ) : (
                      <a onClick={() => {setOpenEmailModal(true);}}>未绑定邮箱</a>
                    )}
                  </Paragraph>
                </div>
              </Descriptions>
              <Divider style={{ marginTop: 16 }} dashed />
              <div>
                <div
                  style={{
                    fontSize: 16,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <strong>👛 我的钱包</strong>
                  </div>

                  <a
                    onClick={() => {
                      history.push('');
                    }}
                  >
                    💳 充值
                  </a>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <Tooltip title={'用于接口调用花费'}>
                    <strong>金币 💰：</strong>{' '}
                    <span style={{ color: 'red', fontSize: 18 }}>{loginUser.callCount}</span>
                    <br />
                  </Tooltip>
                </div>
                <strong>更多获取途径：</strong>
                <div
                  style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      setOpenInvite(true);
                    }}
                  >
                    📝 邀请注册{' '}
                  </Button>
                  <Button
                    loading={dayAttendanceLoading}
                    style={{ marginRight: 10 }}
                    type={'primary'}
                    onClick={dayAttendance}
                  >
                    📅 每日签到{' '}
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={16} md={24}>
            <ProCard
              bordered
              type="inner"
              title={<strong>开发者调用凭证</strong>}
              extra={
                <Button loading={voucherLoading} onClick={updateVoucher}>
                  {loginUser?.accessKey && loginUser?.secretKey ? '更新' : '生成'}凭证
                </Button>
              }
            >
              {loginUser?.accessKey && loginUser?.secretKey ? (
                <Descriptions column={1}>
                  <Descriptions.Item label="AccessKey">
                    <Paragraph copyable={valueLength(loginUser?.accessKey)}>
                      {loginUser?.accessKey}
                    </Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label="SecretKey">
                    <Paragraph copyable={valueLength(loginUser?.secretKey)}>
                      {loginUser?.secretKey}
                    </Paragraph>
                  </Descriptions.Item>
                </Descriptions>
              ) : (
                '暂无凭证,请先生成凭证'
              )}
            </ProCard>

            <ProCard
              bordered
              type="inner"
              title={<strong>调用历史记录</strong>}
              style={{ marginTop: 20 }}
              extra={
                <OpenModel
                  buttonName="删除全部"
                  title="提示"
                  contents="你确定要删除全部的调用记录吗"
                  onClick={deleteHistoryList}
                />
              }
            >
              <HistoryList data={data}></HistoryList>
            </ProCard>
          </Col>
        </Row>
      </GridContent>
      <SendInvite
        invitationCode={loginUser?.inviteCode}
        onCancel={() => {
          setOpenInvite(false);
        }}
        open={openInvite}
      />

      <EmailModal
        data={loginUser}
        onCancel={() => setOpenEmailModal(false)}
        open={openEmailModal}
      />
    </>
  );
};
export default Index;
