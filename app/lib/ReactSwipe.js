/**
 *
 * 轮播图组件
 *
 */

import React, {Component, PropTypes} from 'react';
import Swipe from './swipe';
import './style/swipe.scss';

class ReactSwipe extends Component {

  /**
   * 下一页
   */

  next() {
    this.swipe.next();
  };

  /**
   * 上一页
   */

  prev() {
    this.swipe.prev();
  };

  /**
   * 滚动至指定页
   */

  slide(...args) {
    this.swipe.slide(...args);
  };

  /**
   * 获取页面索引
   */

  getPos() {
    return this.swipe.getPos();
  };

  /**
   * 获取轮播页数
   */

  getNumSlides() {
    return this.swipe.getNumSlides();
  };

  componentDidMount() {
    const {swipeOptions, children} = this.props;
    const elems = window.document.querySelectorAll('.slide');
    if (elems[0]) elems[0].className = 'iconfont icon-Oval slide num';
    swipeOptions.transitionEnd = (index, e) => {

        /**
         * 页面滚动结束回调函数
         */

        for (var i = 0; i < elems.length; i++) {
          elems[i].className = 'iconfont icon-Oval slide';
          if (i === index) {elems[i].className = 'iconfont icon-Oval slide num';}
        }

        if (swipeOptions.callBack) {
            if (index === children[0].length) {
                swipeOptions.callBack(true);
            } else {
                swipeOptions.callBack(false);
            }
        }
    };
    this.swipe = Swipe(this.refs.container, swipeOptions);
  };

  componentWillUnmount() {

      /**
       * 清除实例
       */

      this.swipe.kill();
      this.swipe = void 0;
  };

  render() {
    const {id, className, style, children, num} = this.props;
    return (
      <div ref="container" id={id} className={`react-swipe-container ${className}`} style={style.container}>
        <div style={style.wrapper}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              style: child.props.style?{...child.props.style, ...style.child}:style.child
            });
          })}
        </div>
        {num?(
            <div className="slides">
              {children.map((child, i) => (
                  <i className="iconfont icon-Oval slide" key={i}></i>
              ))}
            </div>
        ):null}
      </div>
    );
  };
};

ReactSwipe.propTypes = {
  swipeOptions: PropTypes.shape({
    startSlide: PropTypes.number,
    speed: PropTypes.number,
    auto: PropTypes.number,
    continuous: PropTypes.bool,
    disableScroll: PropTypes.bool,
    stopPropagation: PropTypes.bool,
    swiping: PropTypes.func,
    callback: PropTypes.func,
    transitionEnd: PropTypes.func
  }),
  style: PropTypes.shape({
    container: PropTypes.object,
    wrapper: PropTypes.object,
    child: PropTypes.object
  }),
  id: PropTypes.string,
  className: PropTypes.string
};

ReactSwipe.defaultProps = {
  swipeOptions: {},
  style: {
    container: {
      overflow: 'hidden',
      visibility: 'hidden',
      position: 'relative'
    },
    wrapper: {
      overflow: 'hidden',
      position: 'relative'
    },
    child: {
      float: 'left',
      width: '100%',
      position: 'relative',
      transitionProperty: 'transform'
    }
  },
  className: ''
};

export default ReactSwipe;