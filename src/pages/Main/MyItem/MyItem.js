import React, {Component} from 'react';
import './MyItem.less'

class MyItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {title, data, bindDetail} = this.props;
        return (
            <div className={'list_item'} onClick={() => {
                bindDetail(title)
            }}>
                <p><strong> {title}</strong></p>
                <p dangerouslySetInnerHTML={{__html: data}}/>
            </div>
        )
    }


}

export default MyItem;
