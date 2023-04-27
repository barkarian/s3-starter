<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav">
	<!-- (optionally you can provide a label here) -->
	<ul>
		<li>
			<a href="/authenticated-admin" on:click={drawerClose}>
				<span class="badge bg-primary-500">🛡️</span>
				<span class="flex-auto">Admin Panel</span>
			</a>
		</li>
		<li>
			<a href="/crud-example" on:click={drawerClose}>
				<span class="badge bg-primary-500">⚙️</span>
				<span class="flex-auto">Crud Example</span>
			</a>
		</li>
	</ul>
</nav>
