import { React, useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import { ABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    console.log({
        provider,
        signer,
        contract
    });
};


export const Context = ({ children }) => {

    const [connectedAcc, setConnectedAcc] = useState('');
    const [currentAcc, setCurrentAcc] = useState('');
    const [formData, setFormData] = useState({
        addressTp: '',
        amount: '',
        keyword: '',
        message: ''
    });


const formChangeHandler = (e, name) => {

    setFormData((prevStat)=>({...prevStat, [name]: e.target.value}))
}

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert("Please install meatmask");
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAcc(accounts[0])

        }
        catch (error) {
            if (error.code === 4001) {
                console.log("Please connect to MetaMask");
            } else {
                console.log(error);
                throw new Error("No thereum Object")
            }
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert("Please install teh Metamask");
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts);
            if (accounts.length) {
                setCurrentAcc(accounts[0]);
            } else {
                console.log("No Accounts Found!")
            }
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Onject");
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) alert("Please install metamask");

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAcc,
            formData,
            setFormData,
            formChangeHandler
        }}>
            {children}
        </TransactionContext.Provider>
    );
}