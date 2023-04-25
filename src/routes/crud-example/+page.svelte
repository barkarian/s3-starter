<script lang="ts">
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import CrudElement from './RUDElement.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { PUBLIC_DEFAULT_LIMIT } from '$env/static/public';

	export let data;

	let selection: any | null = null;
	//Table Data

	//Table Settings
	$: tableSimple = {
		// A list of heading labels.
		head: ['Name', 'Symbol', 'Weight'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(data.configurationData?.data ?? [], ['email', 'firstName', 'lastName']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(data.configurationData?.data ?? [], [
			'id',
			'email',
			'firstName',
			'lastName',
			'phone',
			'totalRevenue',
			'userApproved',
			'properties'
		]),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code>31.7747</code>']
	};

	function mySelectionHandler(rowMetaValue: any) {
		selection = rowMetaValue.detail;
		modalStore.trigger(createModal());
	}

	// PaginatorSettings
	//find configurations from findManyActionName
	let paginationSettings = {
		offset: Number($page.url.searchParams.get('page') ?? 1),
		limit: Number($page.url.searchParams.get('limit') ?? PUBLIC_DEFAULT_LIMIT),
		size: data.configurationData?.pagination?.totalCount ?? 0,
		amounts: [1, 2, 5, 10]
	};
	//$: updatePageOnPaginationChange(paginationSettings.offset, paginationSettings.limit);

	function onPageChange(e: CustomEvent): void {
		updatePageOnPaginationChange(paginationSettings.offset, paginationSettings.limit);
		console.log('event:page', e.detail);
	}

	function onAmountChange(e: CustomEvent): void {
		paginationSettings.offset = 0;
		updatePageOnPaginationChange(paginationSettings.offset, e.detail);
		console.log('event:amount', e.detail);
	}

	function updatePageOnPaginationChange(page: number, limit: number) {
		$page.url.searchParams.set('page', `${page}`);
		$page.url.searchParams.set('limit', `${limit}`);
		//invalidate($page.route.id + $page.url.search);
		goto($page.route.id + $page.url.search, { replaceState: true, invalidateAll: true });
	}

	//Modal
	function createModal(): ModalSettings {
		const modalComponent: ModalComponent = {
			// Pass a reference to your custom component
			ref: CrudElement,
			// Add the component properties as key/value pairs
			props: { selection: selection },
			// Provide a template literal for the default component slot
			slot: '<p>Skeleton</p>'
		};

		const d: ModalSettings = {
			type: 'component',
			// Pass the component directly:
			component: modalComponent
		};
		return d;
	}

	// function onClose(){
	//     modalStore.clear();
	// }
</script>

<!-- <Modal /> -->

<Table source={tableSimple} interactive={true} on:selected={mySelectionHandler} />

<Paginator bind:settings={paginationSettings} on:page={onPageChange} on:amount={onAmountChange} />
