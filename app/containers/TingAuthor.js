/**
 *
 * 主播音频列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchTingAuthor} from '../actions/actionTypes';
import AppDownloadBar from '../components/common/AppDownloadBar';
import TingAuthorList from '../components/ting/TingAuthorList';

const mapStateToProps = (state, ownProps) => {
    return {
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad,
        isFetching: state.postTingAuthor.isFetching,
        items: state.postTingAuthor.items
    };
};

@connect(mapStateToProps)
export default class TingAuthor extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        let id = renderProps.params.author.split('.')[0];
        fetchTasks.push(
            dispatch(fetchTingAuthor(id))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        let {dispatch, params, isNodeLoad} = this.props;
        let id = params.author.split('.')[0];
        !isNodeLoad && dispatch(fetchTingAuthor(id));
    };

    componentWillReceiveProps(nextProps) {
        let {dispatch} = this.props;
        let thisId = this.props.params.author.split('.')[0];
        let nextId = nextProps.params.author.split('.')[0];
        if (thisId !== nextId) {
            dispatch(fetchTingAuthor(nextId));
        }
    };

    componentWillUnmount() {
        let {dispatch, isNodeLoad} = this.props;
        isNodeLoad && dispatch(nodeUnLoad());
    };

    render() {
        const {
            children,  
            dispatch,
            isAppDownLoad,
            items
        } = this.props;
        
        return (
            <div>
                <TingAuthorList items={items.resultBody} />
                {children}
                <AppDownloadBar dispatch={dispatch} 
                     isAppDownLoad={isAppDownLoad}
                     theme="ting"></AppDownloadBar>
            </div>
        );
    };
};