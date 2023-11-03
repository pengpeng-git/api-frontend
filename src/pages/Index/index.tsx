// @ts-ignore
import { listInterfaceInfoVOByPageUsingPOST } from '@/services/api-backend/interfaceInfoController';

import { Avatar, Card, Input, List, Tooltip, Typography, message } from 'antd';

import Meta from 'antd/es/card/Meta';
import { SearchProps } from 'antd/lib/input';

import { ShareAltOutlined } from '@ant-design/icons';

import { PageContainer } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { history } from 'umi';

const { Paragraph } = Typography;

// @ts-ignore
const CardInfo: React.FC<{
  title?: string;
  desc?: string;
  img?:string;
  number?: number;
  cost?:number
  src?: string;
}> = ({ title, desc,img, number,cost, src }) => (
  <Card
    hoverable
    style={{ width: 280, marginTop: 16 }}
    actions={[
      <Tooltip title="调用次数" key="share">
        🏆 {number}
      </Tooltip>,
      <Tooltip title="调用花费" key="share">
        💰 {cost}
      </Tooltip>,
      <Tooltip title="测试调用" key="share">
        <ShareAltOutlined
          style={{ fontSize: 16 }}
          onClick={() => {
            // @ts-ignore
            history.push(src);
          }}
        />
      </Tooltip>,
    ]}
  >
    <Meta
      avatar={
        <Avatar shape="square" src={img} />
      }
      title={title}
      description={<Paragraph ellipsis={true}>{desc}</Paragraph>}
    />
  </Card>
);

const Index: React.FC = () => {
  const [loading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfoVO[]>([]);

  const loadData = async (name: string) => {
    try {
      const rse = await listInterfaceInfoVOByPageUsingPOST({
        sortField: 'callCount',
        name,
      });
      setList(rse?.data?.records ?? []);
      return true;
    } catch (error: any) {
      message.error('数据加载失败,' + error.message);
      return false;
    }
  };
  const onSearch: SearchProps['onSearch'] = (name) => {
    loadData(name);
  };

  useEffect(() => {
    loadData('');
  }, []);
  return (
    <>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder="请输入想搜索的接口"
            enterButton="搜索"
            size="large"
            onSearch={onSearch}
            style={{ maxWidth: 722, width: '100%', marginTop: 10, marginBottom: 10 }}
          />
        </div>
      </Card>

      <PageContainer title={false}>
        <List<API.InterfaceInfoVO>
          rowKey="id"
          grid={{
            gutter: 16,
            column: 4,
            // xs: 1,
            // sm: 2,
            // md: 3,
            // lg: 3,
            // xl: 4,
            // xxl: 4,
          }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 12,
          }}
          style={{ minHeight: 200 }}
          loading={loading}
          dataSource={list}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <CardInfo
                title={item.name}
                img={item.img}
                desc={item.description}
                number={item.callCount}
                cost={item.callCost}
                src={`/interface-info/${item.id}`}
              />
            </List.Item>
          )}
        />
      </PageContainer>
    </>
  );
};

export default Index;
