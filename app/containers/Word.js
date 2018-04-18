/**
 *
 * 关键词列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ThemeUI} from '../lib/interactive';
import NavigationBar from '../components/common/NavigationBar';
import AppDownloadBar from '../components/common/AppDownloadBar';
import WordList from '../components/word/WordList';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchNewsWordList} from '../actions/actionTypes';

const mapStateToProps = (state, ownProps) => {
    return {
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isFetching: state.postNewsWord.isFetching,
        items: state.postNewsWord.items,
        isNodeLoad: state.postNode.isNodeLoad
    };
};

@connect(mapStateToProps)
export default class Word extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        fetchTasks.push(
            dispatch(fetchNewsWordList(renderProps.params.splat))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
        this.state = {
            pathSwitch: this.props.location.pathname.split('/')[2]
        };
    };

    componentDidMount() {
        ThemeUI(this.props, 'dark');
        let {dispatch, params, isNodeLoad} = this.props;
        !isNodeLoad && dispatch(fetchNewsWordList(params.splat));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.splat !== nextProps.params.splat) {
            let {dispatch} = this.props;
            dispatch(fetchNewsWordList(nextProps.params.splat));
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
            isFetching,
            items,
            history
        } = this.props;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch}
                    history={history} historyBack={true}
                    areaName={items.resultBody?items.resultBody.tkd.NAME:'关键词'} />
                <WordList isFetching={isFetching} items={items.resultBody} />
                {children}
                <AppDownloadBar dispatch={dispatch}
                    isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};