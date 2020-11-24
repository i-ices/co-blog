namespace util {
    // -----------------------------------------------------------------------------

    // 随机数
    export class Random {
        /**
         * 返回随机的float 左闭右开
         * @param max 最大值
         * @param min 最小值
         * @returns {*} 随机浮点数
         */
        public static float = function (min: number, max: number) {
            return Math.random() * (max - (min = min ? min : 0)) + min;
        }

        /**
         * 返回一个随机整数 左闭右开
         * @param max 最大值
         * @param min 最小值
         * @returns {int} 随机整数
         */
        public static int = function (min: any, max: any) {
            return Math.floor(Random.float(max, min));
        }

        /**
         *  返回一个随机颜色
         * @param opacity 透明度
         * @returns {string} rgb | rgba
         */
        public static color = function (opacity: number | null | undefined) {
            opacity = typeof opacity === "number" ? opacity : undefined;
            let body = Random.int(null, 255) + ',' + Random.int(null, 255) + ',' + Random.int(null, 255);
            return isNotEmpty(opacity) ? 'rgba(' + body + ',' + opacity + ')' : 'rgb(' + body + ')';
        }
    }

    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------

    /**
     * 时间类
     */
    export class Time {
        private static start_date: Date;

        /**
         * 开始计时
         */
        public static startTiming(): void {
            this.start_date = new Date();
        }

        /**
         * 返回时间锉
         */
        public static stopTiming(): number {
            return new Date().getTime() - this.start_date.getTime();
        }

        /**
         * 格式化时间
         */
        public static formatMS(time: number): String {
            let m = Math.floor(time / 1000 / 60 % 60);
            let s = Math.floor(time / 1000 % 60);
            return Time.zeroes(m) + ':' + Time.zeroes(s);
        }

        /**
         * 统一双位
         * @param num
         */
        public static zeroes(num: number): String {
            return (String(num).length == 1 ? '0' : '') + num;
        }
    }

    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    /**
     * 节流
     * @param {*} func 执行函数
     * @param {*} delay 节流时间,毫秒
     */
    export const throttle = function (func: { apply: (arg0: any, arg1: IArguments) => void; }, delay: number | undefined) {
        let timer: number | null = null
        return function () {
            if (!timer) {
                timer = setTimeout(() => {
                    // @ts-ignore
                    func.apply(this, arguments)
                    // 或者直接 func()
                    timer = null
                }, delay)
            }
        }
    }

    /**
     * 防抖
     * @param {*} fn 执行函数
     * @param {*} wait 防抖时间,毫秒
     */
    export const debounce = function (fn: { apply: (arg0: any, arg1: IArguments) => void; }, wait: number | undefined) {
        let timeout: number | null | undefined = null
        return function () {
            if (timeout !== null) clearTimeout(timeout)// 如果多次触发将上次记录延迟清除掉
            timeout = setTimeout(() => {
                // @ts-ignore
                fn.apply(this, arguments)
                // 或者直接 fn()
                timeout = null
            }, wait)
        }
    }
}

/**
 * 判断是否不为空
 * @param value
 */
function isNotEmpty(value: any) {
    if (value === undefined) {
        return false;
    }
    value = String(value);
    return !(value.trim() === '' || value.length === 0);
}


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
//暴露外部的引用
let utils: (selector: any) => any;
utils = (window as any).$ = function (selector: any) {
    // @ts-ignore
    return new utils.fn.init(selector);
};
(utils as any).fn = utils.prototype;
//添加原型事件
utils.prototype.init = function (selector: any) {
    if (typeof selector === "object") {
        selector = selector.length !== undefined ? selector : [selector];
        Array.prototype.push.apply(this, selector);
        return this;
    }
    // @ts-ignore
    Array.prototype.push.apply(this, document.querySelectorAll(selector));
    return this;
}
//将init的原型引用成utils的原型
// @ts-ignore
utils.fn.init.prototype = utils.fn;
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

//判断是utils否存在
function ifObj(utils: any[]) {
    if (utils.length > 1) {
        throw new Error('$(obj)不符合格式');
    }
    if (utils[0] === undefined) {
        throw new Error('没有该元素');
    }
}

// 设置内容
utils.prototype.val = function (value: any) {
    ifObj(this);
    if (this[0].value !== undefined) {
        this[0].value = value;
    }
    return this;
}

// 设置内容
utils.prototype.text = function (value: any) {
    ifObj(this);
    if (this[0].innerText !== undefined) {
        this[0].innerText = value;
    }
    return this;
}

// 设置Attribute
utils.prototype.attr = function (key: any, value: any) {
    ifObj(this);
    if (key === undefined || key.length === 0) {
        return this;
    }
    if (value === undefined) {
        return this[0].getAttribute(key);
    } else {
        this[0].setAttribute(key, value);
        return this;
    }
}

// 添加css样式
utils.prototype.addClass = function (css: any) {
    ifObj(this);
    if (isNotEmpty(css)) {
        this[0].classList.add(css);
    }
    return this;
}

// 删除css样式
utils.prototype.removeClass = function (css: any) {
    ifObj(this);
    if (isNotEmpty(css)) {
        this[0].classList.remove(css);
    }
    return this;
}