/**
 *
 * 社交分享组件
 *
 */

import React, {Component, PropTypes} from 'react';
import './style/share.scss';

export default class ShareButtons extends Component {
    render() {
        let {sites, title, description, image, url, site} = this.props;
        let t = encodeURIComponent(title);
        let d = encodeURIComponent(description);
        let m = encodeURIComponent(image);
        let s = encodeURIComponent(site);

        const Interface = {
            qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${t}&desc=${d}&summary=${d}&site=${s}`,
            tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${t}&url=${url}&pic=${m}`,
            weibo: `http://service.weibo.com/share/share.php?url=${url}&title=${t}${d}&pic=${m}`,
            douban: `http://shuo.douban.com/!service/share?href=${url}&name=${t}&text=${d}&image=${m}&starid=0&aid=0&style=11`
        };

        let DOM = sites.map(site => {
            let className = `icon-${site} social-share-icon`
            return (
                <a className={className} href={Interface[site]} target="_blank" key={`share${site}`}></a>
            );
        });

        return(
            <div className="social-share">
                {DOM}
            </div>
        );
    };
};

ShareButtons.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    site: PropTypes.string,
    sites: PropTypes.array
};

function getMetaContentByName(name) {
    return (document.getElementsByName(name)[0] || 0).content;
};

/* eslint-disable */
let image = '';
let site = __SERVER__ ? '' : (getMetaContentByName('site') || getMetaContentByName('Site') || document.title);
let title = __SERVER__ ? '' : (getMetaContentByName('title') || getMetaContentByName('Title') || document.title);
let description = __SERVER__ ? '' : (getMetaContentByName('description') || getMetaContentByName('Description') || '');
let url = __SERVER__ ? '' : location.href;

ShareButtons.defaultProps = {
    url: url,
    title: title,
    description: description,
    image: image,
    site: site,
    sites: ['qzone', 'weibo', 'tencent', 'douban']
};