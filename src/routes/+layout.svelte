<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Modal, Drawer, drawerStore, Avatar } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import { goto } from '$app/navigation';
	export let data;
	console.log({ layoutData: data.session?.user });
	function drawerOpen(): void {
		drawerStore.open();
	}
	function getInitialOfName(name: string): string {
		let initials = '';
		const nameArray = name.split(' ');
		for (let i = 0; i < nameArray.length; i++) {
			initials += nameArray[i][0];
		}
		return initials;
	}
</script>

<Drawer>
	<Navigation />
</Drawer>
<Modal />
<!-- App Shell -->
<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if !data.session?.user}
					<a class="btn btn-sm variant-ghost-surface" href="/auth" rel="noreferrer"> Sign In </a>
				{:else}
					<Avatar
						border="border-4 	border-surface-300-600-token hover:!border-primary-500"
						cursor="cursor-pointer"
						initials={getInitialOfName(data.session.user.name ?? 'USE R')}
						width="w-14"
						background="bg-primary-500"
						on:click={() => goto('/auth/profile')}
					/>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container p-10 mx-auto">
		<slot />
	</div>
</AppShell>
