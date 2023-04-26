<script lang="ts">
	import { modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let formResult: any;
	let status;
	let resultMessage: string;
	//TOAST MESSAGE
	const t: ToastSettings = {
		message: 'Search by filters ...',
		timeout: 3000
	};
	//Handle submit
	function handleSubmit() {
		modalStore.close();
		toastStore.trigger(t);
	}

	$: createToastsNotifications(formResult);
	function createToastsNotifications(formResult: any) {
		if (!formResult) return;
		const status = formResult.status ?? 200;
		const resultMessage: string = formResult.data.form.message;
		if (status === 400) {
			//In this case you have to display on your form the errors (hint use superforms $errors)
		}
		if (status > 400) {
			//form validation error
			const t: ToastSettings = {
				message: resultMessage,
				timeout: 3000
			};
			toastStore.trigger(t);
			// modalStore.close();
		}
		if (status <= 201) {
			//on success we close modal
			const t: ToastSettings = {
				message: resultMessage,
				timeout: 3000
			};
			toastStore.trigger(t);
			modalStore.close();
		}
	}
</script>
