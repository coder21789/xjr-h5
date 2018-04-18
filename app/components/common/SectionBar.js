/**
 *
 * 子频道组件
 *
 */

import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import configSectionBar from '../../config/sectionBar';
import configLiveBar from '../../config/liveBar';
import configMarketBar from '../../config/marketBar';
import '../styles/sectionBar.scss';

export default class SectionBar extends Component {
    constructor(props) {
        super(props);
        this.state = {menuCode: this.props.menuCode};
    };

    componentDidMount() {
        const control = navigator.control || {};
        if (control.gesture) {
            control.gesture(false);
            console.log('UC');
        }
        this.setState({menuCode: this.props.menuCode});
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.menuCode !== nextProps.menuCode) {
            this.setState({menuCode: nextProps.menuCode});
        }
    };

    render() {
        return (
            <nav className="sectionBar">
                <NavList menuCode={this.state.menuCode} />
            </nav>
        );
    };
};

function NavList(props) {
    const _menuCode = props.menuCode;
    const _NavNews = <div className={props.menuCode}>
        <ul>
            <li key={configSectionBar.sectionBar[0].code}><IndexLink
                to={{
                    pathname: `${configSectionBar.sectionBar[0].code}`
                    /*query: { catId: sectionBar.code }*/
                }}
                activeClassName="activedSectionBar">{configSectionBar.sectionBar[0].name}
            </IndexLink></li>
            {(configSectionBar.sectionBar.slice(1)).map(sectionBar => (
                <li key={sectionBar.code}><Link
                    to={{
                        pathname: `${sectionBar.code}`
                    }}
                    activeClassName="activedSectionBar">{sectionBar.name}
                </Link></li>
            ))}
        </ul>
    </div>;
    const _NavZb = <div className={props.menuCode}>
        <ul>
            {(configLiveBar.liveBar).map(liveBar => (
                <li key={liveBar.code}><Link
                    to={{
                        pathname: `/zb/${liveBar.path}`
                    }}
                    activeClassName="activedSectionBar">{liveBar.name}
                </Link></li>
            ))}
        </ul>
    </div>;
    const _NavHq = <div className={props.menuCode}>
        <ul>
            {(configMarketBar.marketBar).map(marketBar => (
                <li key={marketBar.code}><Link
                    to={{
                        pathname: `/hq/${marketBar.code}`
                    }}
                    activeClassName="activedSectionBar">{marketBar.name}
                </Link></li>
            ))}
        </ul>
    </div>;

    /**
     * 顶部滚动导航定制
     * @params {_menuCode}
     */

    switch (_menuCode) {
        case 'cj':
        case 'qq':
        case 'gp':
        case 'wh':
        case 'jj':
        case 'qh':
        case 'lc':
        case '': return _NavNews;
        case 'zb': return _NavZb;
        case 'hq': return _NavHq;
        default: return null;
    }
};