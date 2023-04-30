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

	$: createToastsNotifications(formResult);
	function createToastsNotifications(formResult: any) {
		if (!formResult) return;
		const status = formResult.status ?? 200;
		const resultMessage: string = formResult.data.form.message;
		if (status === 400) {
			//In this case you have to display on your form the errors (hint use superforms $errors)
			console.log({ formResult, errors: formResult.data.form.errors });
			const t: ToastSettings = {
				message: formResult.data.form.errors.roles,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
		if (status > 400) {
			//form validation error
			const t: ToastSettings = {
				message: resultMessage,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
			// modalStore.close();
		}
		if (status <= 201) {
			//on success we close modal
			const t: ToastSettings = {
				message: resultMessage,
				timeout: 3000,
				background: 'variant-filled-success'
			};
			toastStore.trigger(t);
			modalStore.close();
		}
	}
</script>

<div class="variant-filler" />
