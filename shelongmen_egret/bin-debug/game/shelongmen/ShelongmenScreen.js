var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var shelongmen;
(function (shelongmen) {
    var SHE_LONG_MEN_STATE;
    (function (SHE_LONG_MEN_STATE) {
        SHE_LONG_MEN_STATE[SHE_LONG_MEN_STATE["BET_TIME"] = 0] = "BET_TIME";
        SHE_LONG_MEN_STATE[SHE_LONG_MEN_STATE["DEAL_CARD"] = 1] = "DEAL_CARD";
        SHE_LONG_MEN_STATE[SHE_LONG_MEN_STATE["OPEN_CARD"] = 2] = "OPEN_CARD";
        SHE_LONG_MEN_STATE[SHE_LONG_MEN_STATE["SETTLE"] = 3] = "SETTLE";
        SHE_LONG_MEN_STATE[SHE_LONG_MEN_STATE["RESET"] = 4] = "RESET";
    })(SHE_LONG_MEN_STATE = shelongmen.SHE_LONG_MEN_STATE || (shelongmen.SHE_LONG_MEN_STATE = {}));
    function getShelongmenProxy() {
        return ShelongmenProxy.inst;
    }
    shelongmen.getShelongmenProxy = getShelongmenProxy;
    var ShelongmenProxy = (function (_super) {
        __extends(ShelongmenProxy, _super);
        function ShelongmenProxy() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cards = [];
            _this.myMoney = 100000;
            return _this;
        }
        Object.defineProperty(ShelongmenProxy, "inst", {
            get: function () {
                if (ShelongmenProxy._inst == null) {
                    ShelongmenProxy._inst = new ShelongmenProxy();
                }
                return ShelongmenProxy._inst;
            },
            enumerable: true,
            configurable: true
        });
        ShelongmenProxy.prototype.createCards = function () {
            this.cards = pkcard.getRandomDatas();
        };
        return ShelongmenProxy;
    }(ssp.ModuleProxy));
    shelongmen.ShelongmenProxy = ShelongmenProxy;
    __reflect(ShelongmenProxy.prototype, "shelongmen.ShelongmenProxy");
    var ShelongmenScreen = (function (_super) {
        __extends(ShelongmenScreen, _super);
        function ShelongmenScreen() {
            var _this = _super.call(this, ShelongmenScreen.NAME) || this;
            _this.rewardPoolValue = 0;
            _this.mySelectedBet = 0; // 我选中的下注尺度
            _this.crtState = 0;
            _this._updateInterval = -1;
            _this.cardTox = [596, 496, 596, 696, 446, 596, 746];
            _this.cardToy = [120, 252, 252, 252, 382, 382, 382];
            _this.fairyPkgName = 'shelongmen_pkg';
            _this.fairyResName = 'Table';
            _this.resGroup = ['shelongmen', 'card']; // shelongmen
            return _this;
        }
        ShelongmenScreen.prototype._initCommonPack = function () {
            // 不需要加载common
        };
        ShelongmenScreen.prototype.startUpdate = function () {
            this._updateInterval = egret.setInterval(this.onUpdate, this, 60);
        };
        ShelongmenScreen.prototype.onUpdate = function () {
            this.flushRewardPool();
        };
        ShelongmenScreen.prototype.flushRewardPool = function () {
            if (SHE_LONG_MEN_STATE.BET_TIME == this.crtState) {
                this.rewardPool.getChild('txt').text = '' + this.rewardPoolValue;
            }
        };
        ShelongmenScreen.prototype.getBetNum = function (bet) {
            var num = 0;
            if (bet == 1) {
                num = 100;
            }
            else if (bet == 2) {
                num = 1000;
            }
            else if (bet == 3) {
                num = 10000;
            }
            else if (bet == 4) {
                num = 100000;
            }
            else if (bet == 5) {
                num = 1000000;
            }
            return num;
        };
        ShelongmenScreen.prototype.dealCard = function () {
            var len = this.cards.length;
            egret.Tween.get(this.cards[0].view).to({ x: this.cardTox[0], y: this.cardToy[0] }, 200, egret.Ease.sineOut);
            egret.Tween.get(this.cards[1].view).wait(100).to({ x: this.cardTox[1], y: this.cardToy[1] }, 200, egret.Ease.sineOut);
            egret.Tween.get(this.cards[2].view).wait(200).to({ x: this.cardTox[2], y: this.cardToy[2] }, 200, egret.Ease.sineOut);
            egret.Tween.get(this.cards[3].view).wait(300).to({ x: this.cardTox[3], y: this.cardToy[3] }, 200, egret.Ease.sineOut);
            egret.Tween.get(this.cards[4].view).wait(400).to({ x: this.cardTox[4], y: this.cardToy[4] }, 200, egret.Ease.sineOut);
            egret.Tween.get(this.cards[5].view).wait(500).to({ x: this.cardTox[5], y: this.cardToy[5] }, 200, egret.Ease.sineOut);
            egret.Tween.get(this.cards[6].view).wait(600).to({ x: this.cardTox[6], y: this.cardToy[6] }, 200, egret.Ease.sineOut)
                .call(this.cardDealOver, this);
        };
        ShelongmenScreen.prototype.cardDealOver = function () {
            // over
            this.setState(SHE_LONG_MEN_STATE.OPEN_CARD);
        };
        ShelongmenScreen.prototype.openCard = function () {
            this.cards[0].flopCard(1);
            this.cards[4].flopCard(1);
            this.cards[6].flopCard(1);
        };
        ShelongmenScreen.prototype.settle = function () {
        };
        ShelongmenScreen.prototype.setState = function (state) {
            this.crtState = state;
            switch (state) {
                case SHE_LONG_MEN_STATE.BET_TIME:
                    break;
                case SHE_LONG_MEN_STATE.DEAL_CARD:
                    this.dealCard();
                    break;
                case SHE_LONG_MEN_STATE.OPEN_CARD:
                    this.openCard();
                    break;
                case SHE_LONG_MEN_STATE.SETTLE:
                    this.settle();
                    break;
                case SHE_LONG_MEN_STATE.RESET:
                    this.reset();
                    break;
                default:
                    break;
            }
        };
        ShelongmenScreen.prototype.onInit = function () {
            var bg = new fairygui.GImage();
            bg.texture = RES.getRes('majiang_desk_bg_png');
            bg.width = this.view.width;
            bg.height = this.view.height;
            this.view.addChildAt(bg, 0);
            this.betChip0 = this.getChild('betBar.chip0').asButton;
            this.betChip1 = this.getChild('betBar.chip1').asButton;
            this.betChip2 = this.getChild('betBar.chip2').asButton;
            this.betChip3 = this.getChild('betBar.chip3').asButton;
            this.betChip4 = this.getChild('betBar.chip4').asButton;
            this.btnStart = this.getChild('betBar.btnStart').asButton;
            this.betSelected = this.getChild('betBar.selected').asCom;
            this.rewardPool = this.getChild('rewardPool').asCom;
            this.myHead = this.getChild('myHead').asCom;
            this.cards = [];
            for (var i = 0; i < 7; i++) {
                var c = new pkcard.PkCard();
                this.cards.unshift(c);
                this.view.addChild(c.view);
                c.view.addClickListener(this.onCardClick, this);
            }
            this.startUpdate();
            this.reset();
        };
        ShelongmenScreen.prototype.getCardByComp = function (com) {
            for (var i = 0; i < 7; i++) {
                var c = this.cards[i];
                if (c.view === com) {
                    return i;
                }
            }
            return -1;
        };
        ShelongmenScreen.prototype.onCardClick = function (e) {
            var idx = this.getCardByComp(e.currentTarget);
            if (idx > -1) {
                var c = this.cards[idx];
                var isHit = false;
                if (c.isback && this.crtState == SHE_LONG_MEN_STATE.OPEN_CARD) {
                    c.flopCard(1);
                    if (idx == 1) {
                        // 判断 0 4
                        isHit = this.chkHit(this.cards[4].data, this.cards[0].data, this.cards[1].data);
                        if (isHit) {
                            c.showWin(true);
                        }
                    }
                    else if (idx == 2) {
                        isHit = this.chkHit(this.cards[1].data, this.cards[3].data, this.cards[2].data);
                        if (isHit) {
                            c.showWin(true);
                        }
                    }
                    else if (idx == 3) {
                        isHit = this.chkHit(this.cards[0].data, this.cards[6].data, this.cards[3].data);
                        if (isHit) {
                            c.showWin(true);
                        }
                    }
                    else if (idx == 5) {
                        isHit = this.chkHit(this.cards[4].data, this.cards[6].data, this.cards[5].data);
                        if (isHit) {
                            c.showWin(true);
                        }
                    }
                }
            }
        };
        ShelongmenScreen.prototype.chkHit = function (a, b, h) {
            // 判断是否击中
            var max = Math.max(a.num, b.num);
            var min = Math.min(a.num, b.num);
            if (max - min > 1) {
                if (max > h.num && h.num > min) {
                    return true;
                }
            }
            else {
                if (max == h.num || min == h.num) {
                    return true;
                }
            }
            return false;
        };
        ShelongmenScreen.prototype.reset = function () {
            getShelongmenProxy().createCards();
            this.cardDatas = getShelongmenProxy().cards;
            for (var i = 0; i < this.cards.length; i++) {
                var c = this.cards[i];
                c.data = this.cardDatas[i];
                c.showBack();
                c.view.x = 240;
                c.view.y = 120 + i;
            }
            this.rewardPool.getChild('txt').text = '0';
            this.rewardPoolValue = 0;
            // this.start()
        };
        ShelongmenScreen.prototype.start = function () {
            this.setState(SHE_LONG_MEN_STATE.DEAL_CARD);
        };
        ShelongmenScreen.prototype.onClick = function (target) {
            switch (target) {
                case this.betChip0:
                    this.mySelectedBet = 0;
                    this.betSelected.x = 5;
                    break;
                case this.betChip1:
                    this.mySelectedBet = 1;
                    this.betSelected.x = 121;
                    break;
                case this.betChip2:
                    this.mySelectedBet = 2;
                    this.betSelected.x = 237;
                    break;
                case this.betChip3:
                    this.mySelectedBet = 3;
                    this.betSelected.x = 353;
                    break;
                case this.betChip4:
                    this.mySelectedBet = 4;
                    this.betSelected.x = 469;
                    break;
                case this.btnStart:
                    if (SHE_LONG_MEN_STATE.BET_TIME == this.crtState) {
                        this.start();
                    }
                    break;
            }
        };
        ShelongmenScreen.NAME = 'ShelongmenScreen';
        return ShelongmenScreen;
    }(ui.SspScreen));
    shelongmen.ShelongmenScreen = ShelongmenScreen;
    __reflect(ShelongmenScreen.prototype, "shelongmen.ShelongmenScreen");
})(shelongmen || (shelongmen = {}));
//# sourceMappingURL=ShelongmenScreen.js.map