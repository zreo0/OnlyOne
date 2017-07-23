var Sprite  = Laya.Sprite;
var Stage   = Laya.Stage;
var Texture = Laya.Texture;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var WebGL   = Laya.WebGL;
var Event   = Laya.Event;
(function() {
    function Role() {
        Role.__super.call(this);
        this.body = null;
        this.init();
    }
    // 注册类
    Laya.class(Role, "Role", laya.display.Sprite);
    var _proto = Role.prototype;
    _proto.init = function() {
        var _this = this;
        Laya.loader.load("../src/res/monkey2.png", Handler.create(this, function(){
			var t = Laya.loader.getRes("../src/res/monkey2.png");
			var ape = new Sprite();
			ape.graphics.drawTexture(t, 0, 0);
			_this.addChild(ape);
			ape.pos(0, 0); 
		}));
    }

    // 移动
    _proto.move = function(direction) {
        var X = this.x;
        var Y = this.y;
        switch (direction) {
            case 119: 
                Y -= 10;
                break;
            case 97: 
                X -= 10;
                break;
            case 115: 
                Y += 10;
                break;
            case 100: 
                X += 10;
                break;
        }
        this.pos(X, Y);
    }
})();

(function() {
    function Game() {
        this.role = null;
        // 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#EEEEEE";

        this.onLoad();
    }
    Laya.class(Game, "Game");
    var _proto = Game.prototype;
    _proto.onLoad = function() {
        var _this = this;
        // 创建角色
        this.role = new Role();
        Laya.stage.addChild(this.role);
        Laya.stage.on(Event.KEY_PRESS, this, function (res) {
            _this.role.move(res.keyCode);    
        });
    }
})();

var gameInstance = new Game();