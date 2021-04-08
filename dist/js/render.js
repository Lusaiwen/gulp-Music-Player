/*
 * @Author: your name
 * @Date: 2021-04-06 09:10:41
 * @LastEditTime: 2021-04-07 16:17:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulp-Music-Player\src\js\render.js
 */
(function ($, root) {
    //渲染图片
    function renderImg(src) {
        console.log(src);
        root.blurImg(src);
        const img = $('.song_img img');
        img.attr('src', src);
    }

    //渲染歌曲信息
    function renderInfo(data) {
        const name = $('.name');
        const author = $('.author');
        name.text(data.song);
        author.text(data.singer);
    }

    //渲染是否喜欢
    function renderIsLike(isLike) {
        const liLike = $('.like');
        isLike ? liLike.addClass('liking') : liLike.removeClass("liking")
    }

    root.render = function (data) {
        console.log(data);
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    };
})(window.Zepto, window.player || (window.player = {}));
