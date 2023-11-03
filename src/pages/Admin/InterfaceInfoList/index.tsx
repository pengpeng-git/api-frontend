import AddForm from '@/pages/Admin/InterfaceInfoList/components/AddForm';
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoVOByPageUsingPOST,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST,
} from '@/services/api-backend/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    await addInterfaceInfoUsingPOST({
      ...fields,
    });
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败,' + error.message);
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
  const hide = message.loading('正在修改');
  try {
    await updateInterfaceInfoUsingPOST({
      ...fields,
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('修改失败,' + error.message);
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleDelete = async (selectedRows: API.InterfaceInfoVO) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await deleteInterfaceInfoUsingPOST({
      id: selectedRows.id,
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('删除失败,' + error.message);
    return false;
  }
};
/**
 * @zh-CN 发布接口
 *
 * @param selectedRows
 */
const handleOnline = async (selectedRows: API.InterfaceInfoVO) => {
  const hide = message.loading('正在发布');
  if (!selectedRows) return true;

  try {
    await onlineInterfaceInfoUsingPOST({
      id: selectedRows.id,
    });
    hide();
    message.success('操作成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('操作失败,' + error.message);
    return false;
  }
};
/**
 * @zh-CN 下线接口
 *
 * @param selectedRows
 */
const handleOffline = async (selectedRows: API.InterfaceInfoVO) => {
  const hide = message.loading('正在下线');
  if (!selectedRows) return true;

  try {
    await offlineInterfaceInfoUsingPOST({
      id: selectedRows.id,
    });
    hide();
    message.success('操作成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('操作失败,' + error.message);
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 批量删除
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.InterfaceInfoVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await deleteInterfaceInfoUsingPOST({
      //ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('删除失败,' + error.message);
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: '调用花费',
      dataIndex: 'callCost',
      valueType: 'text',
    },
    {
      title: '调用次数',
      dataIndex: 'callCount',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);

            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.status === 0 ? (
          <a
            key="config"
            onClick={async () => {
              await handleOnline(record);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            发布
          </a>
        ) : (
          <a
            key="config"
            onClick={async () => {
              await handleOffline(record);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            下线
          </a>
        ),
        <a
          key="config"
          onClick={async () => {
            await handleDelete(record);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer title={false}>
      <ProTable<API.InterfaceInfoVO, API.PageParams>
        headerTitle={'接口信息表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, (string | number)[] | null>,
        ) => {
          const res = await listInterfaceInfoVOByPageUsingPOST({
            ...params,
            ...sort,
            ...filter,
          });
          if (res.data) {
            return {
              data: res.data.records || [],
              success: true,
              total: res.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <AddForm
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={async (values) => {
          values.requestParams = JSON.stringify(values?.requestParams);
          values.responseParams = JSON.stringify(values?.responseParams);
          const success = await handleAdd(values);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        AddModalOpen={createModalOpen}
      ></AddForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
