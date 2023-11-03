import {
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Form } from 'antd';
import React from 'react';

export type UpdateFormProps = {
  values: API.UserUpdateRequest;
  onCancel: () => void;
  onSubmit: (values: API.UserUpdateRequest) => Promise<void>;
  updateModalOpen: boolean;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { values, onCancel, onSubmit, updateModalOpen } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(values);
  return (
    <DrawerForm<API.UserUpdateRequest>
      open={updateModalOpen}
      title="修改用户信息"
      resize={{
        onResize() {
          console.log('resize!');
        },
        maxWidth: window.innerWidth * 0.8,
        minWidth: 400,
      }}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
        onClose: () => onCancel?.(),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await onSubmit?.(values);
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText hidden={true} name="id"/>
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          name="userName"
          width="md"
          label="用户名"
          tooltip="最长为 10 位"
          placeholder="请输入用户名"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="account"
          label="账号"
          placeholder="请输入账号"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
        />
        <ProFormSelect
          rules={[
            {
              required: true,
            },
          ]}
          width="xs"
          valueEnum={{
            admin: '管理员',
            user: '用户',
          }}
          name="role"
          label="权限"
        />
        <ProFormText width="xs" name="callCount" label="调用次数"/>
      </ProForm.Group>
    </DrawerForm>
  );
};
export default UpdateForm;
