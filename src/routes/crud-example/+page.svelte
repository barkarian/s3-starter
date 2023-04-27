<script lang="ts">
	import Pagination from './Pagination.svelte';
	import ConfigurationList from './ConfigurationList.svelte';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import ModalFilters from './ModalFilters.svelte';
	import ModalCreate from './ModalCreate.svelte';
	import type { FiltersQueryParams } from './Service';
	import { page } from '$app/stores';
	import ShowFilters from '$lib/components/crud-utils/ShowFilters.svelte';

	export let data;
	//Create Modals
	let filters: FiltersQueryParams = {
		firstName: $page.url.searchParams.get('firstName') ?? '',
		lastName: $page.url.searchParams.get('lastName') ?? '',
		email: $page.url.searchParams.get('email') ?? ''
	};

	function filtersModal(): ModalSettings {
		const modalComponent: ModalComponent = {
			// Pass a reference to your custom component
			ref: ModalFilters,
			props: { filters: filters },
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

	function newConfigurationModal(): ModalSettings {
		const modalComponent: ModalComponent = {
			// Pass a reference to your custom component
			ref: ModalCreate,
			props: { data: data }
			// Provide a template literal for the default component slot
		};

		const d: ModalSettings = {
			type: 'component',
			// Pass the component directly:
			component: modalComponent
		};
		return d;
	}

	//Trigger Modals
	function openFilterModal() {
		modalStore.trigger(filtersModal());
	}

	function openNewConfigurationModal() {
		modalStore.trigger(newConfigurationModal());
	}
</script>

<button type="button" class="btn variant-filled" on:click={openFilterModal}>
	<span>⚙️</span>
	<span>Add filters</span>
</button>
<button type="button" class="btn variant-filled" on:click={openNewConfigurationModal}>
	<span>🆕</span>
	<span>Add Configuration</span>
</button>
<ShowFilters {filters} />
<!-- Configuration Lists data is needed in order to pass superFormData to ModalRUD-->
<ConfigurationList {data} items={data.configurationData?.data ?? []} />
<!-- Pagination -->
<Pagination totalItems={data.configurationData?.pagination?.totalCount ?? 0} />
