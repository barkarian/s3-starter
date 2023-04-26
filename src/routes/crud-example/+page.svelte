<script lang="ts">
	import Pagination from './Pagination.svelte';
	import FilterForm from './ModalFilters.svelte';
	import ConfigurationList from './ConfigurationList.svelte';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import FiltersModal from './ModalFilters.svelte';
	import NewConfigurationModal from './ModalNewConfiguration.svelte';
	import type { FiltersQueryParams } from './Service';
	import { page } from '$app/stores';
	import ShowFilters from '$lib/components/ShowFilters.svelte';

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
			ref: FiltersModal,
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
			ref: NewConfigurationModal
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

<!-- Search by filters and add new Configuration options -->
<!-- <button type="button" class="btn variant-filled">
	<span>(icon)</span>
	<span>Button</span>
</button> -->
<button type="button" class="btn variant-filled" on:click={openFilterModal}>
	<span>⚙️</span>
	<span>Add filters</span>
</button>
<button type="button" class="btn variant-filled" on:click={openNewConfigurationModal}>
	<span>🆕</span>
	<span>Add Configuration</span>
</button>
<ShowFilters {filters} />
<!-- Configuration Lists -->
<ConfigurationList items={data.configurationData?.data ?? []} />
<!-- Pagination -->
<Pagination totalItems={data.configurationData?.pagination?.totalCount ?? 0} />
