<script lang="ts">
	import Pagination from './Pagination.svelte';
	import FilterForm from './ModalFilters.svelte';
	import ConfigurationList from './ConfigurationList.svelte';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import FiltersModal from './ModalFilters.svelte';
	import NewConfigurationModal from './ModalNewConfiguration.svelte';

	export let data;
	//Create Modals
	function filtersModal(): ModalSettings {
		const modalComponent: ModalComponent = {
			// Pass a reference to your custom component
			ref: FiltersModal,
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
<button on:click={openFilterModal}> Add filters </button>
<button on:click={openNewConfigurationModal}> Add new configuration </button>
<!-- Configuration Lists -->
<ConfigurationList items={data.configurationData?.data ?? []} />
<!-- Pagination -->
<Pagination totalItems={data.configurationData?.pagination?.totalCount ?? 0} />
