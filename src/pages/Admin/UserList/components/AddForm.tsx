import {
DrawerForm,
ProForm,
ProFormSelect,
ProFormText
} from '@ant-design/pro-components';
import '@umijs/max';
export type Props = {
  onCancel: () => void;
  onSubmit: (values: API.UserAddRequest) => Promise<void>;
  AddModalOpen: boolean;
};
const AddForm: React.FC<Props> = (props) => {
  const { AddModalOpen, onSubmit, onCancel } = props;
  return (
    <DrawerForm<API.UserAddRequest>
      open={AddModalOpen}
      title="新建用户"
      resize={{
        onResize() {
          console.log('resize!');
        },
        maxWidth: window.innerWidth * 0.8,
        minWidth: 800,
      }}
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
export default AddForm;
