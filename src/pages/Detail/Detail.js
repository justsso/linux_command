import React, {Component, useState} from 'react';
import {Layout, Button, Row, Col, Typography, Divider, Select, Spin} from "antd";
import axios from "axios";
import {detailUrl} from "../../queryUrl";
import LinuxLogo from '../../images/linux_logo.svg';
import marked from 'marked';
import './Detail.less';
var hljs = require('highlight.js');


const ReactMarkdown = require('react-markdown')
const {Header, Content, Footer} = Layout;
const {Title, Paragraph, Text} = Typography;
const {Option} = Select;
const queryString = require('query-string');
const md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        console.log(str, lang);
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {
            }
        }

        return ''; // use external default escaping
    }
});

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            searchInput: '',
            resultList: []
        };
        this.getDetail = this.getDetail.bind(this);
        hljs.initHighlightingOnLoad();
    }

    componentWillMount() {

    }

    async componentDidMount() {
        const obj = queryString.parse(window.location.search);
        let title = obj.title;
        this.setState({
            title: title,
            searchInput: title
        });

        await this.getDetail(title);
    }

    async getDetail(title) {
        let res = await axios.get(detailUrl(title));
        if (res) {
            this.setState({
                content: md.render(res.data.context),
                title: res.data.title
            });
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
                        </Col>
                    </Row>
                </div>
                <div style={{
                    marginTop: '60px'
                }}>
                    <Typography>
                        {/*    <Paragraph>*/}
                        <div className={"markdown-body"} dangerouslySetInnerHTML={{__html: this.state.content}}/>
                        {/*<ReactMarkdown source={this.state.content} skipHtml={true}/>*/}
                        {/*</Paragraph>*/}
                    </Typography>
                    {/*<div*/}
                    {/*    id="content"*/}
                    {/*    className="article-detail"*/}
                    {/*    dangerouslySetInnerHTML={{*/}
                    {/*        __html: marked(this.state.content),*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
            </div>
        )
    }

}

export default Detail;
