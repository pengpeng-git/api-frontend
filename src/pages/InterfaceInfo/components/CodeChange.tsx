
/**
 * 返回示例
 */
export const returnExample =
  '{\n' + '    "code": 0,\n' + '    "data": {} ,\n' + '    "message": "ok"\n' + '}';


export const changeParams = (params?: [API.ResponseParamsField]) => {
  if (!params || params.length <= 0) {
    return returnExample;
  }
  const result = {};
  const codeObj = {};
  const messageObj = {};
  params.forEach((param) => {
    // @ts-ignore
    const keys = param.paramName.split('.');
    // @ts-ignore
    let currentObj;
    if (keys[0] === 'code') {
      currentObj = codeObj;
    } else if (keys[0] === 'message') {
      currentObj = messageObj;
    } else {
      currentObj = result;
    }
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        if (param.paramType === 'int' && key === 'code') {
          // @ts-ignore
          currentObj[key] = 0;
        } else {
          // @ts-ignore
          currentObj[key] = param.description || '';
        }
      } else {
        // @ts-ignore
        currentObj[key] = currentObj[key] || {};
        // @ts-ignore
        currentObj = currentObj[key];
      }
    });
  });
  // @ts-ignore
  const mergedResult = { code: codeObj.code, ...result, message: messageObj.message };
  return JSON.stringify(mergedResult, null, 2);
};
