<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { Step, Stepper, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	let form = {
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		userApproved: false
	};
	async function onCompleteHandler(e: Event): Promise<void> {
		// console.log('event:complete', e);
		const response = await fetch('/auth/new-user', {
			method: 'POST',
			body: JSON.stringify(form),
			headers: {
				'content-type': 'application/json'
			}
		});
		await response.json();
		const notificationMessage = 'Your account is now in database and the Admin can verify it';
		const t: ToastSettings = {
			message: notificationMessage,
			background: 'variant-filled-success'
		};
		toastStore.trigger(t);
		invalidateAll();
		goto('/auth');
	}
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<Stepper on:complete={onCompleteHandler}>
	<Step>
		<svelte:fragment slot="header">The user is authorized!</svelte:fragment>
		The user is authorized but is not yet inserted on the database.
	</Step>
	<Step>
		<svelte:fragment slot="header">Be aware of next steps!</svelte:fragment>
		We are going to complete a stepper asking you for all important User meta data and then we going
		to insert this User on the Database.
	</Step>
	<Step>
		<svelte:fragment slot="header">Add User Data</svelte:fragment>
		<form method="POST" action="{$page.route.id}?/create" class="modal-form {cForm}">
			<label class="label">
				<span>First Name</span>
				<input
					type="text"
					name="firstName"
					bind:value={form.firstName}
					class="input"
					placeholder="Enter first name..."
				/>
			</label>
			<label class="label">
				<span>Last name</span>
				<input
					type="text"
					name="lastName"
					bind:value={form.lastName}
					class="input"
					placeholder="Enter last name..."
				/>
			</label>
			<label class="label">
				<span>Phone number</span>
				<input
					type="text"
					name="phone"
					bind:value={form.phone}
					class="input"
					placeholder="Enter phone number..."
				/>
			</label>
			<!-- <input class="hidden" bind:checked={form.userApproved} type="checkbox" name="userApproved" />
			<label class="label">
				<span>User status</span>
				<SlideToggle name="slide" bind:checked={form.userApproved} />
			</label> -->
		</form>
	</Step>
</Stepper>
