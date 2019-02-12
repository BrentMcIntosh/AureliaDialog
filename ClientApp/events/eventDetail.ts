import { PLATFORM, inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';
import { DialogService } from 'aurelia-dialog';
import { EditDialog } from './EditDialog';

@inject(DataRepository, DialogService)
export class EventDetail {

	dataRepository: DataRepository;
	dialogService: DialogService;

	event: any;

	constructor(dataRepository, dialogService) {
		this.dataRepository = dataRepository;
		this.dialogService = dialogService;
	}	

	activate(params, routeConfig) {
		this.event = this.dataRepository.getEvent(parseInt(params.eventId));
	}

	editEvent(event) {

		var original = JSON.parse(JSON.stringify(event));

		// this.dialogService.open({ viewModel: EditDialog, model: this.event })

		// It’s because WebPack doesn’t know your MyDialog module exists. 
		// I have no idea how it ever works, even in dev mode, but the fix is to use the PLATFORM.moduleName feature.

		// this.dialogService.open({ viewModel: PLATFORM.moduleName('./EditDialog'), model: this.event, lock: false })


		this.dialogService.open({ viewModel: EditDialog, model: this.event })
		.then( result => {
			if (result.wasCancelled) {
				this.event.title = original.title;
				this.event.description = original.description;
			}
		})
	}
}