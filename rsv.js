/*Web3 = require('web3')
const testnet = 'http://192.16.1.1:8845';
const walletAddress = '0xc6Bf8EEBEf2fEF2a9DE261878C5C0Ee980d6ED3D';

const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
var balance = web3.eth.getBalance(walletAddress); //Will give value in.
console.log(balance);
*/
//balance = web3.utils.hexToNumber(balance);
var Tx  = require('ethereumjs-tx')
var keccak256 = require('js-sha3').keccak256;
var Web3 = require('web3');
var abi = require('ethereumjs-abi');
const web3Utils = require('web3-utils');
var web3 = new Web3('http://192.168.1.1:8845');

//web3.eth.getAccounts().then(console.log);
//Test Baht
const tokenA = '0x5e78a8db0694de168df6818dbd6d42fc608b66d9'; // "0x5e78a8db0694de168df6818dbd6d42fc608b66d9"
const maker = '0xc6Bf8EEBEf2fEF2a9DE261878C5C0Ee980d6ED3D'; // "0xc6Bf8EEBEf2fEF2a9DE261878C5C0Ee980d6ED3D" Your account address goes here
const MakerAddressPrivateKey = '0xF91108BD86C0BD588AABDE240D3D128F8CFD7A122133B4xxxxxxxxx'; // Your account address goes here
var makerAmount= 1;

//Test SignSwap
const tokenB = '0x5e78a8db0694de168df6818dbd6d42fc608b66d9';
const taker = '0xcc89fdd2809b84c9adba8148abe31838b7342de1'; // Your account address goes here
const TakerAddressPrivateKey = 'C512B22CA1FA907EF1CE07436AD5940607C93C6DCC12FF99xxxxxxx'; // Your account address goes here
var takerAmount= 1;
var    messageHash= '';
var    v= '';
var    r= '';
var    s= ''
//var expiration= new Date().getTime() + 60000;
var expiration= 1558939641223;
var nounce = 1;
var addr = maker;
web3.eth.getBalance(addr, function (error, result) {
if (!error)
console.log('Maker AVE Ether Balance :', web3.utils.fromWei(result,'ether')); // Show the ether balance after converting it from Wei
else
console.log('Huston we have a promblem: ', error); // Should dump errors here
});
var contractAddr = tokenA;
var tknAddress = (addr).substring(2);
var contractData = ('0x70a08231000000000000000000000000' + tknAddress);
web3.eth.call({
    to: contractAddr, // Contract address, used call the token balance of the address in question
    data: contractData // Combination of contractData and tknAddress, required to call the balance of an address
    }, function(err, result) {
if (result) {
var tokens = web3.utils.toBN(result).toString(); // Convert the result to a usable number string
console.log('Maker Balance (Test Baht) : ' + web3.utils.fromWei(tokens, 'ether')); // Change the string to be in Ether not Wei, and show it in the console
}
else {
console.log(err); // Dump errors here
}
});
var addr2 = taker;
web3.eth.getBalance(addr2, function (error, result) {
if (!error)
console.log('Taker AVE Ether Balance :', web3.utils.fromWei(result,'ether')); // Show the ether balance after converting it from Wei
else
console.log('Huston we have a promblem: ', error); // Should dump errors here
});

var contractAddr2 = tokenA;
var tknAddress2 = (addr2).substring(2);
var contractData2 = ('0x70a08231000000000000000000000000' + tknAddress2);
web3.eth.call({
    to: contractAddr2, // Contract address, used call the token balance of the address in question
    data: contractData2 // Combination of contractData and tknAddress, required to call the balance of an address
    }, function(err, result) {
if (result) {
var tokens2 = web3.utils.toBN(result).toString(); // Convert the result to a usable number string
console.log('Maker Balance (Test Baht) : ' + web3.utils.fromWei(tokens2, 'ether')); // Change the string to be in Ether not Wei, and show it in the console
}
else {
console.log(err); // Dump errors here
}
});
var hashshah =abi.soliditySHA3(
        ["address", "uint", "address", "address", "uint", "address", "uint256","uint256"],
        [maker,makerAmount,tokenA,taker,takerAmount,tokenB,expiration,nounce]
    ).toString("hex");

var hash2 = web3.eth.accounts.sign(hashshah, MakerAddressPrivateKey);
var recover1 = web3.eth.accounts.recover(hash2);
console.log("recovered signer: "+ recover1); // Dump errors here
console.log("Hash before signing: "+ hashshah); // Dump errors here
console.log("Hash after signing: "+ hash2.messageHash); // Dump errors here
console.log("Maker Sig r: "+ hash2.r); // Dump errors here
console.log("Maker Sig s: "+ hash2.s); // Dump errors here
console.log("Maker Sig v: "+ hash2.v); // Dump errors here
console.log("Maker Signature: "+ hash2.signature); // Dump errors here
console.log("expiration: "+ expiration); // Dump errors here
console.log("nounce: "+ nounce); // Dump errors here
