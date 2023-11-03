import {
  DrawerForm,
  ProForm, ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Form } from 'antd';
import React from 'react';
import {CloseCircleOutlined} from "@ant-design/icons";

export type UpdateFormProps = {
  values: API.InterfaceInfoUpdateRequest;
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoUpdateRequest) => Promise<void>;
  updateModalOpen: boolean;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { values, onCancel, onSubmit, updateModalOpen } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(values);
  return (
    <DrawerForm<API.InterfaceInfoUpdateRequest>
      open={updateModalOpen}
      title="修改接口信息"
      resize={{
        onResize() {
          console.log('resize!');
        },
        maxWidth: window.innerWidth * 0.8,
        minWidth: 800,
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
          name="name"
          width="md"
          label="接口名称"
          tooltip="最长为 24 位"
          placeholder="请输入接口名称"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="url"
          label="接口地址"
          placeholder="请输入接口地址"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="md"
          name="description"
          label="接口描述"
          placeholder="请输入接口描述"
        />
        <ProFormSelect
          rules={[
            {
              required: true,
            },
          ]}
          width="xs"
          valueEnum={{
            GET: 'GET',
            POST: 'POST',
            OTHERS: '其他',
          }}
          name="method"
          label="请求方法"
        />
        <ProFormText width="xs" name="callCost" label="调用花费" placeholder="调用花费" />
      </ProForm.Group>
      <ProFormTextArea name="requestParams"></ProFormTextArea>
      <ProFormTextArea name="responseParams"></ProFormTextArea>
      {/*<ProFormList*/}
      {/*  name="requestParams"*/}
      {/*  label="请求参数"*/}
      {/*  deleteIconProps={{*/}
      {/*    Icon: CloseCircleOutlined,*/}
      {/*    tooltipText: '不需要这行了',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <ProForm.Group key="group">*/}
      {/*    <ProFormText width="xs" name="paramName" placeholder="参数名" />*/}
      {/*    <ProFormText width="xs" name="paramType" placeholder="参数类型" />*/}
      {/*    <ProFormText width="sm" name="description" placeholder="描述" />*/}
      {/*    <ProFormSelect*/}
      {/*      width="xs"*/}
      {/*      valueEnum={{*/}
      {/*        必须: '必须',*/}
      {/*        可选: '可选',*/}
      {/*      }}*/}
      {/*      name="isMust"*/}
      {/*      placeholder="是否必须"*/}
      {/*    />*/}
      {/*  </ProForm.Group>*/}
      {/*</ProFormList>*/}
      {/*<ProFormList*/}
      {/*  name="responseParams"*/}
      {/*  label="响应参数"*/}
      {/*  deleteIconProps={{*/}
      {/*    Icon: CloseCircleOutlined,*/}
      {/*    tooltipText: '不需要这行了',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <ProForm.Group key="group">*/}
      {/*    <ProFormText width="xs" name="paramName" placeholder="参数名" />*/}
      {/*    <ProFormText width="xs" name="paramType" placeholder="参数类型" />*/}
      {/*    <ProFormText width="sm" name="description" placeholder="描述" />*/}
      {/*  </ProForm.Group>*/}
      {/*</ProFormList>*/}
    </DrawerForm>
  );
};
export default UpdateForm;
