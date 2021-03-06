import { inject } from 'aurelia-framework';
import { DataRepository } from '../services/dataRepository';
import { ValidationRules, ValidationController, validateTrigger } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../common/bootstrap-form-renderer';
//import { BootstrapFormValidationRenderer } from '../common/bootstrap-form-validation-renderer';
import { IJob } from "./Job";

@inject(DataRepository, ValidationController)
export class AddJob {

	job: IJob;

	dataRepository: DataRepository;

	states: any;

	jobSkills: any;

	jobTypes: any;

	controller: ValidationController;

	router: any;

	constructor(dataRepository: DataRepository, controller: ValidationController) {

		this.job = { title: "", jobType: "Full Time", description: "", needDate: new Date(), jobSkills: [] };

		this.dataRepository = dataRepository;

		this.dataRepository.getStates().then(states => {
			this.states = states;
		});

		this.dataRepository.getJobTypes().then(jobTypes => {
			this.jobTypes = jobTypes;
		})

		this.dataRepository.getJobSkills().then(jobSkills => {
			this.jobSkills = jobSkills;
		});

		this.controller = controller;

		this.controller.validateTrigger = validateTrigger.change;

		//this.controller.addRenderer(new BootstrapFormRenderer());

		ValidationRules.customRule(
			'notCEO',
			(value, object) => value !== 'CEO',
			`nice try, \${$displayName} cannot be \${$value}`
		);

		ValidationRules
			.ensure((j: IJob) => j.title)
			.required()
			.minLength(3)
			.satisfiesRule('notCEO')
			.on(this.job);

	}

	activate(params, routeConfig, navigationInstruction) {
		this.router = navigationInstruction.router;
	}

	save() {

		console.log(this.job);

		if (this.controller.errors && this.controller.errors.length > 0) return;

		if (this.job.needDate) {
			this.job.needDate = new Date(this.job.needDate);
		}


		this.dataRepository.addJob(this.job).then(job => this.router.navigateToRoute('jobs'));
	}


}