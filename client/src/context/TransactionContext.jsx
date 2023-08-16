import { React, useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import { ABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    return contract;
};

export const Context = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransaction] = useState([])
    const [currentAcc, setCurrentAcc] = useState('');
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });

    const value = "this is working";

    const handleChange = (e, name) => {

        setFormData((prevStat) => ({ ...prevStat, [name]: e.target.value }));
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


    const getAllTransaction = async () => {

        try {

            if (!ethereum) return alert("Please install Metamask");
            const transactionContract = getEthereumContract();
            const availableTransaction = await transactionContract.getAllTransactions();
            const structuredTransaction = availableTransaction.map((t) => ({
                addressTo: t.receiver,
                addressFrom: t.sender,
                timestamp: new Date(t.timestamp.toNumber() * 1000).toLocaleString(),
                message: t.message,
                keyword: t.keyword,
                amount: parseInt(t.amount._hex)/(10**18)
            }));

            setTransaction(structuredTransaction);
            console.log("Transactions", structuredTransaction);


        } catch (error) {
            console.log(error);
        }

    }

    const checkIfTransactionsExist = async () => {

        try {
            const transactionContract = getEthereumContract();
            const transactionsCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionsCount);

        } catch (error) {
            console.log(error);

            // throw new Error("No ethereum Object");
        }

    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert("Please install teh Metamask");
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts);
            if (accounts.length) {
                setCurrentAcc(accounts[0]);
                getAllTransaction();

            } else {
                console.log("No Accounts Found!")
            }
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) alert("Please install metamask");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAcc,
                    to: addressTo,
                    gas: '0x5208',  //21000 Gwei
                    value: parsedAmount._hex, //0.00001
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            if (error.code == 4001) alert("User Denied Transaction");
            else {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAcc,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            value,
            transactions,
            isLoading
        }}>
            {children}
        </TransactionContext.Provider>
    );
}