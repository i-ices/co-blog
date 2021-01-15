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