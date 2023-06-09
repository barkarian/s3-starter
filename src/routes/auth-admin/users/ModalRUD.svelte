<script lang="ts">
	import { page } from '$app/stores';
	import { ListBox, ListBoxItem, SlideToggle, modalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import FormNotifications from '$lib/components/crud-utils/FormNotifications.svelte';
	import type { User } from '@prisma/client';
	import { userRoleEnumValues } from '$lib/database/auth/userData.type';
	export let parent: any;
	export let selection: User;
	export let data: PageData;
	let formResult: any;

	const { updateForm: updateFormData, deleteForm: deleteFormData } = data;
	const {
		form: updateForm,
		errors: updateErrors,
		constraints: updateConstraints,
		enhance: updateEnhance,
		delayed: updateDelayed,
		message: updateMessage,
		empty: updateEmpty,
		valid: updateValid
	} = superForm(updateFormData, {
		onResult: (e) => {
			formResult = e.result;
		}
	});
	const {
		form: deleteForm,
		errors: deleteErrors,
		constraints: deleteConstraints,
		enhance: deleteEnhance,
		delayed: deleteDelayed,
		message: deleteMessage,
		empty: deleteEmpty,
		valid: deleteValid
	} = superForm(deleteFormData, {
		onResult: (e) => {
			formResult = e.result;
		}
	});

	//On selection change
	let roles: string[] = userRoleEnumValues;
	$: onSelectionChange(selection);
	function onSelectionChange(selection: any) {
		console.log({ selection });
		$updateForm.email = selection.email;
		$updateForm.firstName = selection.firstName ?? '';
		$updateForm.lastName = selection.lastName ?? '';
		$updateForm.phone = selection.phone ?? '';
		$updateForm.userApproved = selection.userApproved;
		$updateForm.roles = selection.roles.map((roleItem: any) => roleItem.role);
	}
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	//Handle submit
	function handleSubmit() {
		console.log('SUBMITTED');
	}
</script>

<FormNotifications {formResult} />

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<!-- <SuperDebug data={$updateForm} /> -->
		<header class={cHeader}>{$modalStore[0].title ?? 'Read Update Delete'}</header>
		<article>
			{$modalStore[0].body ?? ''}
		</article>
		<form method="POST" action="{$page.route.id}?/delete" use:deleteEnhance>
			<input class="hidden" type="text" name="id" bind:value={selection.id} />
			<button formaction="{$page.route.id}?/delete" class="btn variant-filled-error">Delete</button>
		</form>
		<!-- Enable for debugging: -->
		<!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
		<form
			method="POST"
			action="{$page.route.id}?/update"
			use:updateEnhance
			class="modal-form {cForm}"
		>
			ID:{selection.id}
			<input class="hidden" type="text" name="id" bind:value={selection.id} />
			<label class="label">
				<span>First Name</span>
				<input
					type="text"
					name="firstName"
					bind:value={$updateForm.firstName}
					class="input {$updateErrors.firstName ? 'input-error' : ''}"
					data-invalid={$updateErrors.firstName}
					{...$updateConstraints.firstName}
					placeholder="Enter first name..."
				/>
			</label>
			<label class="label">
				<span>Last name</span>
				<input
					type="text"
					name="lastName"
					bind:value={$updateForm.lastName}
					class="input {$updateErrors.lastName ? 'input-error' : ''}"
					data-invalid={$updateErrors.lastName}
					{...$updateConstraints.lastName}
					placeholder="Enter last name..."
				/>
			</label>
			<label class="label">
				<span>Email</span>
				<input
					type="email"
					name="email"
					bind:value={$updateForm.email}
					class="input {$updateErrors.email ? 'input-error' : ''}"
					data-invalid={$updateErrors.email}
					{...$updateConstraints.email}
					placeholder="Enter email address..."
				/>
			</label>
			<label class="label">
				<span>Phone number</span>
				<input
					type="text"
					name="phone"
					bind:value={$updateForm.phone}
					class="input {$updateErrors.phone ? 'input-error' : ''}"
					data-invalid={$updateErrors.phone}
					{...$updateConstraints.phone}
					placeholder="Enter phone number..."
				/>
			</label>
			<label class="label">
				<input
					class="hidden"
					bind:checked={$updateForm.userApproved}
					type="checkbox"
					name="userApproved"
				/>
				<span>User status</span>
				<SlideToggle name="slide" bind:checked={$updateForm.userApproved} />
			</label>
			<label class="label">
				<input class="hidden" bind:value={$updateForm.roles} type="json" name="roles" />
				<!-- {JSON.stringify($updateForm.roles)} -->
				<span>User roles:</span>
				<ListBox multiple>
					{#each roles as role}
						<ListBoxItem bind:group={$updateForm.roles} name="medium" value={role}
							>{role}</ListBoxItem
						>
					{/each}
				</ListBox>
			</label>

			<!-- prettier-ignore -->
			<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button type="submit" class="btn variant-filled-secondary" on:click={handleSubmit}>Update</button>
			</footer>
		</form>
	</div>
{/if}
