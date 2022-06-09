import React, {ChangeEvent, useState} from 'react';
import {Input, Row, Col, Space, InputProps, ButtonProps} from 'antd';
import Button from "./Button";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchBoxPropsTypes {
  onClickCallback?:(value: string)=> void;
  onInputChangeCallback?:(value: string)=> void;
  loading?:boolean;
  buttonText?: string;
  disabled?:boolean;
  icon?:boolean;
  iconOnly?:boolean;
  inputProps?: InputProps;
  buttonProps?: ButtonProps;
}

const SearchBox = (
    {
      onClickCallback=(()=>{}),
      onInputChangeCallback=(()=>{}),
      loading=false,
      buttonText="Search",
      disabled=false,
      icon=true,
      iconOnly=false,
      inputProps,
      buttonProps,
}:SearchBoxPropsTypes) => {

  const [searchText, setSearchText] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onInputChangeCallback(e.target.value);
  }
  const handleButtonClick = () => {
    onClickCallback(searchText);
  }

  return (
      <div className={"gBoxShadow"} style={{ borderRadius: "0.5rem" }}>
        <Row wrap={false}>
          <Col flex="auto">
            <Input
                disabled={disabled}
                placeholder="search..."
                allowClear
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={(e)=> {
                  if (e.key === 'Enter') handleButtonClick()
                }}
                style={{ borderRadius: "0.5rem 0 0 0.5rem", ...inputProps?.style }}
                {...inputProps}/>
          </Col>
          <Col>
            <Button
                disabled={disabled}
                onClick={handleButtonClick}
                loading={loading}
                style={{
                  borderRadius: "0 0.5rem 0.5rem 0",
                  boxShadow: "none",
                  ...buttonProps?.style,
                  }}
                {...buttonProps}
            >
               <Space size={4}>
                 {
                   icon ? <FontAwesomeIcon icon={faSearch} size={"1x"} /> : null
                 }
                 { !iconOnly ? buttonText : null }
               </Space>
            </Button>
          </Col>
        </Row>
      </ div>
  );
};

export default SearchBox;
