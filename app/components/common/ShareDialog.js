/**
 *
 * 分享弹出框组件
 *
 */

import React, {Component} from 'react';
import ShareButtons from '../../lib/Share';
import '../styles/shareDialog.scss';

export default class ShareDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {height: '100%'};
    };

    componentDidMount() {
        let _innerHeight = window.innerHeight;
        this.setState({height: `${_innerHeight}px`});
    };

    render() {
        const {handleShareHide, subject, summary} = this.props;
        const {height} = this.state;
        return (
            <section className="ShareDialog" style={{height: height}}>
                <div className="shareDialogClose" onClick={handleShareHide}></div>
                <div className="shareDialogContainer">
                    <figure>
                        <div className="shareDialogContainerInner" onClick={handleShareHide}>
                            <ShareButtons sites={["qzone", "weibo"]} title={subject} site={subject} description={summary}
                                          image="https://www.xinrongnews.com/static/images/share_default.png" />
                            <div className="shareWebsitesTag"><span>QQ空间</span><span>微博</span></div>
                        </div>
                    </figure>
                    <div className="shareDialogCloseBtn" onClick={handleShareHide}><span>取消</span></div>
                </div>
            </section>
        );
    };
};