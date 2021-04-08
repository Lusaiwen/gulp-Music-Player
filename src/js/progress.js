/*
 * @Author: Lusaiwen
 * @Date: 2021-04-06 22:03:02
 * @LastEditTime: 2021-04-08 15:25:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulp-Music-Player\src\js\progress.js
 */

(function ($, root) {
    class Progress {
        constructor() {
            this.startTime = null;
            this.durTime = null;
            this.timer = null;
            this.lastPer = null;
            this.starX = null;
            this.offsetLeft = null;
            this.domWidth = null;
            this.curPer = null;

            this.init();
        }

        init() {
            this.getDom();
            // this.renderAllTime(100);
            this.bindEvent();
        }

        getDom() {
            this.curTimeDom = $('.cur-time');
            this.allTimeDom = $('.all-time');
            this.frontBgDom = $('.pro-top');
            this.backBgDom = $('.pro-bottom');
            this.spotDom = $('.spot');
            this.propAreaDom = $('.pro-wrap');
        }

        renderAllTime(time) {
            this.allTimeDom.text(this.formatTime(time));
            this.durTime = time;
            this.lastPer = null;
        }

        formatTime(time) {
            time = Math.round(time);
            let m = Math.floor(time / 60);
            let s = time % 60;
            m = m >= 10 ? m : '0' + m;
            s = s >= 10 ? s : '0' + s;
            return `${m}:${s}`;
        }

        move() {
            cancelAnimationFrame(this.timer);
            const _this = this;
            this.startTime = new Date().getTime();
            function frame() {
                let curTime = new Date().getTime();
                let per =
                    _this.lastPer +
                    (curTime - _this.startTime) / (_this.durTime * 1000);
                if (per <= 1) {
                    _this.update(per);
                } else {
                    _this.stopTimer();
                }

                _this.timer = requestAnimationFrame(frame);
            }
            frame();
        }

        update(per) {
            this.frontBgDom.css(
                'transform',
                `translateX(${-100 + per * 100}%)`
            );
            this.curTimeDom.text(this.formatTime(this.durTime * per));
        }

        stopTimer() {
            this.lastPer +=
                (new Date().getTime() - this.startTime) / (this.durTime * 1000);
            cancelAnimationFrame(this.timer);
        }

        bindEvent() {
            const _this = this;
            this.propAreaDom.on('touchstart', function (e) {
                e.preventDefault();
                _this.getPlace(e);

                _this.start && _this.start(_this.curPer);
                
            });

            this.propAreaDom.on('touchmove', function (e) {
                e.preventDefault();
                _this.getPlace(e);
                _this.moving && _this.moving(_this.curPer);   
            });

            this.propAreaDom.on('touchend', function (e) {
                e.preventDefault();
                _this.getPlace(e);
                _this.end && _this.end(_this.curPer);   
            });
        }

        getPlace(e) {
            this.offsetLeft = this.propAreaDom[0].offsetLeft;
            this.domWidth = this.propAreaDom[0].offsetWidth;
            const curPlace = e.changedTouches[0].clientX - this.offsetLeft;
            this.curPer = curPlace / this.domWidth;
            this.curPer = this.curPer >= 1 ? 1 : this.curPer;
            this.curPer = this.curPer <= 0 ? 0 : this.curPer;
            cancelAnimationFrame(this.timer);
            this.lastPer = this.curPer;
            this.update(this.curPer);
        }
    }

    root.Progress = Progress;
})(window.Zepto, window.player || (window.player = {}));
