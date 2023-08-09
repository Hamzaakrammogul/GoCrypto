import { React, useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import { ABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
    let provider;

    if (window.ethereum == null) {
        console.log("Metamask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    } else {
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = provider.getSigner();
    }

    const contract = await new ethers.Contract(contractAddress, ABI, signer);
    console.log({
        provider,
        signer,
        contract
    })
};


export const Context = ({ children }) => {

    const [connectedAcc, setConnectedAcc]= useState('');

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert("Please install meatmask");
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
           // setCurrentAccount(accounts[0]);
        }
        catch (error) {
            console.log(error);
           // throw new Error("No ethereum object")
        }
    };
    
    const checkIfWalletIsConnected = async () => {
        if (!ethereum) {
            return alert("Please install teh Metamask");
        }
        const account = await ethereum.request({ methods: 'eth_accounts' })
        console.log(account);
    };
    
    useEffect(() => {
    //  checkIfWalletIsConnected();
    }, [])
    return (
        <TransactionContext.Provider value={{
            connectWallet
        }}>
            {children}
        </TransactionContext.Provider>
    );
}