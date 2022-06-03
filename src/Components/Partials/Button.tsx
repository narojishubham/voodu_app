import React from 'react';
import {Button as AntButton, ButtonProps} from 'antd';

const Button = (props: ButtonProps) => {
  return (
        <AntButton
            type="primary"
            // htmlType="submit"
            size="middle"
            block
            {...props}
            className={`gButton gBoxShadow ${props.className}`}
            style={{
              background: props.type === "default"? "#fff": "#f2994a",
              color: props.type === "default"? "#f2994a": "#fff",
              border: props.type === "default"? "1px solid #f2994a": "none",
              ...props.style
            }}
        >
          {props.children}
        </AntButton>
  );
};

export default Button;
