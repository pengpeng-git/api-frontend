import CodeView from '@/components/CodeEdit';
import { changeParams } from '@/pages/InterfaceInfo/components/CodeChange';
import { invokeInterfaceInfoUsingPOST } from '@/services/api-backend/interfaceInfoController';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Spin, message } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useState } from 'react';
import '../index.less';

export type Props = {
  data?: API.InterfaceInfoVO;
  loadData?:() => void;
};

const TextTeb: React.FC<Props> = (props) => {
  const { data } = props;
  const [result, setResult] = useState<any>();
  const [resultLoading, setResultLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [form] = Form.useForm();
  form.setFieldsValue(data);
  return (
    <>
      <Form
        form={form}
        className="form-input"
        scrollToFirstError
        onReset={() => {
          form.resetFields(['requestParams']);
        }}
        onFinish={async (values) => {
          try {
            setSearchLoading(true);
            if (data?.method === 'GET') {
              values.requestParams = changeParams(values.requestParams);
            }
            const res = await invokeInterfaceInfoUsingPOST({
              id: values.id,
              requestParams: values.requestParams,
            });
            message.success('请求成功');
            setResult(res);

            setResultLoading(false);
            setSearchLoading(false);
            return true;
          } catch (error: any) {
            message.error('请求失败,' + error.message);
            setResultLoading(false);
            setSearchLoading(false);
            return false;
          }
        }}
      >
        <Form.Item name="id" label="ID" hidden={true} />
        <Space.Compact
          style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}
        >
          <Button size={'large'} type="primary">
            {data?.method}
          </Button>
          <Search
            size={'large'}
            readOnly
            style={{ maxWidth: 600 }}
            value={data?.url}
            loading={searchLoading}
            enterButton="发送"
            onSearch={form.submit}
          />
        </Space.Compact>
        <p className="highlightLine" style={{ marginTop: 25 }}>
          请求参数设置：
        </p>
        {data?.method === 'POST' ? (
          <>
            <Form.Item name={'requestParams'}>
              <CodeView
                minHeight={150}
                onChange={(newValue: any) => form.setFieldsValue({ requestParams: newValue })}
              ></CodeView>
            </Form.Item>
            <Form.Item>
              <Space size="large" wrap>
                <Button type="primary" htmlType="reset" style={{ width: 80 }}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </>
        ) : (
          <Form.List name="requestParams">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'paramName']}
                    >
                      <Input placeholder="参数名" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                    >
                      <Input placeholder="参数值" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    style={{ width: 400 }}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加字段
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        )}
      </Form>
      <p className="highlightLine" style={{ marginTop: 25 }}>
        返回结果：
      </p>
      <Spin spinning={resultLoading}>
        <CodeView read={true} minHeight={300} value={result}></CodeView>
      </Spin>
    </>
  );
};
export default TextTeb;
