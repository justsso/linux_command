import React, {Component, createRef} from 'react';
import clsx from "clsx";
import './Home.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.home = createRef();
        this.state = {
            playing: false,
            show: false,
            out: false
        }
    }

    componentDidMount() {

    }

    render() {
        let {playing, show, out} = this.state;
        return (
            <div onClick={(event) => {
                console.log(event, 17);
                // this.home.current.classList.remove('my_fadeIn');
                // this.home.current.classList.add('my_fadeOut')
                this.setState({
                    show: false,
                    out: true
                })
            }}>
                <div
                    className={clsx({
                        home: true,
                        animated: true,
                        fadeIn: show,
                        fadeOut: out,
                        slow: true
                    })}
                    ref={this.home}
                    onClick={(event) => {
                        console.log(event, 24);
                        event.stopPropagation();
                        // this.home.current.classList.remove('my_fadeOut');
                        // this.home.current.classList.add('my_fadeIn')
                        this.setState({
                            show: true,
                            out: false
                        }, () => {
                            console.log(this.state)
                        })
                    }}
                >
                    Home
                </div>
                <div className={"green_heart heartBeat animated slow"}>
                    Heart
                </div>
            </div>
        );
    }

}

export default Home;
