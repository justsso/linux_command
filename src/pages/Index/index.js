import React, {Component, useState, useEffect} from "react";
import axios from 'axios';
import {Button, Layout, Row, Col, Input, List, Select, Spin, Typography, Divider} from "antd";
import debounce from 'lodash/debounce';
import LinuxLogo from '../../images/linux_logo.svg';
import {selectUrl, detailUrl} from "../../queryUrl";
import './index.less';

const {Header, Content, Footer} = Layout;
const {Search} = Input;
const {Option} = Select;
const {Text, Paragraph, Title} = Typography;

function Index() {
    const [searchInput, setSearchInput] = useState('');
    const [resultList, setResultList] = useState([]);
    const [showResultList, setShowResultList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    //每次渲染之后执行
    // useEffect(async () => {
    //     let res = await axios.get(selectUrl(searchInput));
    //     setResultList(res.data)
    // });

    return (
        <div>
            <Row type={"flex"} justify={"center"} align={"middle"} style={{
                marginBottom: '50px'
            }}>
                <Col>
                    <img src={LinuxLogo} alt="" className={'linux-logo'}/>
                </Col>
                <Col>
                    <h1>Linux</h1>
                </Col>
            </Row>
            {/*搜索框*/}
            <Row type={"flex"} justify={"center"} gutter={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1}}>
                <Col xs={18} sm={14} md={14} lg={8} xl={8}>
                    <Select
                        allowClear={true}
                        autoFocus={true}
                        value={searchInput}
                        showArrow={false}
                        showSearch={true} //使单选模式可搜索
                        size={"large"}
                        placeholder="输入"
                        notFoundContent={showResultList ? <Spin size="small"/> : null}
                        filterOption={false}
                        onInputKeyDown={(e) => {
                            console.log(e.keyCode, 67)
                            if (e.keyCode === 13) {
                                //回车键

                            }
                        }}
                        onSearch={(value) => {
                            // 文本框值变化时回调
                            console.log('onSearch', value);
                            setSearchInput(value);
                            setLoading(true);
                            axios.get(selectUrl(value)).then(res => {
                                setResultList(res.data);
                                setLoading(false)
                            })
                        }}

                        //被选中时调用，参数为选中项的 value (或 key) 值
                        onSelect={(value, option) => {
                            console.log(value, option);
                            console.log('onSelect');
                            if (option) {
                                let __value = option.props.value.replace('<span>', "").replace("</span>", "");
                                setSearchInput(option.props.title);
                                window.location.href = '/detail?title=' + option.props.title;
                            } else {
                                setSearchInput(value)
                            }

                        }}
                        onChange={(value, option) => {
                            console.log(value, 'onChange');
                            if (option) {
                                let __value = option.props.value.replace('<span>', "").replace("</span>", "");
                                setSearchInput(__value);
                            } else {

                            }
                            setResultList([])
                        }}
                        onBlur={() => {
                            setLoading(false)
                        }}
                        style={{width: '100%'}}
                        loading={loading}
                    >
                        {
                            resultList.map((item, index) => {
                                return <Option key={item.title}
                                               value={item.data}
                                               title={item.title}
                                >
                                    <p className={'my-option'} dangerouslySetInnerHTML={{
                                        __html: item.data
                                    }}>
                                    </p>
                                </Option>
                            })
                        }
                    </Select>
                    <p>* 通配符，全匹配</p>
                </Col>
                <Col xs={4} sm={2} md={2} lg={2} xl={2}>
                    <Button size={'large'} type={'primary'}>搜索</Button>
                </Col>
            </Row>
            {/*搜索列表*/}
            {/*<Row type={"flex"} justify={"center"}>*/}
            {/*    <Col xs={22} sm={14} md={14} lg={8} xl={8}>*/}
            {/*        <List*/}
            {/*            dataSource={resultList}*/}
            {/*            renderItem={(item, index) => {*/}
            {/*                return <List.Item*/}
            {/*                >*/}
            {/*                    <List.Item.Meta*/}
            {/*                        title={item.title}*/}
            {/*                        description={<div dangerouslySetInnerHTML={{__html: item.data}}></div>}*/}
            {/*                    >*/}
            {/*                        /!*{item.title}*!/*/}
            {/*                        /!*{item.data}*!/*/}
            {/*                    </List.Item.Meta>*/}
            {/*                </List.Item>*/}
            {/*            }}*/}
            {/*        >*/}
            {/*        </List>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*搜索详情*/}
            <Row>
                <Col>

                </Col>
            </Row>
        </div>
    )
}

export default Index;
