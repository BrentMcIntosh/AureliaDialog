export class NotificationPayload {

	time: any;

	constructor(time) {

		this.time = time;

		console.log("NotificationPayload constructor");

		console.log(time);
	}
}