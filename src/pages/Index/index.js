import React, {Component, useState} from "react";
import axios from 'axios';
import {Row, Col, Select, Spin} from "antd";
import LinuxLogo from '../../images/linux_logo.svg';
import {selectUrl, detailUrl} from "../../queryUrl";
import './index.less';

var hljs = require('highlight.js');

const {Option} = Select;
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlightAuto(str).value +
                    // hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {
            }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

function Index() {
    const [searchInput, setSearchInput] = useState('');
    const [resultList, setResultList] = useState([]);
    const [showResultList, setShowResultList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');


    return (
        <div>
            <Row type={"flex"} justify={"center"} align={"middle"} style={{
                marginBottom: '30px'
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
                <Col xs={18} sm={14} md={14} lg={12} xl={8}>
                    <Select
                        autoFocus={true}
                        defaultActiveFirstOption={true}
                        value={searchInput}
                        showArrow={false}
                        showSearch={true} //使单选模式可搜索
                        size={"large"}
                        placeholder="输入"
                        notFoundContent={showResultList ? <Spin size="small"/> : null}
                        filterOption={false}
                        onSearch={(value) => {
                            // 文本框值变化时回调
                            console.log('onSearch', value);
                            setSearchInput(value);
                            setLoading(true);
                            if (value !== "") {
                                axios.get(selectUrl(value)).then(res => {
                                    setResultList(res.data);
                                    setLoading(false)
                                })
                            }
                        }}

                        //被选中时调用，参数为选中项的 value (或 key) 值
                        onSelect={(value, option) => {
                            console.log(value, option);
                            console.log('onSelect');
                            if (option) {
                                let __value = option.props.value.replace('<span>', "").replace("</span>", "");
                                setSearchInput(option.props.title);
                                axios.get(detailUrl(option.props.title)).then(res => {
                                    setContent(md.render(res.data.context))
                                })
                            } else {
                                setSearchInput(value)
                            }
                        }}
                        //选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
                        onChange={(value, option) => {
                            console.log(value, 'onChange');
                            if (option) {
                                let __value = option.props.value.replace('<span>', "").replace("</span>", "");
                                setSearchInput(__value);
                            } else {

                            }
                            setResultList([])
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
            </Row>

            {/*搜索详情*/}
            <Row type={"flex"} justify={"center"} align={"middle"}>
                <Col xs={24} sm={24} md={16} lg={14} xl={14}>
                    <div className={"markdown-body"} dangerouslySetInnerHTML={{__html: content}}>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Index;
