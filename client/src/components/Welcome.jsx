import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import eth from '../../images/ethereum.svg';
import { Loader } from './'
const Welcome = () => {
    const commonStyles = 'min-h-[70px] sm:px-0 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white '

    const connectWallet = () => {

    }

    return (
        <div className=" flex w-full justify-center items-centered">
            <div className="flex md:flex-row flex-col item-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justofy-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across teh world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Expore the crypto world. Buy and sell crypto currency with crypto
                    </p>

                    <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    >
                        <p className="text-white text-base font-semibold">Connect Wallet</p>
                    </button>
                    <div className=" grid sm:grid-cols-3 grid-cols-2 mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={`${commonStyles}`}>
                            Security
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={`${commonStyles}`}>
                            Low Fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blckchain
                        </div>

                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-fll md:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism">
                        <div className=" flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">

                                <div className=" w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff"/>
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff"/>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Welcome;
