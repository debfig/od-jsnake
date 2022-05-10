(function() {
    let elements = [];
    //记录之前创建的蛇

    function Snake(options) {
        options = options || {};
        //蛇节 的大小
        this.width = options.width || 20;
        this.height = options.height || 20;
        //蛇移动方向
        this.direction = options.options || 'right';
        //蛇的身体
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' }
        ]
    }

    //渲染蛇
    Snake.prototype.render = function(map) {
        //删除之前的蛇
        remove();
        //把蛇的每一节渲染到地图上
        for (let i = 0; i < this.body.length; i++) {
            let odject = this.body[i];

            let div = document.createElement('div');
            map.appendChild(div);

            //记录蛇
            elements.push(div);
            //设置样式
            div.style.position = 'absolute';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = odject.x * this.width + 'px';
            div.style.top = odject.y * this.height + 'px';
            div.style.backgroundColor = odject.color;

        }
    }

    //私有的成员
    function remove() {
        for (let i = elements.length - 1; i >= 0; i--) {
            //删除div
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组元素
            elements.splice(i, 1);
        }
    }

    //移动 控制
    Snake.prototype.move = function(food, map) {
        //控制蛇身体(当前蛇节的位置到上一个蛇节的位置)
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //控制蛇头
        //判断蛇移动的方向
        let head = this.body[0];
        switch (this.direction) {
            case 'top':
                head.y -= 1;
                break;
            case 'botton':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        //判断蛇头是否和食物重合
        let headx = head.x * this.width;
        let heady = head.y * this.height;
        if (headx === food.x && heady === food.y) {
            //添加蛇节
            //获取最后一节
            let last = this.body[this.body.length - 1];
            this.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                })
                //添加食物
            food.render(map)
        }
    }

    window.Snake = Snake;
})()