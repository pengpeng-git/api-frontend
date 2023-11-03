import { Footer } from '@/components';
// @ts-ignore
import { userRegisterUsingPOST } from '@/services/api-backend/userController';
import { LinkOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history } from '@umijs/max';
import { Alert, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';

const RegisterMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Register: React.FC = () => {
  const [userRegisterState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册
      const res = await userRegisterUsingPOST({
        ...values,
      });
      console.log(res.message);
      if (res.code === 0) {
        const defaultRegisterSuccessMessage = '注册成功！';
        message.success(defaultRegisterSuccessMessage);
        history.push('/user/login');
        return;
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const { status, type: loginType } = userRegisterState;
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          size={'large'}
          logo={<img alt="logo" src="/logo.png" />}
          title="TT API接口平台"
          subTitle={'与TT一同构建出色的应用和创新的未来！'}
          initialValues={{
            autoRegister: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '用户注册',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <RegisterMessage content={'错误的用户名和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码确认是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="inviteCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LinkOutlined />,
                }}
                placeholder={'请输入邀请码,没有可不填'}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox
              initialValue={true}
              name="agreeToAnAgreement"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error('同意协议后才可以注册'));
                    }
                    return Promise.resolve();
                  },
                  required: true,
                }),
              ]}
            >
              同意并接受《
              <a target={'_blank'} rel="noreferrer">
                隐私协议
              </a>
              》《
              <a target={'_blank'} rel="noreferrer">
                用户协议
              </a>
              》
            </ProFormCheckbox>
            <Link style={{ float: 'left', marginBottom: 24 }} to="/user/login">
              <span>使用已有账户登录</span>
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
