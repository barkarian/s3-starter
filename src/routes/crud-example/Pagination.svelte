<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_DEFAULT_LIMIT } from '$env/static/public';
	import { Paginator } from '@skeletonlabs/skeleton';
	export let totalItems: number;
	//Filter settings

	// PaginatorSettings
	//find configurations from findManyActionName
	let paginationSettings = {
		offset: Number($page.url.searchParams.get('page') ?? 1),
		limit: Number($page.url.searchParams.get('limit') ?? PUBLIC_DEFAULT_LIMIT),
		size: totalItems,
		amounts: [1, 2, 5, 10]
	};

	function onPageChange(e: CustomEvent): void {
		console.log('onPageChange', e.detail, paginationSettings);
		updatePageOnPaginationChange(paginationSettings.offset, paginationSettings.limit);
	}

	function onAmountChange(e: CustomEvent): void {
		console.log('onAmountChange', e.detail, paginationSettings);
		paginationSettings.offset = 0;
		updatePageOnPaginationChange(paginationSettings.offset, e.detail);
	}

	function updatePageOnPaginationChange(page: number, limit: number) {
		$page.url.searchParams.set('page', `${page}`);
		$page.url.searchParams.set('limit', `${limit}`);
		goto($page.route.id + $page.url.search, { replaceState: true, invalidateAll: true });
	}
</script>

<Paginator bind:settings={paginationSettings} on:page={onPageChange} on:amount={onAmountChange} />
