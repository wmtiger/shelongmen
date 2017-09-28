module pkcard {
	export class PkCard {
		view: fairygui.GComponent;

		private _data: CardData;

		private _bg: fairygui.GImage;
		private _num: fairygui.GImage;

		protected _win: fairygui.GImage;

		isback: boolean = false;

		public constructor() {
			this.view = fairygui.UIPackage.createObject("shelongmen_pkg", "CardFace").asCom

			this._bg = new fairygui.GImage()
			this.view.addChildAt(this._bg, 0);
			this._num = new fairygui.GImage()
			this.view.addChildAt(this._num, 1);
			this._num.setXY(8, 8)

			this._win = this.view.getChild('win').asImage;
			this._win.visible = false;
		}

		get data(): CardData {
			return this._data;
		}

		set data(d: CardData) {
			this._data = d;
		}

		showFace() {
			this._num.visible = true;
			let color = 'BLACK'
			if (this.data.flower == '1' || this.data.flower == '2') {
				color = 'RED'
			}
			this._num.texture = RES.getRes(color + this.data.num + '_png');
			this._bg.texture = RES.getRes('CARD' + this.data.flower + '_png');
			this.isback = false;

		}
		showBack() {
			this._num.visible = false;
			this._bg.texture = RES.getRes('cardback_big_png');
			this.isback = true;
		}

		flopCard(type) {
			this.view.pivotX = 0.5
			egret.Tween.get(this.view).set({ scaleX: 1 }).to({ scaleX: 0.05 }, 200).call(() => {
				if (type == 0) {
					this.showBack();
				} else {
					this.showFace();
				}
			}).to({ scaleX: 1 }, 200);
		}

		showWin(show:boolean = false) {
			this._win.visible = show
		}
	}

}