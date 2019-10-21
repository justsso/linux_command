import React, {Component, useState} from "react";
import {Col, Row, Select} from "antd";
import LinuxLogo from "../../images/linux_logo.svg";
import axios from "axios";
import {selectUrl} from "../../queryUrl";

const queryString = require('query-string');

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            searchInput: '',
            resultList: [],
            loading: false
        };

        this.getList = this.getList.bind(this);
    }

    componentDidMount() {
        const obj = queryString.parse(window.location.search);
        let title = obj.title;
        this.setState({
            searchInput: title
        })

        this.getList(title);


    }

    //搜索列表
    async getList(value) {
        let res = await axios.get(selectUrl(value));
        if (res.data) {
            this.setState({
                resultList: res.data,
                loading: false
            })
        }
    }


    render() {
        let resultList = this.state.resultList;
        return (
            <div>
                <div className={'tpo_search_bar'}>
                    <Row type={'flex'}>
                        <Col>
                            <img src={LinuxLogo}/>
                        </Col>
                        <Col>
                            <h1>Linux</h1>
                        </Col>
                        <Col xs={22} sm={14} md={14} lg={8} xl={8} offset={1}>
                            <Select
                                allowClear={true}
                                value={this.state.searchInput}
                                showArrow={false}
                                showSearch={true} //使单选模式可搜索
                                size={"large"}
                                placeholder="输入"
                                filterOption={false}
                                style={{width: '100%'}}
                            >
                            </Select>
                        </Col>
                    </Row>
                    {/*搜索列表*/}
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={22} sm={14} md={14} lg={8} xl={8}>
                            <List
                                dataSource={resultList}
                                renderItem={(item, index) => {
                                    return <List.Item
                                    >
                                        <List.Item.Meta
                                            title={item.title}
                                            description={<div dangerouslySetInnerHTML={{__html: item.data}}/>}
                                        >
                                            {/*{item.title}*/}
                                            {/*{item.data}*/}
                                        </List.Item.Meta>
                                    </List.Item>
                                }}
                            >
                            </List>
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}

export default List;
