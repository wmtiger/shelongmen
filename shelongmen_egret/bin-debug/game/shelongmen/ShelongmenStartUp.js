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
    var ShelongmenStartUp = (function (_super) {
        __extends(ShelongmenStartUp, _super);
        function ShelongmenStartUp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShelongmenStartUp.prototype.registerNet = function () {
        };
        ShelongmenStartUp.prototype.registerUi = function () {
            ui.register(350 /* SHE_LONG_MEN */, shelongmen.ShelongmenScreen);
        };
        ShelongmenStartUp.prototype.startup = function () {
            this.moduleProxy = shelongmen.ShelongmenProxy.inst;
            this.moduleProxy.setServer(cfg.hallServer, dat.hallServerInfoVO);
            _super.prototype.startup.call(this);
            ui.open(350 /* SHE_LONG_MEN */);
        };
        return ShelongmenStartUp;
    }(ssp.ModuleStartup));
    shelongmen.ShelongmenStartUp = ShelongmenStartUp;
    __reflect(ShelongmenStartUp.prototype, "shelongmen.ShelongmenStartUp");
})(shelongmen || (shelongmen = {}));
//# sourceMappingURL=ShelongmenStartUp.js.map