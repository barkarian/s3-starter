<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import CrudElement from './RUDElement.svelte';
	import Pagination from './Pagination.svelte';
	import FilterForm from './FilterForm.svelte';

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

<FilterForm />
<Table source={tableSimple} interactive={true} on:selected={mySelectionHandler} />

<Pagination {data} />
