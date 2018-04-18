/**
 *
 * 大画财经列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchNewsFinance} from '../actions/actionTypes';
import {touchOffsetParent} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import FinanceList from '../components/finance/FinanceList';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsFinance.isFetching,
        items: state.postNewsFinance.items,
        playload: state.postNewsFinance.playload,
        pageInfo: state.postNewsFinance.pageInfo,
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad,
        windowObject: state.postWindowObject.fontSize
    };
};

@connect(mapStateToProps)
export default class Finance extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        fetchTasks.push(
            dispatch(fetchNewsFinance(5, 1))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            pathSwitch: this.props.location.pathname.split('/')[1],
            isLoadMore: false
        };
    };

    /**
     * 滚动加载分页数据
     * @param e
     */

    loadMore(e) {
        this.setState({isLoadMore: true});        
        let {ratio} = touchOffsetParent.call(this, e);
        let {dispatch, playload, pageInfo} = this.props;
        let isLoadMoreStarted = (pageInfo.nextPage === ratio + 1) ? true : false;
        ratio && pageInfo.nextPage && isLoadMoreStarted && dispatch(fetchNewsFinance(5, pageInfo.nextPage, playload, ratio));
    };

    componentDidMount() {
        let {dispatch, isNodeLoad} = this.props;
        !isNodeLoad && dispatch(fetchNewsFinance(5, 1));
    };

    componentWillUnmount() {
        this.setState({isLoadMore: false});
        let {dispatch, isNodeLoad} = this.props;
        isNodeLoad && dispatch(nodeUnLoad());
    };

    render() {
        const {
            children, 
            history, 
            items, 
            isFetching, 
            dispatch, 
            isAppDownLoad,
            windowObject,
            playload
        } = this.props;
        const {isLoadMore} = this.state;
        return (
            <div onTouchEnd={(e) => {this.loadMore(e);}}>
                <NavigationBar menuCode={this.state.pathSwitch} />
                <FinanceList items={items.resultBody}
                    isFetching={isFetching}
                    fontSize={windowObject} />
                {children}
                {playload && isLoadMore ? <FinanceList items={{list: playload}}
                    fontSize={windowObject} /> : null}
                <AppDownloadBar dispatch={dispatch} 
                    isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};