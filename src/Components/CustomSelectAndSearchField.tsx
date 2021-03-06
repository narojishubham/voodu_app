import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { GetCategoriesResponseType } from "../Shared/Redux/Actions/brand/category/getCategory.action";
import { useAppDispatch } from "../Shared/Redux/store";

interface ISearchProps {
    getData: any;
    responseMapper?: (e: any) => any;
    onChange?: (e: any) => void;
    allowClear?: boolean;
    labelInValue?: boolean;
}

function CustomSelectAndSearchField(props: ISearchProps) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const {
        getData,
        responseMapper = (e: any) => e.data,
        allowClear = true,
        onChange = () => {},
        labelInValue = false,
    } = props;

    const [selectedData, setSelectedData] = useState("");

    // const getData = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await dispatch(getDataService()).then(responseMapper);
    //         console.log("CustomSearch component res", res);
    //         setData(res);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error("CustomSearch Error", error);
    //         setLoading(false);
    //     }
    // };
    const onChangeHandler = (e: any) => {
        onChange && onChange(e);
        setSelectedData(e);
    };

    const onSearch = () => {};

    useEffect(() => {
        //     getData();
        console.log({ getData: getData });
    }, []);

    return (
        <Select
            value={selectedData}
            loading={loading}
            showSearch
            // placeholder={"Category"}
            allowClear={allowClear}
            onSearch={onSearch}
            labelInValue={labelInValue}
            onChange={onChangeHandler}
            dropdownStyle={{
                display: getData.length === 0 ? "none" : "",
            }}
        >
            {getData?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
}

export default CustomSelectAndSearchField;
