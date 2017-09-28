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
    var ShelongmenLoadingScreen = (function (_super) {
        __extends(ShelongmenLoadingScreen, _super);
        function ShelongmenLoadingScreen() {
            var _this = _super.call(this, ShelongmenLoadingScreen.NAME) || this;
            _this.fairyPkgName = "loading_pkg";
            _this.fairyResName = "Loading";
            _this.resGroup = ["loading"];
            _this.parentLayer = ui.loadingLayer;
            return _this;
        }
        // _textField: fairygui.GTextField;
        ShelongmenLoadingScreen.prototype.onInit = function () {
            this._progress = this.view.getChild("bar").asProgress;
            // this._progress.max = 1;
            // this._textField = this.view.getChild("loadingTxt").asTextField;
        };
        ShelongmenLoadingScreen.prototype._initCommonPack = function () { };
        ShelongmenLoadingScreen.prototype.onResLoaded = function (evt) {
            if (!this._startLoading) {
                this._startLoading = true;
                this.showUi();
            }
            // console.log('progress',this._loader.progress);
            this._progress.value = Math.floor(this._loader.progress * 100);
            // this._textField.text = Math.floor(this._progress.value*100)+"%";
        };
        ShelongmenLoadingScreen.prototype.onResComplete = function (evt) {
            this._progress.value = 100;
            this._loader.removeEventListener("loading", this.onResLoaded, this);
            this._loader.removeEventListener("complete", this.onResComplete, this);
            if (this._completeFunction != null) {
                this._completeFunction.apply(this._completeThisObj);
                this._completeFunction = null;
            }
        };
        ShelongmenLoadingScreen.prototype.load = function (groups, complete, thisObj) {
            if (this._loader == null) {
                this._loader = new utils.ResLoader();
                this._loader.showTime = 500;
            }
            this._loader.addEventListener("loading", this.onResLoaded, this);
            this._loader.addEventListener("complete", this.onResComplete, this);
            this._completeFunction = complete;
            this._completeThisObj = thisObj;
            if (groups == null || groups.length == 0) {
                egret.log("显示的界面，没有指定所用到的资源组");
                return;
            }
            this._startLoading = false;
            this._loader.loadGroups(groups);
        };
        ShelongmenLoadingScreen.prototype.hideUi = function () {
            if (!this._startLoading)
                _super.prototype.hideUi.call(this);
            else {
                egret.Tween.get(this.view)
                    .to({ alpha: 0 }, 1000)
                    .call(_super.prototype.hideUi, this);
            }
        };
        ShelongmenLoadingScreen.NAME = "ShelongmenLoadingScreen";
        return ShelongmenLoadingScreen;
    }(ui.SspScreen));
    shelongmen.ShelongmenLoadingScreen = ShelongmenLoadingScreen;
    __reflect(ShelongmenLoadingScreen.prototype, "shelongmen.ShelongmenLoadingScreen", ["ui.ILoadingScreen"]);
})(shelongmen || (shelongmen = {}));
//# sourceMappingURL=ShelongmenLoadingScreen.js.map