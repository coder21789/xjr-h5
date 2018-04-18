/**
 *
 * Swipe轮播封装
 * 增加移动端卡片效果
 *
 */

/* eslint-disable */
(function(root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        root.Swipe = factory();
    }
}(this, function() {
    return function Swipe(container, options) {
        // 函数卸载
        var noop = function() {};
        var offloadFn = function(fn) {
            setTimeout(fn || noop, 0);
        };

        // 浏览器触控事件
        var browser = {
            addEventListener: !!window.addEventListener,
            touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
            transitions: (function(temp) {
                var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
                for (var i in props) if (temp.style[props[i]] !== undefined) return true;
                return false;
            })(document.createElement('swipe'))
        };

        // 参数配置
        if (!container) return;
        var element = container.children[0];
        var slides, slidePos, width, length;
        options = options || {};
        var index = parseInt(options.startSlide, 10) || 0;
        var speed = options.speed || 300;
        var ratio = options.ratio || 1; // 卡片缩放比
        options.continuous = options.continuous !== undefined ? options.continuous : true;
        var delay = options.auto || 0;
        var interval,
            start = {},
            delta = {},
            isScrolling;

        // 启动方法    
        function setup() {
            slides = element.children;
            length = slides.length;
            if (slides.length < 2) options.continuous = false; // <2默认取消轮播
            if (browser.transitions && options.continuous && slides.length < 3) { // 2张卡片复制切换
                element.appendChild(slides[0].cloneNode(true));
                element.appendChild(element.children[1].cloneNode(true));
                slides = element.children;
            }
            slidePos = new Array(slides.length);
            width = (container.getBoundingClientRect().width || container.offsetWidth) * ratio;
            element.style.width = (slides.length * width) + 'px';
            var pos = slides.length;
            while (pos--) {
                var slide = slides[pos];
                slide.style.width = width + 'px';
                slide.setAttribute('data-index', pos); // 设置卡片索引
                if (browser.transitions) {
                    slide.style.left = ratio !== 1 ? ((pos * -width) + 0.2 * width) + 'px' : (pos * -width)+ 'px'; // 卡片初始位置
                    move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
                }
            }
            if (options.continuous && browser.transitions) {
                move(circle(index-1), -width, 0);
                move(circle(index+1), width, 0); // 两侧卡片位置
            }
            if (!browser.transitions) element.style.left = (index * -width) + 'px';
            container.style.visibility = 'visible';
        };

        // 卡片位置切换
        function move(index, dist, speed) {
            translate(index, dist, speed);
            slidePos[index] = dist; // 保存卡片移动位置
        };

        // 卡片切换动画
        function translate(index, dist, speed) {
            var slide = slides[index];
            var style = slide && slide.style;
            if (!style) return;
            style.webkitTransitionDuration =
            style.MozTransitionDuration =
            style.msTransitionDuration =
            style.OTransitionDuration =
            style.transitionDuration = speed + 'ms'; // 频率
            style.webkitTransform = ratio === 1 ? 'translate(' + dist + 'px,0) translateZ(0)' :
                'translate(' + dist * 0.95 + 'px,0) translateZ(0) scale(' + (dist === 0 ? 1 : ratio * 1.3) + ')'; // 缩放比
            style.msTransform =
            style.MozTransform =
            style.OTransform = ratio === 1 ? 'translateX(' + dist + 'px)' :
                'translateX(' + dist * 0.95 + 'px) scale(' + (dist === 0 ? 1 : ratio * 1.3) + ')';
            if (ratio !== 1) {
                style.webkitTransitionProperty =
                style.MozTransitionProperty =
                style.msTransitionProperty =
                style.OTransitionProperty =
                style.transitionProperty = 'opacity';
                style.opacity = ratio === 1 ? 1 : (dist === 0 ? 1 : 0.4); // 透明度
            }
        };

        function circle(index) {
            return (slides.length + (index % slides.length)) % slides.length; // 返回索引
        };

        // 卡片前翻
        function prev() {
            if (options.continuous) slide(index-1);
            else if (index) slide(index-1);
        };

        // 卡片滚动
        function slide(to, slideSpeed) {
            if (index === to) return;
            if (browser.transitions) {
                var direction = Math.abs(index-to) / (index-to);
                if (options.continuous) {
                    var natural_direction = direction;
                    direction = -slidePos[circle(to)] / width;
                    if (direction !== natural_direction) to =  -direction * slides.length + to;
                }
                var diff = Math.abs(index-to) - 1;
                while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);
                to = circle(to);
                move(index, width * direction, slideSpeed || speed);
                move(to, 0, slideSpeed || speed);
                if (options.continuous) move(circle(to - direction), -(width * direction), 0);
            } else {
                to = circle(to);
                animate(index * -width, to * -width, slideSpeed || speed);
            }
            index = to;
            offloadFn(options.callback && options.callback(index, slides[index]));
        };

        // 定时器模拟动画效果
        function animate(from, to, speed) {
            if (!speed) {
                element.style.left = to + 'px';
                return;
            }
            var start = +new Date();
            var timer = setInterval(function() {
                var timeElap = +new Date() - start;
                if (timeElap > speed) {
                    element.style.left = to + 'px';
                    if (delay) begin();
                    options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
                    clearInterval(timer);
                    return;
                }
                element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px'; // 浮点数问题
            }, 4);
        };

        // 卡片自滚动
        function begin() {
            interval = setTimeout(next, delay);
        };

        // 卡片后翻
        function next() {
            if (options.continuous) slide(index+1);
            else if (index < slides.length - 1) slide(index+1);
        };

        // 清除卡片滚动
        function stop() {
            delay = 0;
            clearTimeout(interval);
        };

        // 定制卡片交互事件
        var events = {
            // 绑定事件种类
            handleEvent: function(event) {
                switch (event.type) {
                    case 'touchstart': this.start(event); break;
                    case 'touchmove': this.move(event); break;
                    case 'touchend': offloadFn(this.end(event)); break;
                    case 'webkitTransitionEnd':
                    case 'msTransitionEnd':
                    case 'oTransitionEnd':
                    case 'otransitionend':
                    case 'transitionend': offloadFn(this.transitionEnd(event)); break;
                    case 'resize': offloadFn(setup); break;
                    default: return;
                }
                if (options.stopPropagation) event.stopPropagation();
            },
            // touchstart事件
            start: function(event) {
                var touches = event.touches[0];
                start = {
                    x: touches.pageX,
                    y: touches.pageY,
                    time: +new Date()
                };
                isScrolling = undefined;
                delta = {};
                element.addEventListener('touchmove', this, false);
                element.addEventListener('touchend', this, false);
            },
            // touch移动事件
            move: function(event) {
                if ( event.touches.length > 1 || event.scale && event.scale !== 1) return;
                if (options.disableScroll) event.preventDefault(); // 禁止滚动
                var touches = event.touches[0];
                delta = {
                    x: touches.pageX - start.x,
                    y: touches.pageY - start.y
                };
                if ( typeof isScrolling === 'undefined') {
                    isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
                }
                if (!isScrolling) {
                    event.preventDefault();
                    stop();
                    if (options.continuous) {
                        translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
                        translate(index, delta.x + slidePos[index], 0);
                        translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);
                    } else {
                        delta.x =
                            delta.x /
                            ( (!index && delta.x > 0 ||
                                index === slides.length - 1 &&
                                delta.x < 0
                            ) ?
                            ( Math.abs(delta.x) / width + 1 )
                            : 1 );
                        translate(index-1, delta.x + slidePos[index-1], 0);
                        translate(index, delta.x + slidePos[index], 0);
                        translate(index+1, delta.x + slidePos[index+1], 0);
                    }
                    options.swiping && options.swiping(-delta.x / width);
                }
            },
            // touch移动结束事件
            end: function(event) {
                var duration = +new Date() - start.time;
                var isValidSlide =
                    Number(duration) < 250 &&
                    Math.abs(delta.x) > 20 ||
                    Math.abs(delta.x) > width/2;
                var isPastBounds =
                    !index && delta.x > 0 ||
                    index === slides.length - 1 && delta.x < 0;
                if (options.continuous) isPastBounds = false;
                var direction = delta.x < 0;
                if (!isScrolling) {
                    if (isValidSlide && !isPastBounds) {
                        if (direction) {
                            if (options.continuous) {
                                move(circle(index-1), -width, 0);
                                move(circle(index+2), width, 0);
                            } else {
                                move(index-1, -width, 0);
                            }
                            move(index, slidePos[index]-width, speed);
                            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
                            index = circle(index+1);
                        } else {
                            if (options.continuous) {
                                move(circle(index+1), width, 0);
                                move(circle(index-2), -width, 0);
                            } else {
                                move(index+1, width, 0);
                            }
                            move(index, slidePos[index]+width, speed);
                            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
                            index = circle(index-1);
                        }
                        options.callback && options.callback(index, slides[index]);
                    } else {
                        if (options.continuous) {
                            move(circle(index-1), -width, speed);
                            move(index, 0, speed);
                            move(circle(index+1), width, speed);
                        } else {
                            move(index-1, -width, speed);
                            move(index, 0, speed);
                            move(index+1, width, speed);
                        }
                    }
                }
                delay = options.auto || 0;
                element.removeEventListener('touchmove', events, false);
                element.removeEventListener('touchend', events, false);
            },
            // 卡片动效结束时回调
            transitionEnd: function(event) {
                if (parseInt(event.target.getAttribute('data-index'), 10) === index) {
                    if (delay) begin();
                    options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
                }
            }
        };

        setup();
        if (delay) begin();

        // 交互事件绑定
        if (browser.addEventListener) {
            if (browser.touch) element.addEventListener('touchstart', events, false);
            if (browser.transitions) {
                element.addEventListener('webkitTransitionEnd', events, false);
                element.addEventListener('msTransitionEnd', events, false);
                element.addEventListener('oTransitionEnd', events, false);
                element.addEventListener('otransitionend', events, false);
                element.addEventListener('transitionend', events, false);
            }
            window.addEventListener('resize', events, false);
        } else {
            window.onresize = function() {
                setup();
            };
        }

        return {
            setup: function() {
                setup();
            },
            slide: function(to, speed) {
                stop();
                slide(to, speed);
            },
            prev: function() {
                stop();
                prev();
            },
            next: function() {
                stop();
                next();
            },
            stop: function() {
                stop();
            },
            getPos: function() {
                return index;
            },
            getNumSlides: function() {
                return length;
            },
            kill: function() {
                stop();
                element.style.width = '';
                element.style.left = '';
                var pos = slides.length;
                while (pos--) {
                    var slide = slides[pos];
                    slide.style.width = '';
                    slide.style.left = '';
                    if (browser.transitions) translate(pos, 0, 0);
                }
                // 交互事件清除
                if (browser.addEventListener) {
                    element.removeEventListener('touchstart', events, false);
                    element.removeEventListener('webkitTransitionEnd', events, false);
                    element.removeEventListener('msTransitionEnd', events, false);
                    element.removeEventListener('oTransitionEnd', events, false);
                    element.removeEventListener('otransitionend', events, false);
                    element.removeEventListener('transitionend', events, false);
                    window.removeEventListener('resize', events, false);
                } else {
                    window.onresize = null;
                }
            }
        };
    };
}));