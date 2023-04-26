<script lang="ts">
	export let formResult: any;

	$: createToastsNotifications(formResult);
	function createToastsNotifications(formResult: any) {
		if (!formResult) return;

		const status = formResult.status ?? 200;
		if (status === 400) {
			//form validation error
			console.log({
				status,
				msg: 'form validation error,Error msg is :',
				message2: formResult.data.form.message
			});
		}
		if (status > 400) {
			//form validation error
			console.log({
				status,
				msg: 'form is valid but we run into another error,Error msg is :',
				message2: formResult.data.form.message
			});
		}
		if (status <= 201) {
			//form validation error
			console.log({
				status,
				msg: 'Request completed successfully,Msg is :',
				message2: formResult.data.form.message
			});
		}
	}
</script>
