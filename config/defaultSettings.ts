import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'TT API接口平台',
  pwa: false,
  logo: 'https://paopao-img-1320034963.cos.ap-beijing.myqcloud.com/images/TT_api.png',
  iconfontUrl: '',
  token: {
    header: {
      heightLayoutHeader: 65,
      colorTextMenuSelected: '#4391FF',
    },
    pageContainer: {
      paddingInlinePageContainerContent: 0,
    },
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
  splitMenus: false,
};

export default Settings;
