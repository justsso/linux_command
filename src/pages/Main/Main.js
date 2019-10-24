import React, {Component} from 'react';
import {Col, Icon} from "antd";
import clsx from "clsx";
import './Main.less';
import MyItem from "./MyItem/MyItem";
import axios from 'axios';
import {selectUrl, detailUrl} from "../../queryUrl";

var hljs = require('highlight.js');
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


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: "",
            layerShow: false,
            fixSearchBar: false,
            contentThen: false,
            list: [],
            value: "",
            isBgGrey: false,
            contentWidth: '50%'
        };

        this.closeAll = this.closeAll.bind(this);
        this.getDetail = this.getDetail.bind(this);
    }

    componentDidMount() {
    }

    closeAll() {
        this.setState({
            layerShow: false,
            fixSearchBar: false,
            isBgGrey: false,
            value: "",
            list: [],
            content: ""
            // contentThen: false
        })
    }

    getDetail(title) {
        this.setState({
            list: [],
            content: '',
        });
        axios.get(detailUrl(title)).then(res => {
            this.setState({
                content: md.render(res.data.context),
                contentWidth: '60%'
            })
        })
    }

    render() {
        let {layerShow, fixSearchBar, contentThen, list, value, isBgGrey, content, contentWidth} = this.state;
        return (
            <div className={'container'}
                 style={{
                     background: isBgGrey ? '#ededed' : '#fff',
                     transition: 'all .4s ease'
                 }}
                 onClick={(e) => {
                     console.log(e.target, 50);
                     console.log(e.target.className === "container", 37);
                     if (e.target.className === "container") {
                         this.closeAll();
                     }
                     // e.stopPropagation();
                 }}
            >
                <div className={clsx(
                    {
                        content: true,
                        content_then: contentThen,
                    }
                )}
                     style={{
                         width: contentWidth,
                         transition: 'width .5s ease'
                     }}
                >
                    <div className={clsx(
                        {
                            layer: true,
                            shadow4: true,
                            md_radio: true,
                            my_fadeIn: layerShow
                        }
                    )}>

                        <div className="list">
                            {
                                list.map((item, index) => {
                                    return <MyItem title={item.title} data={item.data} key={index}
                                                   bindDetail={this.getDetail}
                                    />
                                })
                            }
                        </div>

                        <div className="command_detail">
                            <div className={"markdown-body"} dangerouslySetInnerHTML={{__html: content}}>
                            </div>
                        </div>
                    </div>
                    <div className={clsx({
                        search_bar: true, md_radio: true,
                        fix_search_bar: fixSearchBar
                    })}>
                        <div className={"search_bar_icon"}>
                            <Icon type="search" style={{
                                color: "#ccc",
                                fontSize: "30px"
                            }}/>
                        </div>
                        <div style={{flex: 1}}>
                            <input placeholder={"Quick Access"}
                                   type={"text"}
                                   value={value}
                                   onFocus={(e) => {
                                       console.log('onfocus');
                                       this.setState({
                                           layerShow: true,
                                           fixSearchBar: true,
                                           isBgGrey: true
                                       })
                                   }}

                                   onChange={(event) => {
                                       let value = event.currentTarget.value;
                                       this.setState({
                                           value: value,
                                           content: "",
                                           contentWidth: "50%"
                                       });
                                       axios.get(selectUrl(value)).then(res => {
                                           this.setState({
                                               list: res.data
                                           })
                                       })
                                   }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
