(function ($, player) {
    class MusicPlayer {
        constructor(dom) {
            this.dom = dom;
            this.dataList = null;
            this.musicManger = new player.musicManger();
            this.rotateTimer = null;
            this.controlIndex = null;
            this.list = null;
            this.progress = new player.Progress();
        }
        init() {
            this.getData('../mock/data.json');
        }

        getData(url) {
            const _this = this;
            $.ajax({
                url: url,
                method: 'GET',
                success(res) {
                    console.log(res);
                    _this.dataList = res;
                    _this.listControl();
                    _this.controlIndex = new player.controlIndex(res.length);
                    _this.loadMusic(_this.controlIndex.index);
                    _this.musicControls();
                    _this.controlProgress();
                },
                error() {
                    console.log('数据请求失败');
                },
            });
        }

        loadMusic(index) {
            player.render(this.dataList[index]);
            this.musicManger.load(this.dataList[index].audio);
            this.progress.renderAllTime(this.dataList[index].duration);
            //判断是否播放
            if (this.musicManger.status == 'play') {
                this.musicManger.play();
                $('.play').html(`&#xe68f;`);
                this.imgRotate(0);
                this.progress.move();
            }
            this.list.changeSelect(index);
            //结束切歌
            this.musicManger.end(function () {
                $('.next').trigger('touchend');
            })
        }

        musicControls() {
            const _this = this;
            //上一首
            $('.prev').on('touchend', function () {
                _this.musicManger.status = 'play';
                _this.loadMusic(_this.controlIndex.prev());
            });

            //下一首
            $('.next').on('touchend', function () {
                _this.musicManger.status = 'play';
                _this.loadMusic(_this.controlIndex.next());
            });

            //播放
            $('.play').on('touchend', function () {
                if (_this.musicManger.status == 'play') {
                    $('.play').html(`&#xe626;`);
                    _this.musicManger.pause();
                    _this.stopRotate();
                    _this.progress.stopTimer();
                } else {
                    $('.play').html(`&#xe68f;`);
                    _this.musicManger.play();
                    var degree = $('.song_img img').attr('degree') || 0;
                    _this.imgRotate(degree);
                    _this.progress.move();
                }
            });

            //是否喜欢
            $('.like').on('touchend', function () {
                const isLike = _this.dataList[_this.controlIndex.index].isLike;
                if (isLike) {
                    _this.dataList[_this.controlIndex.index].isLike = false;
                } else {
                    _this.dataList[_this.controlIndex.index].isLike = true;
                }
                player.render(_this.dataList[_this.controlIndex.index]);
            });
        }

        imgRotate(degree) {
            if (this.rotateTimer) {
                clearInterval(this.rotateTimer);
            }

            this.rotateTimer = setInterval(function () {
                degree = +degree + 0.2;
                $('.song_img img').css('transform', `rotate(${degree}deg)`);
                $('.song_img img').attr('degree', degree);
            }, 1000 / 60);
        }

        stopRotate() {
            clearInterval(this.rotateTimer);
        }

        listControl() {
            this.list = new player.listControl(this.dataList, $('.list_area'));
            this.list.render();
            const _this = this;
            //打开列表
            $('.list').on('touchend', function () {
                _this.list.slideUp();
            });

            //关闭列表
            $('.center_song_img').on('touchend', function () {
                _this.list.slideDown();
            });

            this.list.dom.find('li').forEach((el, index) => {
                $(el).on('touchend', function () {
                    if (_this.controlIndex.index == index) {
                        return;
                    }
                    _this.musicManger.status = 'play';
                    _this.loadMusic(index);
                    _this.controlIndex.setIndex(index);
                    _this.list.slideDown();
                });
            });
        }

        controlProgress(){
            const _this = this;
            this.progress.start = function (per) {
                _this.musicManger.playTo(per * _this.dataList[_this.controlIndex.index].duration);
                if(_this.musicManger.status == 'play'){
                    _this.progress.move();
                }
                console.log('start');
            }

            this.progress.moving = function (per) {
                // if(per) {
                //     _this.musicManger.playTo(per * _this.dataList[_this.controlIndex.index].duration);
                // }
                if(_this.musicManger.status == 'play'){
                    _this.progress.move();
                }
                console.log('move');
            }

            this.progress.end = function (per) {
                _this.musicManger.playTo(per * _this.dataList[_this.controlIndex.index].duration);
                if(_this.musicManger.status == 'play'){
                    _this.progress.move();
                }
                console.log('end');
            }
        }



    }

    const myPlayer = new MusicPlayer($('#wrap'));
    myPlayer.init();
})(window.Zepto, window.player);
