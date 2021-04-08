/*
 * @Author: Lusaiwen
 * @Date: 2021-04-06 20:25:25
 * @LastEditTime: 2021-04-06 21:16:17
 * @LastEditors: Please set LastEditors
 * @Description:   列表切割
 * @FilePath: \gulp-Music-Player\src\js\listControl.js
 */

(function ($, root) {
    class listControl {
        constructor(data, dom) {
            this.musicList = data;
            this.dom = dom;
        }
        render() {
            var str = '';
            this.musicList.forEach((el, index) => {
                str += `<li class="item ${index == 0 ? 'curPlay' : ''}">
                <span class="iconfont playStatus ${index == 0 ? '' : 'isPlay'}" id="span">&#xe62d;</span>
                <div class="item_info">
                    <span>${el.song}</span>
                    -
                    <span>${el.singer}</span>
                </div>
                <span class="iconfont delete" id="span">&#xe619;</span>
                </li>`;  
            });
            this.dom.html(str);
            const _this = this;
            this.dom.find('li').forEach((el, index) => {
                $(el).on('touchend', function() {
                    _this.changeSelect($(el).index());
                })
            })
        }

        slideUp(){
            $('.bottom_modal_playlist').addClass('active');
        }

        slideDown(){
            $('.bottom_modal_playlist').removeClass('active');
        }

        changeSelect(val = 0){
            this.dom.find('li').forEach((el, index) => {
                $(el).removeClass('curPlay');
                $(el).find('.playStatus').addClass('isPlay');
                if(val == index){
                    $(el).addClass('curPlay');
                    $(el).find('.playStatus').removeClass('isPlay');
                }
            })
        }
    }


    root.listControl = listControl;
})(window.Zepto, window.player || (window.player = {}));
