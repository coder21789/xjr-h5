/**
 *
 * 话题新闻列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchNewsTopic, fetchNewsTopicDetails} from '../actions/actionTypes';
import {ThemeUI, touchOffsetParent} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import TopicList from '../components/topic/TopicList';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsTopic.isFetching,
        items: state.postNewsTopic.items,
        playload: state.postNewsTopic.playload,
        pageInfo: state.postNewsTopic.pageInfo,
        isFetchingDetails: state.postNewsTopicDetails.isFetching,
        itemsDetails: state.postNewsTopicDetails.items,
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad,
        windowObject: state.postWindowObject.fontSize
    };
};

@connect(mapStateToProps)
export default class Topic extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        if (renderProps.params.collection) {
            fetchTasks.push(
                dispatch(fetchNewsTopicDetails(renderProps.params.collection.split('.')[0].split('-')[2]))
            );
        } else {
            fetchTasks.push(
                dispatch(fetchNewsTopic(10, 1))
            );
        }
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.dispatchSwitch = this.dispatchSwitch.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            collection: this.props.params.collection,
            pathSwitch: this.props.location.pathname.split('/')[1],
            isLoadMore: false
        };
    };

    /**
     * 根据是否存在话题id分发不同dispatch获取列表或详情
     * @params {id}
     */

    dispatchSwitch(id) {
        let {dispatch} = this.props;
        if (!id) {
            dispatch(fetchNewsTopic(10, 1));
        } else {
            dispatch(fetchNewsTopicDetails(id.split('.')[0].split('-')[2]));
        }
    };

    /**
     * 滚动加载分页数据
     * @param e
     */

    loadMore(e) {
        this.setState({isLoadMore: true});
        const {collection} = this.state;
        let {ratio} = touchOffsetParent.call(this, e);
        let {dispatch, playload, pageInfo} = this.props;
        let isLoadMoreStarted = (pageInfo.nextPage === ratio + 1) ? true : false;
        !collection && ratio && pageInfo.nextPage && isLoadMoreStarted && dispatch(fetchNewsTopic(10, pageInfo.nextPage, playload, ratio));
    };

    componentDidMount() {
        ThemeUI(this.props, 'dark');
        let {isNodeLoad} = this.props;
        !isNodeLoad && this.dispatchSwitch(this.state.collection);
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.collection 
        !== nextProps.params.collection) {
            this.setState({isLoadMore: false});
            let _collection = nextProps.params.collection;
            this.dispatchSwitch(_collection);
            this.setState({collection: _collection});
        }
    };

    componentWillUnmount() {
        this.setState({isLoadMore: false});
        let {dispatch, isNodeLoad} = this.props;
        isNodeLoad && dispatch(nodeUnLoad());
    };

    render() {
        const {
            children, 
            items, 
            isFetching, 
            itemsDetails, 
            isFetchingDetails, 
            dispatch, 
            isAppDownLoad,
            windowObject,
            playload
        } = this.props;
        const {isLoadMore, collection} = this.state;
        return (
            <div onTouchEnd={(e) => {this.loadMore(e);}}>
                <NavigationBar menuCode={this.state.pathSwitch} />
                <TopicList collection={collection}
                   items={items.resultBody}
                   isFetching={isFetching}
                   itemsDetails={itemsDetails.resultBody}
                   isFetchingDetails={isFetchingDetails}
                   fontSize={windowObject} />
                {children}
                {playload && isLoadMore && !collection ? <TopicList collection={collection}
                   items={{list: playload}}
                   fontSize={windowObject} />:null}
                <AppDownloadBar dispatch={dispatch} 
                   isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};