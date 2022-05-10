(function() {
    let that;
    //记录游戏对象

    function Game(map) {
        this.food = new Food();
        this.snake = new Snake()
        this.map = map;
        that = this;
    }

    Game.prototype.start = function() {
        // 1.把蛇和食物渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);

        // 2.开始游戏的逻辑
        // 2.1让蛇移动起来
        // 2.4当蛇遇到边界游戏结束
        runSnake();

        // 2.2通过键盘控制蛇的移动的方向
        bindkey();

        // 2.3当蛇遇到食物做出相应的处理
    }

    //键盘控制方向
    function bindkey() {
        document.addEventListener('keydown', function(event) {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            switch (e && e.keyCode) {
                case 87:
                    that.snake.direction = 'top';
                    break;
                case 83:
                    that.snake.direction = 'botton';
                    break;
                case 65:
                    that.snake.direction = 'left';
                    break;
                case 68:
                    that.snake.direction = 'right';
                    break;
            }
        })
    }


    //私有的函数
    function runSnake() {
        let timeId = setInterval(function() {
            that.snake.move(that.food, that.map);
            that.snake.render(that.map);

            // 2.4当蛇遇到边界游戏结束
            //获取蛇头
            let maxx = that.map.offsetWidth / that.snake.width;
            let maxy = that.map.offsetHight / that.snake.hight;
            let headx = that.snake.body[0].x;
            let heady = that.snake.body[0].y;
            if (headx < 0 || headx >= maxx) {
                alert('拉了');
                clearInterval(timeId)
            }
            if (heady < 0 || heady >= maxy) {
                alert('拉了');
                clearInterval(timeId)
            }
        }, 150)
    }

    window.Game = Game;
})()