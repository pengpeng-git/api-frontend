import { Table } from 'antd';
import { Column } from 'rc-table';
import '../index.less';

const ErrorTeb: React.FC = () => {
  const errorCode = [
    {
      code: 0,
      name: 'SUCCESS',
      des: 'ok',
    },
    {
      code: 40000,
      name: 'PARAMS_ERROR',
      des: '请求参数错误',
    },
    {
      code: 40101,
      name: 'NO_AUTH_ERROR',
      des: '无权限',
    },
    {
      code: 40300,
      name: 'FORBIDDEN_ERROR',
      des: '禁止访问',
    },
    {
      code: 40400,
      name: 'NOT_FOUND_ERROR',
      des: '请求数据不存在',
    },
    {
      code: 50000,
      name: 'SYSTEM_ERROR',
      des: '系统内部异常',
    },
    {
      code: 50001,
      name: 'OPERATION_ERROR',
      des: '操作失败',
    },
  ];
  return (
    <>
      <p className="highlightLine">错误码：</p>

      <Table dataSource={errorCode} pagination={false} style={{ maxWidth: 800 }} size={'small'}>
        <Column title="参数名称" dataIndex="name" key="name" />
        <Column title="错误码" dataIndex="code" key="code" />
        <Column title="描述" dataIndex="des" key="des" />
      </Table>
    </>
  );
};
export default ErrorTeb;
