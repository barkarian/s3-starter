<script lang="ts">
    import { Modal, modalStore } from '@skeletonlabs/skeleton';
    import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
    import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
    import type { TableSource } from '@skeletonlabs/skeleton';
	import CrudElement from './RUDElement.svelte';

    let selection:any|null=null;
    //Table Data
    const sourceData = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    ];
		
    //Table Settings
    const tableSimple: TableSource = {
        // A list of heading labels.
        head: ['Name', 'Symbol', 'Weight'],
        // The data visibly shown in your table body UI.
        body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
        // Optional: The data returned when interactive is enabled and a row is clicked.
        meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight']),
        // Optional: A list of footer labels.
        foot: ['Total', '', '<code>31.7747</code>']
    };
			
    function mySelectionHandler(rowMetaValue:any){
        selection=rowMetaValue.detail
        modalStore.trigger(createModal());
    }

    // PaginatorSettings
    let page = {
        offset: 0,
        limit: 5,
        size: sourceData.length,
        amounts: [1,2,5,10],
    };

    function onPageChange(e: CustomEvent): void {
	console.log('event:page', e.detail);
    }

    function onAmountChange(e: CustomEvent): void {
        console.log('event:amount', e.detail);
    }
    //Modal
    function createModal():ModalSettings{
        const modalComponent: ModalComponent = {
        // Pass a reference to your custom component
        ref: CrudElement,
        // Add the component properties as key/value pairs
        props: { background: 'bg-red-500' , selection:selection},
        // Provide a template literal for the default component slot
        slot: '<p>Skeleton</p>'
        };
    
        const d: ModalSettings = {
            type: 'component',
            // Pass the component directly:
            component: modalComponent,
        };
        return d;
    }
	
    // function onClose(){
    //     modalStore.clear();
    // }
</script>

<Modal/>

<Table source ={tableSimple} interactive={true} on:selected={mySelectionHandler}></Table>

<Paginator bind:settings={page} on:page={onPageChange} on:amount={onAmountChange}></Paginator>