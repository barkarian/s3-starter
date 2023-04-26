<script lang="ts">
	import { modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { FiltersQueryParams } from './Service';
	import { page } from '$app/stores';
	import HiddenFormInputPaginatorSettings from '$lib/components/HiddenFormInputPaginatorSettings.svelte';
	export let parent: any;

	//find configurations from findManyActionName
	export let filters: FiltersQueryParams;
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

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
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? 'Add Filters Modals'}</header>
		<article>
			{$modalStore[0].body ?? 'Please add one or more filters from the form below...'}
		</article>
		<!-- Enable for debugging: -->
		<!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
		<form action={$page.route.id} method="GET" class="modal-form {cForm}">
			<!-- Don't remove them they are used to keep paginator settings after filtering -->
			<!-- <input class="hidden" type="text" name="page" bind:value={currentPage} />
			<input class="hidden" type="text" name="limit" bind:value={limit} /> -->
			<HiddenFormInputPaginatorSettings />
			<!-- Don't remove them they are used to keep paginator settings after filtering -->

			<label class="label">
				<span>First name</span>
				<input
					class="input"
					type="text"
					name="firstName"
					bind:value={filters.firstName}
					placeholder="Enter first name..."
				/>
			</label>
			<label class="label">
				<span>Last name</span>
				<input
					class="input"
					type="text"
					name="lastName"
					bind:value={filters.lastName}
					placeholder="Enter last name..."
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
