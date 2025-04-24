import Web3 from 'web3';

let web3;

export const initWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error("No Ethereum browser detected. You can check out MetaMask!");
    }
    return web3;
};

export const getCurrentAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
};

export const sendTransaction = async (to, value) => {
    const accounts = await web3.eth.getAccounts();
    return await web3.eth.sendTransaction({
        from: accounts[0],
        to: to,
        value: web3.utils.toWei(value, 'ether')
    });
};