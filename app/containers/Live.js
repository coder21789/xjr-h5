/**
 *
 * 24小时新闻列表数据-状态树数据同步
 *
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import liveBar from '../config/liveBar';
import {fetchNewsLive} from '../actions/actionTypes';
import NavigationBar from '../components/common/NavigationBar';
import LiveList from '../components/live/LiveList';
import LiveMore from '../components/live/LiveMore';
import AppDownloadBar from '../components/common/AppDownloadBar';

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.postNewsLive.isFetching,
        items: state.postNewsLive.items,
        isAppDownLoad: state.postAppDownLoad.isHidden
    };
};

@connect(mapStateToProps)
export default class Live extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    constructor(props) {
        super(props);
        this.handleClickCalendar = this.handleClickCalendar.bind(this);
        this.state = {
            catId: this.props.params.catId,
            pathSwitch: this.props.location.pathname.split('/')[1],
            time: moment().add('days', 0).format('YYYY-MM-DD'),
            calendar: moment().add('days', 0).format('YYYY年MM月DD日 ddd')
        };
    };


    /**
     * 当天数据为空时请求前一天数据
     */

    handleClickCalendar() {
        let {dispatch} = this.props;
        let code = this.state.catId ? liveBar.liveReflect[this.state.catId].code : '0';
        dispatch(fetchNewsLive(code, moment(this.state.time).add('days', -1).format('YYYY-MM-DD')));
        this.setState({
            time: moment(this.state.time).add('days', -1).format('YYYY-MM-DD'),
            calendar: moment(this.state.time).add('days', -1).format('YYYY年MM月DD日 ddd')
        });
    };

    componentWillMount() {
        let {dispatch} = this.props;
        let code = this.state.catId ? liveBar.liveReflect[this.state.catId].code : '0';
        dispatch(fetchNewsLive(code, this.state.time));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.catId !== nextProps.params.catId) {
            let {dispatch} = this.props;
            let code = nextProps.params.catId ? liveBar.liveReflect[nextProps.params.catId].code : '0';
            dispatch(fetchNewsLive(code, moment().add('days', 0).format('YYYY-MM-DD')));
            this.setState({
                catId: nextProps.params.catId,
                time: moment().add('days', 0).format('YYYY-MM-DD'),
                calendar: moment().add('days', 0).format('YYYY年MM月DD日 ddd')
            });
        }
    };

    render() {
        const {children, items, isFetching, dispatch, isAppDownLoad} = this.props;
        return (
            <div>
                <NavigationBar menuCode={this.state.pathSwitch} />
                {items?<LiveList items={items.resultBody}
                     isFetching={isFetching}
                     catId={this.state.catId}
                     calendar={this.state.calendar} />:null}
                {!isFetching&&!items.resultBody?
                    <LiveMore handleClickCalendar={this.handleClickCalendar} />:null}
                {children}
                <AppDownloadBar dispatch={dispatch} 
                     isAppDownLoad={isAppDownLoad}></AppDownloadBar>
            </div>
        );
    };
};