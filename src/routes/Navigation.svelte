<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { UserRoleEnum } from '$lib/database/auth/userData.type';
	export let data: PageData;
	const { roles } = data;
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav">
	<!-- (optionally you can provide a label here) -->
	<ul>
		{#if roles.includes(UserRoleEnum.ADMIN)}
			<li>
				<a href="/auth-admin" on:click={drawerClose}>
					<span class="badge bg-primary-500">🛡️</span>
					<span class="flex-auto">Admin Panel</span>
				</a>
			</li>
			<li>
				<a href="/auth-admin/users" on:click={drawerClose}>
					<span class="badge bg-primary-500">⚙️</span>
					<span class="flex-auto">Crud Example</span>
				</a>
			</li>
		{/if}
		<li>
			<a href="/" on:click={drawerClose}>
				<span class="badge bg-primary-500">🤘</span>
				<span class="flex-auto">Home Page</span>
			</a>
		</li>
	</ul>
</nav>
