import { useState, useContext } from "react";
import { rewardTokenAbi, rewardTokenAddress, stakingAbi, stakingAddress } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers";
import Emoji from "./Emoji";
import {BalancesContext} from '../contexts/BalancesContext'

const WithdrawForm = () => {
    const balances = useContext(BalancesContext);
    const { account, isWeb3Enabled } = useMoralis()
    const { runContractFunction } = useWeb3Contract()
    const [withdrawAmount, setWithdrawAmount] = useState("0");

    // Set up the params for approving the balance
    let approveOptions = {
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
    }

    let withdrawOptions = {
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "withdraw",
    }

    const handleWithdrawSubmit = async (e) => {
        e.preventDefault()
        // Check for insufficiant funds
        if(Number(balances.stakedBalance) > Number(withdrawAmount)){
            const amountToApprove = withdrawAmount
            approveOptions.params = {
                amount: ethers.utils.parseUnits(amountToApprove, "ether").toString(),
                spender: stakingAddress,
                account: account
            }
            console.log("Approving...")
            const tx = await runContractFunction({
                params: approveOptions,
                onError: (error) => console.log(error),
                onSuccess: (results) => {
                    console.log(results);
                },
            })
        }else{
            console.error("Insufficiant Balance");
            return false
        }
    }

    async function handleApproveSuccess(amountToStakeFormatted) {
        withdrawOptions.params = {
            amount: amountToStakeFormatted,
        }
        console.log(`Staking ${withdrawOptions.params.amount} RT Token...`)
        const tx = await runContractFunction({
            params: withdrawOptions,
            onError: (error) => console.log(error),
            onSuccess: () => {
                handleApproveSuccess()
            },
        })
        await tx.wait(3)
        console.log("Transaction has been confirmed by 3 blocks")
    }
    

    return (
        <div id="panel-withdraw" className="w-1/2">
            <div className="bg-white rounded-md shadow p-10">
                <form 
                    className="w-full flex justify-center flex-col"
                    onSubmit={handleWithdrawSubmit} 
                >
                    <h3 className="text-2xl text-center font-semibold uppercase">Withdraw Funds</h3>
                    <div className="slider-container mt-10">
                        <input className="sliderInput mb-8 ml-auto mr-auto block w-24 text-center" type="number" name="amountToWithdrawInput" value={withdrawAmount} onChange={(e)=> setWithdrawAmount(e.target.value)}></input>
                        <div className="slider-wrapper flex flex-col justify-center align-center items-center">
                            <div className="slider flex justify-center items-center w-full">
                                <Emoji compStyle="text-3xl" compLabel="rock" emoji="🪨"/>
                                <input 
                                    className="w-full h-0.5 outline-none border-none bg-black"
                                    onChange={(e)=> setWithdrawAmount(e.target.value)}
                                    placeholder={withdrawAmount}
                                    type="range" name="amountToWithdraw" id="amountToWithdraw" min="0" max={balances.stakedBalance} step="1" key="amountToWithdraw">
                                </input>
                                <Emoji compStyle="text-3xl" compLabel="coin" emoji="🪙"/>
                            </div>
                            <label className="text-textLight text-base text-right w-full mt-4" htmlFor="amountToWithdraw">Amount to widthdraw (Reward Tokens)</label>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <input className="bg-secondaryBlue px-8 font-semibold rounded-md py-2 mt-10 inline-block w-fit text-primaryBlue border-3 hover:bg-primaryBlue hover:text-white cursor-pointer" type="submit" value="Withdraw" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WithdrawForm