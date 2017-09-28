var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var pkcard;
(function (pkcard) {
    var PkCard = (function () {
        function PkCard() {
            this.isback = false;
            this.view = fairygui.UIPackage.createObject("shelongmen_pkg", "CardFace").asCom;
            this._bg = new fairygui.GImage();
            this.view.addChildAt(this._bg, 0);
            this._num = new fairygui.GImage();
            this.view.addChildAt(this._num, 1);
            this._num.setXY(8, 8);
            this._win = this.view.getChild('win').asImage;
            this._win.visible = false;
        }
        Object.defineProperty(PkCard.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (d) {
                this._data = d;
            },
            enumerable: true,
            configurable: true
        });
        PkCard.prototype.showFace = function () {
            this._num.visible = true;
            var color = 'BLACK';
            if (this.data.flower == '1' || this.data.flower == '2') {
                color = 'RED';
            }
            this._num.texture = RES.getRes(color + this.data.num + '_png');
            this._bg.texture = RES.getRes('CARD' + this.data.flower + '_png');
            this.isback = false;
        };
        PkCard.prototype.showBack = function () {
            this._num.visible = false;
            this._bg.texture = RES.getRes('cardback_big_png');
            this.isback = true;
        };
        PkCard.prototype.flopCard = function (type) {
            var _this = this;
            this.view.pivotX = 0.5;
            egret.Tween.get(this.view).set({ scaleX: 1 }).to({ scaleX: 0.05 }, 200).call(function () {
                if (type == 0) {
                    _this.showBack();
                }
                else {
                    _this.showFace();
                }
            }).to({ scaleX: 1 }, 200);
        };
        PkCard.prototype.showWin = function (show) {
            if (show === void 0) { show = false; }
            this._win.visible = show;
        };
        return PkCard;
    }());
    pkcard.PkCard = PkCard;
    __reflect(PkCard.prototype, "pkcard.PkCard");
})(pkcard || (pkcard = {}));
//# sourceMappingURL=PkCard.js.map