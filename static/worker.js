
importScripts("//cdn.ethers.io/lib/ethers-5.0.umd.min.js");

async function generateAddress(callback) {
    var addressPrivateHex = "";
    for (var i = 0; i < 64; i++) {
        addressPrivateHex += Math.floor(Math.random() * 16).toString(16);
    }
    const addressPrivateKey = "0x" + addressPrivateHex;
    const wallet = new ethers.Wallet(addressPrivateKey);
    callback([wallet.address, addressPrivateKey]);
}

var started = false;
var fix = '';
var caseSense = false;
var prefix = false;
var found = [];
var finishedCount = 0;
var startedCount = 0;

onmessage = function(e) {
    if (e.data[0] == "start") {
        console.log("start");
        started = true;
        if (started) {
            fix = e.data[1][0];
            caseSense = e.data[1][1]
            prefix = e.data[1][2];
            start();
            genPerSecond();
        }
    } else if (e.data[0] == "stop") {
        console.log("stop");
        started = false;
    }
}

async function run() {
    while (started) {
        generateAddress(function(addresses) {
            var yes = false;
            if (!caseSense && prefix && addresses[0].substring(2, fix.length + 2).toLowerCase() == fix.toLowerCase()) {
                yes = true;
            } else if (caseSense && prefix && addresses[0].substring(2, fix.length + 2) == fix) {
                yes = true;
            } else if (caseSense && !prefix && addresses[0].toLowerCase().endsWith(fix.toLowerCase())) {
                yes = true;
            } else if (!caseSense && !prefix && addresses[0].endsWith(fix)) {
                yes = true;
            }
            if (yes) {
                found.push(addresses);
                postMessage(["match", addresses]);
            }
            finishedCount += 1;
        });
        startedCount += 1;
        await new Promise(resolve => setTimeout(resolve, 1));
    }
}

function start() {
    for (var i = 0; i < 10; i++) {
        run();
    }
}

var prev = 0;

async function genPerSecond() {
    while (started) {
        var temp = finishedCount;
        var gps = temp - prev;
        prev = temp;
        postMessage(["gps", gps]);
        postMessage(["count", finishedCount]);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
