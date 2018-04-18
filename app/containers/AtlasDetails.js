/**
 *
 * 图集详情数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchNewsAtlasDetails, fetchReviewList} from '../actions/actionTypes';
import {safari} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import AtlasDetailsList from '../components/atlas/AtlasDetailsList';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsAtlasDetails.isFetching,
        items: state.postNewsAtlasDetails.items,
        comment: state.postReviewList.items,
        isAppDownLoad: state.postAppDownLoad.isHidden,
        windowObject: state.postWindowObject.height
    };
};

@connect(mapStateToProps)
export default class AtlasDetails extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        let _params = renderProps.params.atlas.split('-')[2].split('.')[0];
        fetchTasks.push(
            dispatch(fetchNewsAtlasDetails(_params)),
            dispatch(fetchReviewList(_params, 0))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.state = {
            pathSwitch: this.props.location.pathname.split('/')[1],
            newsId: this.props.params.atlas.split('-')[2].split('.')[0]
        };
    };

    componentDidMount() {
        let {dispatch, params} = this.props;
        let _params = params.atlas.split('-')[2].split('.')[0];
        dispatch(fetchNewsAtlasDetails(_params));
        dispatch(fetchReviewList(_params, 0));
        safari('root', 'IOS');
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.atlas !== nextProps.params.atlas) {
            let {dispatch} = this.props;
            let _params = nextProps.params.atlas.split('-')[2].split('.')[0];
            dispatch(fetchNewsAtlasDetails(_params));
            this.setState({newsId: _params});
        }
    };

    render() {
        const {
            children, 
            history, 
            items, 
            isFetching, 
            comment, 
            dispatch, 
            isAppDownLoad,
            windowObject
        } = this.props;
        const {newsId} = this.state;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch}
                   areaName="精彩图集"
                   historyBack={true}
                   history={history} />
                <AtlasDetailsList items={items.resultBody} 
                   isFetching={isFetching}
                   newsId={newsId} 
                   total={comment&&comment.resultBody?comment.resultBody.reviewListSize:0}
                   dispatch={dispatch}
                   height={windowObject} />
                {children}
                <AppDownloadBar dispatch={dispatch} 
                   isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};