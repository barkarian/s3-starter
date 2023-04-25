<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<button type="button" class="btn variant-filled">
	<span>(icon)</span>
	<span>Add Configuration</span>
</button>
<Accordion>
	<AccordionItem open>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="summary">Search by Filters</svelte:fragment>
		<svelte:fragment slot="content">
			<form>
				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">(segment)</div>
						<input type="search" placeholder="Search..." />
					</div>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">(segment)</div>
						<input type="search" placeholder="Search..." />
					</div>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">(segment)</div>
						<input type="search" placeholder="Search..." />
					</div>
					<button type="button" class="btn variant-filled">
						<span>(icon)</span>
						<span>Button</span>
					</button>
				</div>
			</form>
		</svelte:fragment>
	</AccordionItem>
</Accordion>
