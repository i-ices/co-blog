;!(function () {
    const timeout = prompt("设置刷新时间间隔[S]");
    // 获取当前的URL
    const current = location.href;

    let reload = function () {
        // 下面两行代码的格式化后的内容为：
        const frames = '<frameset cols="*"><frame src=' + current + '/></frameset>';
        with (document) {
            // 引用document对象，调用write方法写入框架，打开新窗口
            write(frames);
            // 关闭上面的窗口
            void (close());
        }
    }
    if (timeout > 0) {
        // 时间间隔大于0，timeout秒之后执行reload函数
        setInterval(reload, 1000 * timeout);
    } else {
        // 时间间隔不大于0，仅刷新一次
        location.replace(current);
    }
})();