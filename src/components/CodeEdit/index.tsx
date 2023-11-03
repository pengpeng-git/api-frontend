// 核心组件
import AceEditor from 'react-ace';
// 引入对应的语言
import 'ace-builds/src-noconflict/mode-json';
//以下import的是风格
import 'ace-builds/src-noconflict/theme-github';
// 代码提示
import 'ace-builds/src-noconflict/ext-language_tools';
import React, { useEffect, useState } from 'react';

export type Props = {
  value?: any;
  read?: boolean;
  minHeight?: number;
  onChange?: (newValue: any) => void;
};

const CodeView: React.FC<Props> = (props) => {
  const { value, minHeight, read, onChange } = props;
  const [codeValue, setCodeValue] = useState<string>(value);

  const style = {
    width: '100%',
    height: '100%',
    minHeight: `${minHeight}px`,
  };
  //判断是不是json字符串
  const isJsonStr = (str: string) => {
    try {
      const obj = JSON.parse(str);
      return !!(typeof obj === 'object' && obj);
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    try {
      if (isJsonStr(value)) {
        const jsonObj = JSON.parse(value);
        const map = new Map();
        for (const k of Object.keys(jsonObj)) {
          map.set(k, jsonObj[k]);
        }
        const formattedJson = JSON.stringify(Object.fromEntries(map), null, 2);
        // @ts-ignore
        setCodeValue(formattedJson);
      } else {
        const formattedJson = JSON.stringify(value, null, 2);
        // @ts-ignore
        setCodeValue(formattedJson);
      }
    } catch (error) {
      console.error('Invalid JSON format');
    }
  }, [value]);

  return (
    <div>
      <AceEditor
        fontSize={16}
        style={style}
        readOnly={read}
        mode="json"
        theme="github"
        value={codeValue}
        onChange={onChange}
        setOptions={{
          // 基础的自动完成
          enableBasicAutocompletion: true,
          // 实时自动完成
          enableLiveAutocompletion: true,
          // 代码块
          enableSnippets: true,
          // 显示行号
          showLineNumbers: true,
          // tab键两个空格
          tabSize: 2,
        }}
      />
    </div>
  );
};
export default CodeView;
