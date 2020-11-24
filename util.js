"use strict";
var util;
(function (util) {
    // -----------------------------------------------------------------------------
    // 随机数
    var Random = /** @class */ (function () {
        function Random() {
        }
        /**
         * 返回随机的float 左闭右开
         * @param max 最大值
         * @param min 最小值
         * @returns {*} 随机浮点数
         */
        Random.float = function (min, max) {
            return Math.random() * (max - (min = min ? min : 0)) + min;
        };
        /**
         * 返回一个随机整数 左闭右开
         * @param max 最大值
         * @param min 最小值
         * @returns {int} 随机整数
         */
        Random.int = function (min, max) {
            return Math.floor(Random.float(max, min));
        };
        /**
         *  返回一个随机颜色
         * @param opacity 透明度
         * @returns {string} rgb | rgba
         */
        Random.color = function (opacity) {
            opacity = typeof opacity === "number" ? opacity : undefined;
            var body = Random.int(null, 255) + ',' + Random.int(null, 255) + ',' + Random.int(null, 255);
            return isNotEmpty(opacity) ? 'rgba(' + body + ',' + opacity + ')' : 'rgb(' + body + ')';
        };
        return Random;
    }());
    util.Random = Random;
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    /**
     * 时间类
     */
    var Time = /** @class */ (function () {
        function Time() {
        }
        /**
         * 开始计时
         */
        Time.startTiming = function () {
            this.start_date = new Date();
        };
        /**
         * 返回时间锉
         */
        Time.stopTiming = function () {
            return new Date().getTime() - this.start_date.getTime();
        };
        /**
         * 格式化时间
         */
        Time.formatMS = function (time) {
            var m = Math.floor(time / 1000 / 60 % 60);
            var s = Math.floor(time / 1000 % 60);
            return Time.zeroes(m) + ':' + Time.zeroes(s);
        };
        /**
         * 统一双位
         * @param num
         */
        Time.zeroes = function (num) {
            return (String(num).length == 1 ? '0' : '') + num;
        };
        return Time;
    }());
    util.Time = Time;
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    /**
     * 节流
     * @param {*} func 执行函数
     * @param {*} delay 节流时间,毫秒
     */
    util.throttle = function (func, delay) {
        var timer = null;
        return function () {
            var _this = this;
            if (!timer) {
                timer = setTimeout(function () {
                    // @ts-ignore
                    func.apply(_this, arguments);
                    // 或者直接 func()
                    timer = null;
                }, delay);
            }
        };
    };
    /**
     * 防抖
     * @param {*} fn 执行函数
     * @param {*} wait 防抖时间,毫秒
     */
    util.debounce = function (fn, wait) {
        var timeout = null;
        return function () {
            var _this = this;
            if (timeout !== null)
                clearTimeout(timeout); // 如果多次触发将上次记录延迟清除掉
            timeout = setTimeout(function () {
                // @ts-ignore
                fn.apply(_this, arguments);
                // 或者直接 fn()
                timeout = null;
            }, wait);
        };
    };
})(util || (util = {}));
/**
 * 判断是否不为空
 * @param value
 */
function isNotEmpty(value) {
    if (value === undefined) {
        return false;
    }
    value = String(value);
    return !(value.trim() === '' || value.length === 0);
}
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
//暴露外部的引用..
var utils;
utils = window.$ = function (selector) {
    // @ts-ignore
    return new utils.fn.init(selector);
};
utils.fn = utils.prototype;
//添加原型事件
utils.prototype.init = function (selector) {
    if (typeof selector === "object") {
        selector = selector.length !== undefined ? selector : [selector];
        Array.prototype.push.apply(this, selector);
        return this;
    }
    // @ts-ignore
    Array.prototype.push.apply(this, document.querySelectorAll(selector));
    return this;
};
//将init的原型引用成utils的原型
// @ts-ignore
utils.fn.init.prototype = utils.fn;
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
//判断是utils否存在
function ifObj(utils) {
    if (utils.length > 1) {
        throw new Error('$(obj)不符合格式');
    }
    if (utils[0] === undefined) {
        throw new Error('没有该元素');
    }
}
// 设置内容
utils.prototype.val = function (value) {
    ifObj(this);
    if (this[0].value !== undefined) {
        this[0].value = value;
    }
    return this;
};
// 设置内容
utils.prototype.text = function (value) {
    ifObj(this);
    if (this[0].innerText !== undefined) {
        this[0].innerText = value;
    }
    return this;
};
// 设置Attribute
utils.prototype.attr = function (key, value) {
    ifObj(this);
    if (key === undefined || key.length === 0) {
        return this;
    }
    if (value === undefined) {
        return this[0].getAttribute(key);
    }
    else {
        this[0].setAttribute(key, value);
        return this;
    }
};
// 添加css样式
utils.prototype.addClass = function (css) {
    ifObj(this);
    if (isNotEmpty(css)) {
        this[0].classList.add(css);
    }
    return this;
};
// 删除css样式
utils.prototype.removeClass = function (css) {
    ifObj(this);
    if (isNotEmpty(css)) {
        this[0].classList.remove(css);
    }
    return this;
};
