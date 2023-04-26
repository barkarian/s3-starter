<script lang="ts">
	import { page } from '$app/stores';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import FormNotifications from '$lib/components/FormNotifications.svelte';
	export let parent: any;
	export let data: PageData;
	let formResult: any;

	const { createForm: formData } = data;
	const { form, errors, constraints, enhance, delayed, message, empty, valid } = superForm(
		formData,
		{
			onResult: (e) => {
				formResult = e.result;
			}
		}
	);
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	//Handle submit
	function handleSubmit() {
		console.log('SUBMITTED');
	}
	//reactive form components
	let selectUserApproved = 'non-approved';
	let userApproved = false;
</script>

<FormNotifications {formResult} />

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<SuperDebug data={$form} />
		<header class={cHeader}>{$modalStore[0].title ?? 'Add Filters Modals'}</header>
		<article>
			{$modalStore[0].body ?? 'Please add one or more filters from the form below...'}
		</article>
		<!-- Enable for debugging: -->
		<!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
		<form method="POST" action="{$page.route.id}?/create" use:enhance class="modal-form {cForm}">
			<label class="label">
				<span>First Name</span>
				<input
					class="input"
					type="text"
					name="firstName"
					bind:value={$form.firstName}
					placeholder="Enter first name..."
				/>
			</label>
			<label class="label">
				<span>Last name</span>
				<input
					class="input"
					type="text"
					name="lastName"
					bind:value={$form.lastName}
					placeholder="Enter last name..."
				/>
			</label>
			<label class="label">
				<span>Email</span>
				<input
					class="input"
					type="email"
					name="email"
					bind:value={$form.email}
					placeholder="Enter email address..."
				/>
			</label>
			<label class="label">
				<span>Phone number</span>
				<input
					class="input"
					type="text"
					name="phone"
					bind:value={$form.phone}
					placeholder="Enter phone number..."
				/>
			</label>
			<input class="hidden" bind:checked={userApproved} type="checkbox" name="userApproved" />
			<label class="label">
				<span>User status</span>
				<select
					bind:value={selectUserApproved}
					on:change={() => (userApproved = selectUserApproved === 'non-approved' ? false : true)}
					class="select"
					size="2"
				>
					<option value="approved">Approved</option>
					<option value="non-approved">Non approved</option>
				</select>
			</label>
			<!-- prettier-ignore -->
			<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button type="submit" class="btn {parent.buttonPositive}" on:click={handleSubmit}>Submit Form</button>
			</footer>
		</form>
	</div>
{/if}
