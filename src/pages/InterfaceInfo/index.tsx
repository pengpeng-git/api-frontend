import ApiTeb from '@/pages/InterfaceInfo/components/ApiTab';
import { changeParams } from '@/pages/InterfaceInfo/components/CodeChange';
import ErrorTeb from '@/pages/InterfaceInfo/components/ErrorTab';
import TextTeb from '@/pages/InterfaceInfo/components/TextTab';
import { getInterfaceInfoVOByIdUsingGET } from '@/services/api-backend/interfaceInfoController';
import { useParams } from '@@/exports';
import { BugOutlined, FileTextOutlined, WarningOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Descriptions, message } from 'antd';
import React, { useEffect, useState } from 'react';

const A: React.FC = () => {
  return <div style={{ height: 20 }}></div>;
};

const Index: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO>();
  const [requestParams, setRequestParams] = useState<[API.RequestParamsField]>();
  const [responseParams, setResponseParams] = useState<[API.ResponseParamsField]>();
  const [activeTabKey, setActiveTabKey] = useState<string>('api');
  const params = useParams();

  const tabListTitle = [
    {
      key: 'api',
      label: (
        <>
          <FileTextOutlined />
          接口文档
        </>
      ),
    },
    {
      key: 'text',
      label: (
        <>
          <BugOutlined />
          测试调用
        </>
      ),
    },
    {
      key: 'error',
      label: (
        <>
          <WarningOutlined />
          错误码
        </>
      ),
    },
  ];

  const loadData = async () => {
    if (params.id === null) {
      message.error('数据加载失败');
      return false;
    }
    try {
      const res = await getInterfaceInfoVOByIdUsingGET({
        id: Number(params.id),
      });
      const newData = Object.assign({}, res.data);
      try {
        if (res.data?.method === 'GET') {
          newData.requestParams = JSON.parse(res.data?.requestParams as string);
        } else {
          newData.requestParams = changeParams(JSON.parse(res.data?.requestParams as string));
        }
      }catch (e: any){
        // @ts-ignore
        newData.requestParams=null;
      }
      setData(newData);
      let requestParams = res.data?.requestParams;
      let responseParams = res.data?.responseParams;
      try {
        setRequestParams(requestParams ? JSON.parse(requestParams) : []);
        setResponseParams(responseParams ? JSON.parse(responseParams) : []);
      } catch (e: any) {
        setRequestParams([{}]);
        setResponseParams([{}]);
      }
      return true;
    } catch (error: any) {
      message.error('数据加载失败,' + error.message);
      return false;
    }
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const contentListTitle: Record<string, React.ReactNode> = {
    api: <ApiTeb requestParams={requestParams} responseParams={responseParams} />,
    text: <TextTeb data={data}/>,
    error: <ErrorTeb />,
  };

  useEffect(() => {
    loadData();
  }, []);
  // @ts-ignore
  return (
    <PageContainer title={false}>
      <Card>
        <Descriptions title={data?.name}>
          <Descriptions.Item label="描述">{data?.description}</Descriptions.Item>
          <Descriptions.Item label="请求方法">{data?.method}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{data?.url}</Descriptions.Item>
          <Descriptions.Item label="调用花费">{data?.callCost} 💰</Descriptions.Item>
          <Descriptions.Item label="调用次数">{data?.callCount}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data?.createTime}</Descriptions.Item>
        </Descriptions>
      </Card>
      <A></A>
      <Card tabList={tabListTitle} activeTabKey={activeTabKey} onTabChange={onTabChange}>
        {contentListTitle[activeTabKey]}
      </Card>
    </PageContainer>
  );
};
export default Index;
