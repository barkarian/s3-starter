<script lang="ts">
	import { modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { FiltersQueryParams } from './Service';
	import { page } from '$app/stores';
	import HiddenFormInputPaginatorSettings from '$lib/components/HiddenFormInputPaginatorSettings.svelte';
	export let parent: any;

	//find configurations from findManyActionName
	let filters: FiltersQueryParams = {
		firstName: $page.url.searchParams.get('firstName') ?? '',
		lastName: $page.url.searchParams.get('lastName') ?? '',
		email: $page.url.searchParams.get('email') ?? ''
	};
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

	//TOAST MESSAGE
	const t: ToastSettings = {
		message: 'Filters are set...',
		timeout: 3000
	};
	//Handle submit
	function handleSubmit() {
		modalStore.close();
		toastStore.trigger(t);
	}
</script>

{#if $modalStore[0]}
	<p>Filter Form</p>
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
		{$page.route.id}
		<form action={$page.route.id} method="GET" class="modal-form {cForm}">
			<!-- Don't remove them they are used to keep paginator settings after filtering -->
			<!-- <input class="hidden" type="text" name="page" bind:value={currentPage} />
			<input class="hidden" type="text" name="limit" bind:value={limit} /> -->
			<HiddenFormInputPaginatorSettings />
			<!-- Don't remove them they are used to keep paginator settings after filtering -->

			<label class="label">
				<span>Name</span>
				<input
					class="input"
					type="text"
					name="firstName"
					bind:value={filters.firstName}
					placeholder="Enter name..."
				/>
			</label>
			<label class="label">
				<span>Phone Number</span>
				<input
					class="input"
					type="text"
					name="lastName"
					bind:value={filters.lastName}
					placeholder="Enter phone..."
				/>
			</label>
			<label class="label">
				<span>Email</span>
				<input
					class="input"
					type="text"
					name="email"
					bind:value={filters.email}
					placeholder="Enter email address..."
				/>
			</label>
			<!-- prettier-ignore -->
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
				<button type="submit" class="btn {parent.buttonPositive}" on:click={handleSubmit}>Submit Form</button>
			</footer>
		</form>
	</div>
{/if}
