<script>
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import UserStepper from './UserStepper.svelte';
	export let data;
	const { roles, meta } = data;
</script>

<h1>New User page</h1>
<p>
	Create forms to collect user data,add data to database and update jwt roles and meta data if
	needed!
</p>

<UserStepper />

<hr class="mt-10 mb-10 !border-t-8" />

{#if $page.data.session}
	{#if $page.data.session.user?.image}
		<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
	{/if}
	<span class="signedInText">
		<small>Signed in as</small><br />
		<strong>{$page.data.session.user?.name ?? 'User'}</strong>
	</span>
	<div>
		{#if roles}
			{roles}
		{/if}
	</div>
	<button on:click={() => signOut()} class="button">Sign out</button>
{/if}
