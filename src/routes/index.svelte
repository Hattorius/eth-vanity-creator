<script>
import Controls from "./components/Controls.svelte";
import Header from "./components/Header.svelte";
import Stats from "./components/Stats.svelte";
import { generateAddress } from "./scripts/generateAddress";

</script>

<Header/>

<div class="generator">
    <div><Controls/></div>
    <div><Stats/></div>
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
