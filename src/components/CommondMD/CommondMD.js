import React, {Component} from 'react';
import './CommonMD.less';
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

function CommondMD(props) {
    let content = md.render(props.content);

    return (
        <div className={"markdown-body"} dangerouslySetInnerHTML={{__html: content}}>
        </div>
    )
}

export default CommondMD;
