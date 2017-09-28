module shelongmen {
	export enum SHE_LONG_MEN_STATE {
		BET_TIME = 0,
		DEAL_CARD,
		OPEN_CARD,
		SETTLE,
		RESET
	}
	export function getShelongmenProxy(): ShelongmenProxy {
		return ShelongmenProxy.inst;
	}
	export class ShelongmenProxy extends ssp.ModuleProxy {
		static _inst: ShelongmenProxy;
		static get inst(): ShelongmenProxy {
			if (ShelongmenProxy._inst == null) {
				ShelongmenProxy._inst = new ShelongmenProxy();
			}
			return ShelongmenProxy._inst;
		}

		cards: pkcard.CardData[] = [];

		createCards() {
			this.cards = pkcard.getRandomDatas();
		}

		myMoney: number = 100000;
	}

	export class ShelongmenScreen extends ui.SspScreen {
		static NAME: string = 'ShelongmenScreen';
		constructor() {
			super(ShelongmenScreen.NAME);
			this.fairyPkgName = 'shelongmen_pkg';
			this.fairyResName = 'Table';
			this.resGroup = ['shelongmen', 'card'];// shelongmen
		}

		betChip0: fairygui.GButton;
		betChip1: fairygui.GButton;
		betChip2: fairygui.GButton;
		betChip3: fairygui.GButton;
		betChip4: fairygui.GButton;
		btnStart: fairygui.GButton;
		betSelected: fairygui.GComponent;

		rewardPool: fairygui.GComponent;
		rewardPoolValue: number = 0;

		cardDatas: pkcard.CardData[];// 每次开局重新洗牌，取前7张
		cards: pkcard.PkCard[];

		mySelectedBet: number = 0;// 我选中的下注尺度

		myHead: fairygui.GComponent;

		crtState: number = 0;

		protected _initCommonPack() {
			// 不需要加载common
		}

		protected _updateInterval: number = -1;
		startUpdate() {
			this._updateInterval = egret.setInterval(this.onUpdate, this, 60);
		}

		onUpdate() {
			this.flushRewardPool();
		}

		protected flushRewardPool() {
			if (SHE_LONG_MEN_STATE.BET_TIME == this.crtState) {
				this.rewardPool.getChild('txt').text = '' + this.rewardPoolValue;
			}
		}
		protected getBetNum(bet) {
			let num = 0;
			if (bet == 1) {
				num = 100;
			} else if (bet == 2) {
				num = 1000;
			} else if (bet == 3) {
				num = 10000;
			} else if (bet == 4) {
				num = 100000;
			} else if (bet == 5) {
				num = 1000000;
			}
			return num;
		}

		protected cardTox = [596, 496, 596, 696, 446, 596, 746];
		protected cardToy = [120, 252, 252, 252, 382, 382, 382];
		protected dealCard() {
			let len = this.cards.length
			egret.Tween.get(this.cards[0].view).to({ x: this.cardTox[0], y: this.cardToy[0] }, 200, egret.Ease.sineOut)
			egret.Tween.get(this.cards[1].view).wait(100).to({ x: this.cardTox[1], y: this.cardToy[1] }, 200, egret.Ease.sineOut)
			egret.Tween.get(this.cards[2].view).wait(200).to({ x: this.cardTox[2], y: this.cardToy[2] }, 200, egret.Ease.sineOut)
			egret.Tween.get(this.cards[3].view).wait(300).to({ x: this.cardTox[3], y: this.cardToy[3] }, 200, egret.Ease.sineOut)
			egret.Tween.get(this.cards[4].view).wait(400).to({ x: this.cardTox[4], y: this.cardToy[4] }, 200, egret.Ease.sineOut)
			egret.Tween.get(this.cards[5].view).wait(500).to({ x: this.cardTox[5], y: this.cardToy[5] }, 200, egret.Ease.sineOut)
			egret.Tween.get(this.cards[6].view).wait(600).to({ x: this.cardTox[6], y: this.cardToy[6] }, 200, egret.Ease.sineOut)
				.call(this.cardDealOver, this);
		}
		protected cardDealOver() {
			// over
			this.setState(SHE_LONG_MEN_STATE.OPEN_CARD);
		}

		protected openCard() {
			this.cards[0].flopCard(1)
			this.cards[4].flopCard(1)
			this.cards[6].flopCard(1)
		}

		protected settle() {
		}

		setState(state) {
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
		}

		onInit(): void {

			let bg: fairygui.GImage = new fairygui.GImage();
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
				this.view.addChild(c.view)
				c.view.addClickListener(this.onCardClick, this);
			}

			this.startUpdate();
			this.reset();
		}

		private getCardByComp(com: fairygui.GComponent) {
			for (var i = 0; i < 7; i++) {
				var c = this.cards[i];
				if (c.view === com) {
					return i;
				}
			}
			return -1;
		}

		onCardClick(e: egret.TouchEvent) {
			let idx = this.getCardByComp(e.currentTarget);
			
			if (idx > -1) {
				let c = this.cards[idx];
				let isHit: boolean = false;
				if (c.isback && this.crtState == SHE_LONG_MEN_STATE.OPEN_CARD) {
					c.flopCard(1);
					if (idx == 1) {
						// 判断 0 4
						isHit = this.chkHit(this.cards[4].data, this.cards[0].data, this.cards[1].data)
						if (isHit) {
							c.showWin(true);
						}
					} else if (idx == 2) {
						isHit = this.chkHit(this.cards[1].data, this.cards[3].data, this.cards[2].data)
						if (isHit) {
							c.showWin(true);
						}
					}else if (idx == 3) {
						isHit = this.chkHit(this.cards[0].data, this.cards[6].data, this.cards[3].data)
						if (isHit) {
							c.showWin(true);
						}
					}else if (idx == 5) {
						isHit = this.chkHit(this.cards[4].data, this.cards[6].data, this.cards[5].data)
						if (isHit) {
							c.showWin(true);
						}
					}
				}
			}
		}

		protected chkHit(a: pkcard.CardData, b: pkcard.CardData, h: pkcard.CardData) {
			// 判断是否击中
			let max = Math.max(a.num, b.num);
			let min = Math.min(a.num, b.num);
			if(max - min > 1){
				if(max > h.num && h.num > min){
					return true;
				}
			} else {
				if (max == h.num || min == h.num) {
					return true;
				}
			}
			return false;
		}

		reset(): void {
			getShelongmenProxy().createCards()
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
		}

		start(): void {
			this.setState(SHE_LONG_MEN_STATE.DEAL_CARD)
		}

		onClick(target: fairygui.GObject): void {
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
		}
	}
}