<script lang="ts">
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	function onCompleteHandler(e: Event): void {
		console.log('event:complete', e);
	}
</script>

<Stepper on:complete={onCompleteHandler}>
	<Step>
		<svelte:fragment slot="header">The user is authorized!</svelte:fragment>
		The user is authorized but is not yet inserted on the database.
	</Step>
	<Step>
		<svelte:fragment slot="header">Be aware of next steps!</svelte:fragment>
		We are going to complete a stepper asking you for all important User meta data and then we going
		to insert this User on the Database.
	</Step>
	<Step>
		<svelte:fragment slot="header">Add User Data</svelte:fragment>
		<p>...</p>
		<p>...</p>
		<p>After you add all user Data you can submit complete and the user will be created</p>
	</Step>
</Stepper>
