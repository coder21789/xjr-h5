/**
 *
 * 音频播放列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {nodeUnLoad} from '../actions/actionCreator';
import {fetchTingAudio} from '../actions/actionTypes';
import AppDownloadBar from '../components/common/AppDownloadBar';
import TingAudioList from '../components/ting/TingAudioList';

const mapStateToProps = (state, ownProps) => {
    return {
        isAppDownLoad: state.postAppDownLoad.isHidden,
        isNodeLoad: state.postNode.isNodeLoad,
        isFetching: state.postTingAudio.isFetching,
        items: state.postTingAudio.items
    };
};

@connect(mapStateToProps)
export default class TingAudio extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    static fetch(state, dispatch, renderProps, route) {
        const fetchTasks = [];
        let id = renderProps.params.audio.split('.')[0];
        fetchTasks.push(
            dispatch(fetchTingAudio(id))
        );
        return fetchTasks;
    };

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        let {dispatch, params, isNodeLoad} = this.props;
        let id = params.audio.split('.')[0];
        !isNodeLoad && dispatch(fetchTingAudio(id));
    };

    componentWillReceiveProps(nextProps) {
        let {dispatch} = this.props;
        let thisId = this.props.params.audio.split('.')[0];
        let nextId = nextProps.params.audio.split('.')[0];
        if (thisId !== nextId) {
            dispatch(fetchTingAudio(nextId));
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
                <TingAudioList audioPlayer={items.resultBody.main}
                     audioList={items.resultBody.latest}
                     audioRecommend={items.resultBody.recommend} />
                {children}     
                <AppDownloadBar dispatch={dispatch} 
                     isAppDownLoad={isAppDownLoad}
                     theme="ting"></AppDownloadBar>
            </div>
        );
    };
};