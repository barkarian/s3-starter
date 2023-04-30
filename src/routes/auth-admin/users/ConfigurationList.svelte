<script lang="ts">
	import { modalStore, tableSourceMapper } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import ModalRUD from './ModalRUD.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	export let items: any[];

	let selection: any | null = null;
	//Table Data

	//Table Settings
	$: tableSimple = {
		// A list of heading labels.
		head: ['Email', 'Name', 'Surname'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(items, ['email', 'firstName', 'lastName']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableSourceMapper(items, [
			'id',
			'email',
			'firstName',
			'lastName',
			'phone',
			'totalRevenue',
			'userApproved',
			'properties',
			'roles'
		]),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code>31.7747</code>']
	};

	//Modal
	function createModal(): ModalSettings {
		const modalComponent: ModalComponent = {
			// Pass a reference to your custom component
			ref: ModalRUD,
			// Add the component properties as key/value pairs
			props: { selection: selection, data: data },
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

	function mySelectionHandler(rowMetaValue: any) {
		selection = rowMetaValue.detail;
		modalStore.trigger(createModal());
	}

	// function onClose(){
	//     modalStore.clear();
	// }
</script>

<Table source={tableSimple} interactive={true} on:selected={mySelectionHandler} />
