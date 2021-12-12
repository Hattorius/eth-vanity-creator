
import { ethers } from "ethers";

type someFunction = (input: string[]) => void;

export const generateAddress = async (callback: someFunction) => {
    var addressPrivateHex = "";
    for (var i = 0; i < 64; i++) {
        addressPrivateHex += Math.floor(Math.random() * 16).toString(16);
    }
    const addressPrivateKey = "0x" + addressPrivateHex;
    const wallet = new ethers.Wallet(addressPrivateKey);
    callback([addressPrivateKey, wallet.address]);
}
