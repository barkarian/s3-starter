<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_DEFAULT_LIMIT } from '$env/static/public';
	import { Paginator } from '@skeletonlabs/skeleton';
	export let data;
	//Filter settings

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
		//console.log('event:page', e.detail);
	}

	function onAmountChange(e: CustomEvent): void {
		paginationSettings.offset = 0;
		updatePageOnPaginationChange(paginationSettings.offset, e.detail);
		//console.log('event:amount', e.detail);
	}

	function updatePageOnPaginationChange(page: number, limit: number) {
		$page.url.searchParams.set('page', `${page}`);
		$page.url.searchParams.set('limit', `${limit}`);
		//invalidate($page.route.id + $page.url.search);
		goto($page.route.id + $page.url.search, { replaceState: true, invalidateAll: true });
	}
</script>

<Paginator bind:settings={paginationSettings} on:page={onPageChange} on:amount={onAmountChange} />
