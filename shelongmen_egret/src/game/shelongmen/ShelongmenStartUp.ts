module shelongmen {
	export class ShelongmenStartUp extends ssp.ModuleStartup {

		registerNet(): void {

		}

		registerUi(): void {
			ui.register(cst.ui.SHE_LONG_MEN, shelongmen.ShelongmenScreen);
		}

		startup(): void {
			this.moduleProxy = ShelongmenProxy.inst;
			this.moduleProxy.setServer(cfg.hallServer, dat.hallServerInfoVO);
			super.startup();
			ui.open(cst.ui.SHE_LONG_MEN);
		}

	}
}
