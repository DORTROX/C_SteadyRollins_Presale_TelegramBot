import { createTransferInstruction, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { Connection, Keypair, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction, SystemProgram } from '@solana/web3.js';

import base58 from 'bs58';
import dotenv from 'dotenv';
dotenv.config();

const getKeypair = (secretKey) => {
    return Keypair.fromSecretKey(base58.decode(secretKey));
}

const connection = new Connection(clusterApiUrl(process.env.SOLANA_NETWORK), 'confirmed');
const owner_wallet = getKeypair(process.env.SOLANA_PRIVATE_KEY);
console.log('Owner wallet:', owner_wallet.publicKey.toBase58());

const transferTokens = async (ownerSecretKey, tokenAddress, toAddress, amount) => {
    try {
        const ownerWallet = getKeypair(ownerSecretKey);
        let sourceAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            ownerWallet,
            new PublicKey(tokenAddress),
            ownerWallet.publicKey
        );
        let destinationAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            ownerWallet,
            new PublicKey(tokenAddress),
            new PublicKey(toAddress)
        );
        const numberDecimals = await getNumberDecimals(tokenAddress);
        const tx = new Transaction();
        tx.add(createTransferInstruction(
            sourceAccount.address,
            destinationAccount.address,
            ownerWallet.publicKey,
            amount * Math.pow(10, numberDecimals),
        ));

        const latestBlockHash = await connection.getLatestBlockhash('confirmed');

        tx.recentBlockhash = latestBlockHash.blockhash;

        const signature = await sendAndConfirmTransaction(
            connection,
            tx,
            [ownerWallet]
        );

        console.log('Transaction sent! Tokens claimed!');
        console.log('Signature: ', signature);
        return signature;
    } catch (error) {
        console.error('An error occurred while claiming tokens:', error);
        throw error; // re-throw the error to be handled by the caller
    }
}

async function lockCustomTokensInEscrow(privateKey, tokenAddress, amount) {
    if(!privateKey || !tokenAddress || !amount) return { success: false, error: 'Invalid parameters!' };
    try {
        const transaction = await transferTokens(privateKey, tokenAddress, owner_wallet.publicKey.toBase58(), amount);
        return { success: true, signature: transaction };
    } catch (error) {
        return { success: false, error: error };
    }
}

async function claimTokens(tokenAddress, toAddress, amount) {
    if(!tokenAddress || !toAddress || !amount) return { success: false, error: 'Invalid parameters!' };
    try {
        const transaction = await transferTokens(process.env.SOLANA_PRIVATE_KEY, tokenAddress, toAddress, amount);
        return { success: true, signature: transaction };
    } catch (error) {
        return { success: false, error: error };
    }
}

async function sendSol(ownerSecretKey, toWalletAddress, amountInLamports) {
    try {
        const ownerWallet = getKeypair(ownerSecretKey);
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: ownerWallet.publicKey,
                toPubkey: new PublicKey(toWalletAddress),
                lamports: amountInLamports,
            })
        );
        const sendTransaction = await sendAndConfirmTransaction(connection, transaction, [ownerWallet]);
        console.log('Transaction sent! ' + amountInLamports/LAMPORTS_PER_SOL + ' SOL sent!');
        return { success: true, transaction: sendTransaction };
    } catch (error) {
        console.error('An error occurred while sending Sol:', error);
        return { success: false, error: error };
    }
}

function toLamports(sol) {
    return sol * LAMPORTS_PER_SOL;
}

function calculateCostInLamports(costInLamportsPerToken, amountOfToken) {
    return costInLamportsPerToken * amountOfToken;
}

async function buyTokens(userPrivateKey, tokenAddress, costInLamportsPerToken, amountOfTokens){
    const buyerWallet = getKeypair(userPrivateKey);
    console.log('Buyer wallet:', buyerWallet.publicKey.toBase58());
    try {
        const amountInLamports = costInLamportsPerToken * amountOfTokens;
        console.log(amountInLamports)
        const sendSolTransaction = await sendSol(userPrivateKey, owner_wallet.publicKey.toBase58(), amountInLamports);
        if(!sendSolTransaction.success) return { success: false, error: 'An error occurred while sending SOL!' };
        const sendTokensToBuyerTransaction = await transferTokens(process.env.SOLANA_PRIVATE_KEY, tokenAddress, buyerWallet.publicKey.toBase58(), amountOfTokens);
        return { 
            success: true, 
            transactions: {
                sendSol: sendSolTransaction,
                sendTokens: sendTokensToBuyerTransaction
            },
            transactionsLink: {
                sendSol: `https://explorer.solana.com/tx/${sendSolTransaction}`,
                sendTokens: `https://explorer.solana.com/tx/${sendTokensToBuyerTransaction}`
            },
            message: 'Tokens bought successfully!'
         };
    } catch (error) {
        console.error('An error occurred while buying tokens:', error);
        return error;
    }
}

async function getNumberDecimals(mintAddress) {
    const info = await connection.getParsedAccountInfo(new PublicKey(mintAddress));
    const result = (info.value?.data).parsed.info.decimals;
    return result;
}

async function main() {
    const transaction = await buyTokens('2Yf3PhR3BtHLT8ps1gFktrDsGcB7mPJtj3BiyT7aSD3LMGxBnvG8sueFmutGQoZjZGQTEdXr6WDtUDKGk9bCUqkU', 'GApiDomLBcR8sRvV7UxQWrQHXF7EXtsQNMRDJYW3zkDj',  10000000, 5);
    console.log(`Math.truce` + 0.06280000000000001);
    console.log(transaction);
}
main();

export { lockCustomTokensInEscrow, claimTokens };
// function main() {
//     claimTokens('2T5CqhBRGAihLZZRuxGAiWwJtPYFVM7aTVAvYYF8jnpY', 'BU1gN8XUHqXj2c2BaBmPtxeACZDV4NMqW6R9LVdsTiao', 1000);
// }
// main();

// async function multiCall() {
//     let sourceAccount = await getOrCreateAssociatedTokenAccount(
//         connection,
//         owner_wallet,
//         new PublicKey('GApiDomLBcR8sRvV7UxQWrQHXF7EXtsQNMRDJYW3zkDj'),
//         owner_wallet.publicKey
//     );
//     let destinationAccount = await getOrCreateAssociatedTokenAccount(
//         connection,
//         owner_wallet,
//         new PublicKey('GApiDomLBcR8sRvV7UxQWrQHXF7EXtsQNMRDJYW3zkDj'),
//         new PublicKey('8tVwpiFyV3BKKUDFH7yHGPhfuE3tx2P9Fei2ZeufLsPe')
//     );
//     const numberDecimals = await getNumberDecimals('GApiDomLBcR8sRvV7UxQWrQHXF7EXtsQNMRDJYW3zkDj');
//     const transactions = [
//         SystemProgram.transfer({
//             fromPubkey: owner_wallet.publicKey,
//             toPubkey: Keypair.generate().publicKey,
//             lamports: 1000000,
//         }),
//         SystemProgram.transfer({
//             fromPubkey: owner_wallet.publicKey,
//             toPubkey: Keypair.generate().publicKey,
//             lamports: 1000000,
//         }),
//         SystemProgram.transfer({
//             fromPubkey: owner_wallet.publicKey,
//             toPubkey: Keypair.generate().publicKey,
//             lamports: 1000000,
//         }),
//         createTransferInstruction(
//             sourceAccount.address,
//             destinationAccount.address,
//             owner_wallet.publicKey,
//             100 * Math.pow(10, numberDecimals),
//         ),
//     ]
//     const transaction = new Transaction().add(...transactions);
//     const sendTransaction = await sendAndConfirmTransaction(connection, transaction, [owner_wallet]);
//     console.log('Transaction sent! Multiple transactions sent!');
//     return sendTransaction;
// }