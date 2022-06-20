const fs = require('fs');
const path = require('path');
require('dotenv').config()
const Web3 = require('web3')
const math = require('mathjs');

function shortId(str, size) {
        return str.substr(0, 6) + '...' + str.substr(36,42);
}
const P =  process.env.PRIVATE_KEYS.split(",") ;
const X =  process.env.VALUE.split(",") ;

//WEB3 Config
const web3 = new Web3(process.env.RPC_URL);
//rechecks every 10ins. Adjust accordingly in Milliseconds
const POLLING_INTERVAL = 600000 // 10 mins in milliseconds;
let i = 0;


console.log("███ █ █ ███ ███ ███   ███      █                                      █");
console.log("█   █ █ █ █  █  █ █   █ █ █ █ ███ ███ ███ ███ █████ ███ ███ █ █ ███ ███"); 
console.log("███ █ █ ██   █  █ █   █ █ █ █  █  █ █ █   █ █ █ █ █ █ █ █ █ █ █ █ █ █ █"); 
console.log("█   █ █ █ █  █  █ █   ███ █ █  █  █ █ █   █ █ █ █ █ █ █ █ █ █ █ █ █ █ █");
console.log("█   ███ █ █ ███ ███   █ █ ███  ██ ███ ███ ███ █ █ █ ███ ███ ███ █ █ ███"); 
console.log("                                                    █                  ");
console.log("                                                    █                  "); 

console.log("Furio Auto-Compounder, Join FURIO TEAM ALPHA  https://t.me/+wQeRQsos7XMwZmI0 \n");

console.log("If you find this script useful, consider donating to the developers:\n0xE1751655b290C573573eB1E14358C3E092AaA467 \n")

console.log(`Polling time: ${POLLING_INTERVAL / 60000} minutes`);

        //SMART CONTRACT ABI
        const ABI = [
                {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from_","type":"address"},{"indexed":false,"internalType":"address","name":"to_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"AirdropSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"particpant_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"Bonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"participant_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"participant_","type":"address"}],"name":"Complete","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"participant_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"Compound","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"participant_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"participant_","type":"address"}],"name":"Maxed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"participant_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"Tax","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"recipient_","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"TokensSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"addressBook","outputs":[{"internalType":"contract IAddressBook","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to_","type":"address"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"airdrop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"},{"internalType":"uint256","name":"minBalance_","type":"uint256"},{"internalType":"uint256","name":"maxBalance_","type":"uint256"}],"name":"airdropTeam","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"availableRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"claimPrecheck","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compound","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity_","type":"uint256"},{"internalType":"address","name":"referrer_","type":"address"}],"name":"deposit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity_","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"},{"internalType":"uint256","name":"quantity_","type":"uint256"}],"name":"depositFor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"},{"internalType":"uint256","name":"quantity_","type":"uint256"},{"internalType":"address","name":"referrer_","type":"address"}],"name":"depositFor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"getParticipant","outputs":[{"components":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"compounded","type":"uint256"},{"internalType":"uint256","name":"claimed","type":"uint256"},{"internalType":"uint256","name":"taxed","type":"uint256"},{"internalType":"uint256","name":"awarded","type":"uint256"},{"internalType":"bool","name":"negative","type":"bool"},{"internalType":"bool","name":"penalized","type":"bool"},{"internalType":"bool","name":"maxed","type":"bool"},{"internalType":"bool","name":"banned","type":"bool"},{"internalType":"bool","name":"teamWallet","type":"bool"},{"internalType":"bool","name":"complete","type":"bool"},{"internalType":"uint256","name":"maxedRate","type":"uint256"},{"internalType":"uint256","name":"availableRewards","type":"uint256"},{"internalType":"uint256","name":"lastRewardUpdate","type":"uint256"},{"internalType":"uint256","name":"directReferrals","type":"uint256"},{"internalType":"uint256","name":"airdropSent","type":"uint256"},{"internalType":"uint256","name":"airdropReceived","type":"uint256"}],"internalType":"struct Vault.Participant","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProperties","outputs":[{"components":[{"internalType":"uint256","name":"period","type":"uint256"},{"internalType":"uint256","name":"lookbackPeriods","type":"uint256"},{"internalType":"uint256","name":"penaltyLookbackPeriods","type":"uint256"},{"internalType":"uint256","name":"maxPayout","type":"uint256"},{"internalType":"uint256","name":"maxReturn","type":"uint256"},{"internalType":"uint256","name":"neutralClaims","type":"uint256"},{"internalType":"uint256","name":"negativeClaims","type":"uint256"},{"internalType":"uint256","name":"penaltyClaims","type":"uint256"},{"internalType":"uint256","name":"depositTax","type":"uint256"},{"internalType":"uint256","name":"depositReferralBonus","type":"uint256"},{"internalType":"uint256","name":"compoundTax","type":"uint256"},{"internalType":"uint256","name":"compoundReferralBonus","type":"uint256"},{"internalType":"uint256","name":"airdropTax","type":"uint256"},{"internalType":"uint256","name":"claimTax","type":"uint256"},{"internalType":"uint256","name":"maxReferralDepth","type":"uint256"},{"internalType":"uint256","name":"teamWalletRequirement","type":"uint256"},{"internalType":"uint256","name":"teamWalletChildBonus","type":"uint256"},{"internalType":"bool","name":"devWalletReceivesBonuses","type":"bool"}],"internalType":"struct Vault.Properties","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"getReferrals","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStats","outputs":[{"components":[{"internalType":"uint256","name":"totalParticipants","type":"uint256"},{"internalType":"uint256","name":"totalDeposits","type":"uint256"},{"internalType":"uint256","name":"totalDeposited","type":"uint256"},{"internalType":"uint256","name":"totalCompounds","type":"uint256"},{"internalType":"uint256","name":"totalCompounded","type":"uint256"},{"internalType":"uint256","name":"totalClaims","type":"uint256"},{"internalType":"uint256","name":"totalClaimed","type":"uint256"},{"internalType":"uint256","name":"totalTaxed","type":"uint256"},{"internalType":"uint256","name":"totalTaxes","type":"uint256"},{"internalType":"uint256","name":"totalAirdropped","type":"uint256"},{"internalType":"uint256","name":"totalAirdrops","type":"uint256"},{"internalType":"uint256","name":"totalBonused","type":"uint256"},{"internalType":"uint256","name":"totalBonuses","type":"uint256"}],"internalType":"struct Vault.Stats","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"maxPayout","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"participantBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"participantMaxed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"participantStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"remainingPayout","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant_","type":"address"}],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"address_","type":"address"}],"name":"setAddressBook","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lookbackPeriods_","type":"uint256"}],"name":"updateLookbackPeriods","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxPayout_","type":"uint256"}],"name":"updateMaxPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxReturn_","type":"uint256"}],"name":"updateMaxReturn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"negativeClaims_","type":"uint256"}],"name":"updateNegativeClaims","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"neutralClaims_","type":"uint256"}],"name":"updateNeutralClaims","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"penaltyClaims_","type":"uint256"}],"name":"updatePenaltyClaims","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"penaltyLookbackPeriods_","type":"uint256"}],"name":"updatePenaltyLookbackPeriods","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"period_","type":"uint256"}],"name":"updatePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"claims_","type":"uint256"},{"internalType":"uint256","name":"rate_","type":"uint256"}],"name":"updateRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}
        ]

        //Contract address
        const Furio_Contract="0x4de2b5d4a343ddfbeef976b3ed34737440385071"

        //Contract objects
        const contract = new web3.eth.Contract(ABI, Furio_Contract)

P.forEach(element => {
        let Y = X[i]*1.05e18;

        var wallet = web3.eth.accounts.wallet.add(P[i]);
        let currently_compounding = false
        async function checkRollAvailability(){
                if(currently_compounding) return
                try{
                        const availableRewards = await contract.methods.availableRewards(wallet.address).call()
                        var gasPrice = await web3.eth.getGasPrice();
                        var block = await web3.eth.getBlock("latest");
                        var gasLimit = math.floor(block.gasLimit/block.transactions.length);

                        const txCost = gasPrice * gasLimit
//                        console.log('Total gas cost: ', txCost)

                        // if over 5 FURIO available, hydrate
                        if(availableRewards > Y) {
                                console.log(`Time to compound ${web3.utils.fromWei(availableRewards.toString(),'ether')} FURIO!, ${shortId(wallet.address)}`)
                                currently_compounding = true;
//                               console.log(`gas Price: ${gasPrice}`)
                                compound()
                                setTimeout(() => 1000);
                        }
                        else{
//                                console.log(`Not ready to compound ${web3.utils.fromWei(availableRewards.toString(),'ether')} FURIO, ${shortId(wallet.address)}`)
                        }
                } catch (err){
                        console.log(`Didn't compound any Furio (${err.message}, ${shortId(wallet.address)})`)
                        return
                }

                async function compound(){
//                        console.log('Starting Compound...')

                        try{
                                const compound = await contract.methods.compound().send(
                                        {
                                                from: wallet.address,
                                                gas: gasLimit,
                                                gasPrice: gasPrice
                                        }
                                )
                                console.log(`Roll status: ${compound.status}, ${shortId(wallet.address)}`);
                        } catch (err){
                                currently_compounding = false
                                console.log(`Roll error ${err.message}, ${shortId(wallet.address)}`)
                                return
                        }

                        currently_compounding = false
                }
        }

checkRollAvailability()
setInterval(async () => { await checkRollAvailability() }, POLLING_INTERVAL)
i++
});

