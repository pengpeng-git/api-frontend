import { history } from '@@/core/history';
import { Avatar, List } from 'antd';

export type Props = {
  data?: API.CallRecordVO[];
};
const HistoryList: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 240,
        overflow: 'auto',
      }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar shape="square" src={item.img} />}
              title={
                <a
                  onClick={() => {
                    history.push(`/interface-info/${item.id}`);
                  }}
                >
                  {item.name}
                </a>
              }
              description={`最后调用：${item.lastCallTime}`}
            />
            <div>{item.userCallCount} 次</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default HistoryList;
