// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deleteAllCallRecord POST /api/callRecord/delete */
export async function deleteAllCallRecordUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/api/callRecord/delete', {
    method: 'POST',
    ...(options || {}),
  });
}

/** getCallRecordList POST /api/callRecord/list */
export async function getCallRecordListUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCallRecordVO>('/api/callRecord/list', {
    method: 'POST',
    ...(options || {}),
  });
}
