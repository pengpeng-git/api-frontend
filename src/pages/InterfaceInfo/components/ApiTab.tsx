import CodeView from "@/components/CodeEdit";
import { changeParams} from "@/pages/InterfaceInfo/components/CodeChange";
import {Table} from "antd";

import { Column } from "rc-table";
import React from 'react';

export type Props = {
  requestParams?:[API.RequestParamsField];
  responseParams?:[API.ResponseParamsField];
};

const ApiTeb: React.FC<Props> = (props) => {
  const { requestParams,responseParams } = props;

  return <>
    <p className="highlightLine" style={{ marginTop: 25 }}>
      请求参数:
    </p>

    <Table dataSource={requestParams}
           pagination={false}
           style={{maxWidth: 800}} size={"small"}>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Column title="参数名称" dataIndex="paramName" key="paramName"/>
      <Column title="类型" dataIndex="paramType" key="paramType"/>
      <Column title="描述" dataIndex="description" key="description"/>
      <Column title="是否必须" dataIndex="isMust" key="isMust"/>
    </Table>
    <p className="highlightLine" style={{ marginTop: 25 }}>
      响应参数:
    </p>
    <Table dataSource={responseParams}
           pagination={false}
           style={{maxWidth: 800}}
           size={"small"}>
      <Column title="参数名称" dataIndex="paramName" key="paramName"/>
      <Column title="类型" dataIndex="paramType" key="paramType"/>
      <Column title="描述" dataIndex="description" key="description"/>
    </Table>
    <p className="highlightLine" style={{ marginTop: 25 }}>
      返回示例:
    </p>
    <CodeView read={true} minHeight={200} value={changeParams(responseParams)}></CodeView>
  </>
};
export default ApiTeb;
