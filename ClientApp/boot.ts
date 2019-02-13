import "isomorphic-fetch";
import { Aurelia, PLATFORM } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "font-awesome/css/font-awesome.css";

declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {

	aurelia.use.globalResources(["common/dateFormat", "common/freshness", "common/interceptor" ]);

	aurelia.use
		.standardConfiguration()
		.plugin(PLATFORM.moduleName('aurelia-dialog'))
		.plugin(PLATFORM.moduleName('aurelia-validation'));


	//, config => {
	//	config.useDefaults();
	//	config.settings.lock = true;
	//	config.settings.centerHorizontalOnly = false;
	//	config.settings.startingZIndex = 5;
	//}

	//.plugin('aurelia-dialog');

	if (IS_DEV_BUILD) {
		aurelia.use.developmentLogging();
	}

	new HttpClient().configure(config => {

		const baseUrl = document.getElementsByTagName("base")[0].href;

		config.withBaseUrl(baseUrl);
	});

	aurelia.start().then(() => aurelia.setRoot("shell"));
}
