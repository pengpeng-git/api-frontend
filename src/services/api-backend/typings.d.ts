declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type BaseResponseInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO;
    message?: string;
  };

  type BaseResponseListCallRecordVO = {
    code?: number;
    data?: CallRecordVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    message?: string;
  };

  type BaseResponsePageInterfaceInfoVO = {
    code?: number;
    data?: PageInterfaceInfoVO;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type CallRecordVO = {
    callCost?: number;
    callCount?: number;
    createTime?: string;
    description?: string;
    id?: number;
    img?: string;
    lastCallTime?: string;
    method?: string;
    name?: string;
    requestParams?: string;
    responseParams?: string;
    status?: number;
    url?: string;
    userCallCount?: number;
    userId?: number;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getInterfaceInfoVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type IdRequest = {
    id?: number;
    ids?: number[];
  };

  type InterfaceInfo = {
    callCost?: number;
    callCount?: number;
    createTime?: string;
    description?: string;
    id?: number;
    img?: string;
    isDelete?: number;
    method?: string;
    name?: string;
    requestParams?: string;
    responseParams?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoAddRequest = {
    callCost?: number;
    description?: string;
    method?: string;
    name?: string;
    requestParams?: string;
    responseParams?: string;
    url?: string;
  };

  type InterfaceInfoInvokeRequest = {
    id?: number;
    requestParams?: string;
  };

  type InterfaceInfoQueryRequest = {
    callCost?: number;
    createTime?: string;
    current?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoUpdateRequest = {
    callCost?: number;
    description?: string;
    id?: number;
    method?: string;
    name?: string;
    requestParams?: string;
    responseParams?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoVO = {
    callCost?: number;
    callCount?: number;
    createTime?: string;
    description?: string;
    id?: number;
    img?: string;
    method?: string;
    name?: string;
    requestParams?: string;
    responseParams?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type LoginUserVO = {
    accessKey?: string;
    avatar?: string;
    callCount?: number;
    email?: string;
    id?: number;
    inviteCode?: string;
    profile?: string;
    role?: string;
    secretKey?: string;
    userName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageInterfaceInfo = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageInterfaceInfoVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfoVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    accessKey?: string;
    account?: string;
    avatar?: string;
    callCount?: number;
    createTime?: string;
    email?: string;
    id?: number;
    inviteCode?: string;
    isDelete?: number;
    password?: string;
    role?: string;
    secretKey?: string;
    updateTime?: string;
    userName?: string;
  };

  type UserAddRequest = {
    account?: string;
    avatar?: string;
    role?: string;
    userName?: string;
  };

  type UserLoginRequest = {
    account?: string;
    password?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    account?:string;
    pageSize?: number;
    role?: string;
    sortField?: string;
    sortOrder?: string;
    userName?: string;
  };

  type UserRegisterRequest = {
    account?: string;
    checkPassword?: string;
    password?: string;
  };

  type UserUpdateMyRequest = {
    avatar?: string;
    userName?: string;
  };

  type UserUpdateRequest = {
    avatar?: string;
    id?: number;
    account?:string;
    email?:string;
    role?: string;
    userName?: string;
  };

  type UserVO = {
    accessKey?: string;
    avatar?: string;
    account?:string;
    callCount?: number;
    createTime?: string;
    email?: string;
    id?: number;
    role?: string;
    secretKey?: string;
    userName?: string;
  };
  type RequestParamsField = {
    paramName?: string;
    paramType?: string;
    description?: string;
    isMust?: string;
  };

  type ResponseParamsField = {
    paramName?: string;
    paramType?: string;
    description?: string;
  };
}
