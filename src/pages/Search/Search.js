import React, {
    Component, createRef
} from 'react';
import {Icon} from "antd";
import axios from "axios";
import {detailUrl, selectUrl} from "../../queryUrl";
import './Search.less';
import MyItem from "../Main/MyItem/MyItem";
import TpoImg from "../../images/top_icon.png";

var hljs = require('highlight.js');
let md = require('markdown-it')({
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

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            content: "",
            list: [],
            contentWidth: "50%",
            showText: false,
            showBackTop: false
        };
        this.getList = this.getList.bind(this);
        this.getDetail = this.getDetail.bind(this);
        this.page = createRef();
        this.search_bar = createRef();
    }

    componentDidMount() {
        let that = this;
        document.body.onclick = function (e) {
            if (e.target === document.body || e.target.id === "root") {
                document.body.style.background = '#fff';
                that.setState({
                    showText: false,
                    content: "",
                    list: [],
                    value: "",
                    contentWidth: "50%"
                });
                that.page.current.classList.remove('top');
                that.page.current.classList.remove('shadow4');
                that.search_bar.current.style.width = "80%";
            }
        };


        window.addEventListener('scroll', function (e) {
            if (window.scrollY > 400) {
                console.log(1);
                that.setState({
                    showBackTop: true
                })
            } else {
                that.setState({
                    showBackTop: false
                })
            }
        })
    }

    getList(value) {
        axios.get(selectUrl(value)).then(res => {
            this.setState({
                list: res.data,
                showText: false
            })
        })
    }

    getDetail(title) {
        this.setState({
            list: [],
            content: '',
            showText: false
        });
        axios.get(detailUrl(title)).then(res => {
            this.setState({
                content: md.render(res.data.context),
                contentWidth: '60%'
            })
        })
    }

    componentWillUnmount() {
        md = null;
    }

    render() {
        let {value, content, list, showText, contentWidth, showBackTop} = this.state;
        return <div>
            <div className={"page_con"} ref={this.page}
                 style={{
                     width: contentWidth
                 }}
                 onClick={(event) => {
                     event.stopPropagation();
                     event.nativeEvent.stopImmediatePropagation();
                 }}
            >
                <div className="search_bar" ref={this.search_bar}>
                    <div className={"search_bar_icon"}>
                        <Icon type="search" style={{
                            color: "#ccc",
                            fontSize: "30px"
                        }}/>
                    </div>
                    <div className={"input_con"}>
                        <input
                            placeholder={"Search Now"}
                            type={"text"}
                            value={value}
                            onFocus={(e) => {
                                console.log('onfocus');
                                this.setState({
                                    layerShow: true,
                                    fixSearchBar: true,
                                    isBgGrey: true,
                                });
                                if (content === "" && list.length === 0) {
                                    this.setState({
                                        showText: true
                                    })
                                }
                                this.page.current.classList.add('top');
                                this.page.current.classList.add('shadow4');
                                this.search_bar.current.style.width = "100%";
                                document.body.style.background = '#edeced'

                            }}

                            onChange={(event) => {
                                let value = event.currentTarget.value;
                                this.setState({
                                    value: value,
                                    content: "",
                                    contentWidth: "50%",
                                    list: []
                                });
                                if (value === "") {
                                    this.setState({showText: true})
                                } else {
                                    this.getList(value);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="text animated"
                     style={{
                         display: showText ? "block" : "none"
                     }}
                >
                    Quickly switch to command
                </div>

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
            <div className={"third_back_top"}>
                <div
                    className={'back_top_content'}
                    style={{
                        transform: showBackTop ? 'scale(1)' : 'scale(0)'
                    }}
                    onClick={() => {
                        let scrollTpo = window.scrollY;
                        Math.animation(scrollTpo, 0, function (value) {
                            window.scrollTo(0, value);
                        }, 'Back.easeInOut', 500);
                    }}>
                    <img src={TpoImg} className={"top_icon"}/>
                </div>
            </div>
        </div>
    }
}

export default Search;
