<script>
import Address from "./components/Address.svelte";

import Controls from "./components/Controls.svelte";
import Header from "./components/Header.svelte";
import Stats from "./components/Stats.svelte";

var matches = [];

function idk(n) {
    matches.push(n.detail);
    if (matches.length < 500 || matches.length % 500 === 0) {
        matches = matches;
    }
}

</script>

<Header/>

<div class="generator">
    <div><Controls on:found={idk}/></div>
    <div></div>
    {#each matches as address, i}
        <Address address={address[0]} k={address[1]}/>
    {/each}
</div>

<style>
    .generator {
        display: grid;
        max-width: 1024px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding: 0.3rem;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: .5rem;
    }
    @media (min-width: 1024px) {
        .generator {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
