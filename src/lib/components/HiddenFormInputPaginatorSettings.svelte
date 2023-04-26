<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_DEFAULT_LIMIT } from '$env/static/public';

	// @ts-ignore
	let limit = Number($page.url.searchParams.get('limit') ?? PUBLIC_DEFAULT_LIMIT);
	//always bring user on page 1
	let currentPage = 0;
</script>

<!-- Don't remove them they are used to keep paginator settings after filtering -->
<input class="hidden" type="text" name="page" value={currentPage} />
<input class="hidden" type="text" name="limit" value={limit} />
<!-- Don't remove them they are used to keep paginator settings after filtering -->
