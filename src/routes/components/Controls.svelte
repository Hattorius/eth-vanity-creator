
<script>
    import { generateAddress } from "../scripts/generateAddress";
    const fixRegex = new RegExp('^([0-9a-fA-F])+$');

    var fix = '';
    var prefix = true;
    var example = '';
    var caseSense = true;
    var started = false;
    $: iffix = ((fixRegex.test(fix) || fix === '') ? false : true);
    var found = [];

    var startedCount = 0;

    function exampleCreation() {
        if (prefix) {
            var left = 40 - fix.length;
            example = '0x<strong>' + fix + '</strong>';
            for (var i = 0; i < left; i++) {
                example += Math.floor(Math.random() * 16).toString(16);
            }
        } else {
            var left = 40 - fix.length;
            example = '0x';
            for (var i = 0; i < left; i++) {
                example += Math.floor(Math.random() * 16).toString(16);
            }
            example += '<strong>' + fix + '</strong>';
        }
    }

    async function run() {
        while (true) {
            if (!started) {
                break;
            }
            generateAddress((addresses) => {
                if (!caseSense && prefix && addresses[0].substring(2, fix.length + 2).toLowerCase() == fix.toLowerCase()) {
                    found.push(addresses);
                } else if (caseSense && prefix && addresses[0].substring(2, fix.length + 2) == fix) {
                    found.push(addresses);
                } else if (!caseSense && !prefix && addresses[0].toLowerCase().endsWith(fix.toLowerCase())) {
                    found.push(addresses);
                } else if (!caseSense && !prefix && addresses[0].endsWith(fix)) {
                    found.push(addresses);
                }
            });
            startedCount += 1;
            await new Promise(resolve => setTimeout(resolve, 1));
            if (startedCount % 1000 === 0) {
                console.log(startedCount, found.length);
            }
        }
    }

    function startstop() {
        started = !started;
        found = [];
        startedCount = 0;
        if (started) {
            for (var i = 0; i < 100; i++) {
                run();
            }
        }
    }

    exampleCreation();

</script>

<div class="controls">
    <h1>Generate by vanity</h1>
    <input bind:value={fix} on:input={exampleCreation} type="text" placeholder={prefix ? 'Prefix' : 'Suffix'}>
    {#if iffix}
        <div class="error">Oh no! Invalid Hex</div>
    {/if}
    <small>Example: {@html example || '0x'}</small>
    <br />
    <div class="checkbox">
        <input type=checkbox bind:checked={prefix} on:change={exampleCreation}>
        <span style="margin-left: .1rem;">{prefix ? 'Prefix' : 'Suffix'}</span>
    </div>
    <div class="checkbox">
        <input type=checkbox bind:checked={caseSense}>
        <span style="margin-left: .1rem;">Case-sensitive</span>
    </div>
    <div class="submit">
        <button on:click={startstop} class:active={started}>{started ? 'Stop' : 'Start'}</button>
    </div>
</div>

<style>
    .submit {
        padding-top: 1.4rem;
    }

    .submit button {
        float: right;
        margin-top: -1.4rem;
        border: 0;
        border-radius: 0.25rem;
        filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
        font-size: 1rem;
        padding: .2rem 1rem;
        cursor: pointer;
        background-color: #2b2d42;
        color: #fff;
        font-weight: 600;
        transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
    }

    .submit button:hover {
        background-color: #383b52;
    }

    .submit button.active {
        background-color: #ef233c;
    }

    .submit button.active:hover {
        background-color: #db2e42;
    }

    .controls {
        background-color: #8d99ae;
        color: #fff;
        padding: .4rem;
        border-radius: 0.25rem;
        filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    }

    h1 {
        margin: 0;
        font-size: 1.7rem;
        margin-bottom: .3rem;
    }

    .controls input[type=text] {
        width: 100%;
        box-sizing: border-box;
        padding: .1rem;
        font-size: 1.2rem;
        border: 0;
    }

    .controls input[type=checkbox] {
        margin: 0;
        margin-top: .5rem;
    }

    .error {
        background-color: #ef233c;
        color: #fff;
        padding: .1rem;
    }

    .checkbox {
        display: inline-block;
        margin-left: .5rem;
    }

    .checkbox:first {
        margin-left: 0;
    }
</style>
