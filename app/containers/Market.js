/**
 *
 * 行情数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchNewsRange} from '../actions/actionTypes';
import NavigationBar from '../components/common/NavigationBar';
import MarketList from '../components/market/MarketList';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsRange.isFetching,
        items: state.postNewsRange.items,
        isAppDownLoad: state.postAppDownLoad.isHidden
    };
};

@connect(mapStateToProps)
export default class Market extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    constructor(props) {
        super(props);
        this.state = {
            catCode: this.props.location.pathname.split('/')[2],
            pathSwitch: this.props.location.pathname.split('/')[1]
        };
    };

    componentWillMount() {
        let {dispatch, items} = this.props;
        dispatch(fetchNewsRange(this.state.catCode, items));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname.split('/')[2] 
        !== nextProps.location.pathname.split('/')[2]) {
            let {dispatch, items} = this.props;
            let _catCode = nextProps.location.pathname.split('/')[2];
            dispatch(fetchNewsRange(_catCode, items));
            this.setState({
                catCode: _catCode,
                pathSwitch: nextProps.location.pathname.split('/')[1]
            });
        }
    };

    render() {
        const {
            children, 
            items, 
            isFetching, 
            dispatch, 
            isAppDownLoad
        } = this.props;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch} />
                <MarketList items={items}
                    isFetching={isFetching}
                    catCode={this.state.catCode} />
                {children}
                <AppDownloadBar dispatch={dispatch} 
                    isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};