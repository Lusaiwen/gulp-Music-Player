/*
 * @Author: your name
 * @Date: 2021-04-06 14:25:31
 * @LastEditTime: 2021-04-08 15:18:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulp-Music-Player\src\js\audio.js
 */
(function ($, root) {
    class AudioManger{
        constructor(){
            this.audio = new Audio();
            this.status = 'pause';
        }

        //加载音乐
        load(src){
            this.audio.src = src;
            this.audio.load();
        }

        //播放音乐
        play(){
            this.audio.play();
            this.status = 'play';
        }

        //暂停音乐
        pause(){
            this.audio.pause();
            this.status = 'pause';
        }

        //音乐播放完成事件
        end(fn){
            this.audio.onended = fn;
        }

        //跳转
        playTo(time){
            this.audio.currentTime = time;
        }
    }

    root.musicManger = AudioManger;
})(window.Zepto, window.player || (window.player = {}))