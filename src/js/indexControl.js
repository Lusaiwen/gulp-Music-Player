/*
 * @Author: your name
 * @Date: 2021-04-06 19:27:04
 * @LastEditTime: 2021-04-07 16:07:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulp-Music-Player\src\js\indexControl.js
 */

(function (root) {
    class ControlIndex {
        constructor(len){
            this.index = 0;
            this.len = len;
        }

        prev(){
            return this.getIndex(-1);
        }

        next(){
            return this.getIndex(1);
        }

        /**
         * @description: 处理索引边界
         * @param {*} val  +1 下一首   -1 上一首
         * @return {*}   处理后的索引
         */        
        getIndex(val){
            this.index = (this.index + val + this.len) % this.len;
            return this.index;
        }   

        setIndex(val){
            this.index = val;
        }
    }

    root.controlIndex = ControlIndex;
})(window.player || (window.player = {}))