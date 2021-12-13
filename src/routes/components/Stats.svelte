
<script>
    import { onMount } from "svelte";
    import Address from "./Address.svelte";

    export var found;
    var visible = true;
    var show = [];

    onMount(async () => {
		while (true) {
            if (found != show) {
                show = found;
            }
            visible = false;
            setTimeout(()=>{visible = true}, 100);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
	})

</script>

{#each show as address, i}
    <Address address={address[0]} k={address[1]}/>
{/each}
{#if visible}
    br
{/if}
