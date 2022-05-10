(function() {
    let elements = [];

    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;

        this.width = options.width || 20;
        this.height = options.height || 20;

        this.color = options.color || 'red';
    }

    //渲染食物
    Food.prototype.render = function(map) {
        //删除div 和数组的元素
        remove();

        this.x = random(0, map.offsetWidth / this.width - 1) * this.width;
        this.y = random(0, map.offsetHeight / this.height - 1) * this.height;

        // 创建div
        let div = document.createElement('div');
        map.appendChild(div);
        elements.push(div);

        //设置样式
        div.style.position = 'absolute';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
    }

    function remove() {
        for (let i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }

    window.Food = Food;
})()