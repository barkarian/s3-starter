<script lang="ts">
	import Pagination from './Pagination.svelte';
	import FilterForm from './FilterForm.svelte';
	import ConfigurationList from './ConfigurationList.svelte';

	export let data;
</script>

<FilterForm />
<ConfigurationList items={data.configurationData?.data ?? []} />

<Pagination {data} />
