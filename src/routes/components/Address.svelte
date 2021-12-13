
<script>
    export var address;
    export var k;
    var hovering = false;
    function copy() {
        window.prompt("Private key", k);
    }
    function hvr() {
        hovering = !hovering;
    }
</script>

<div class="addr" on:click={copy} on:mouseenter={hvr} on:mouseleave={hvr}>
    <div class="hld">
        {address} 
    </div>
    <div class:hidden={!hovering} class:show={hovering}>
        Click to copy private key
    </div>
</div>

<style>
    .addr {
        background-color: #669bbc;
        color: #fff;
        cursor: pointer;
        filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
        border-radius: .25rem;
        margin-bottom: .3rem;
        padding-top: .3rem;
        padding-bottom: .3rem;
    }

    .addr .hld {
        padding: .2rem;
    }

    .show {
        background-color: #ef233c;
        width: 100%;
        font-size: 1.1rem;
        padding-left: 1rem;
        box-sizing: border-box;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .hidden {
        visibility: hidden;
        height: 0;
    }

    * {
        transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
    }
</style>
