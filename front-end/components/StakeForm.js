// staking abi
// staking address
// how much they want to stake
// approve our reward token
import { useState, useContext } from "react"
import { useWeb3Contract } from "react-moralis"
import { rewardTokenAbi, rewardTokenAddress, stakingAbi, stakingAddress } from "../constants"
import { ethers } from "ethers"
import Emoji from "./Emoji"
import InputSlider from "./InputSlider"
import {BalancesContext} from '../contexts/BalancesContext'

export default function StakeForm() {
    const balances = useContext(BalancesContext);
    const { runContractFunction } = useWeb3Contract()
    const [stakeAmount, setStakeAmount] = useState("0");

    let approveOptions = {
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "approve",
    }
    
    let stakeOptions = {
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "stake",
    }

    async function handleStakeSubmit(e) {
        e.preventDefault()
        const amountToApprove = stakeAmount
        approveOptions.params = {
            amount: ethers.utils.parseUnits(amountToApprove, "ether").toString(),
            spender: stakingAddress,
        }
        console.log("Approving...")
        const tx = await runContractFunction({
            params: approveOptions,
            onError: (error) => console.log(error),
            onSuccess: () => {
                handleApproveSuccess(approveOptions.params.amount)
            },
        })
    }

    async function handleApproveSuccess(amountToStakeFormatted) {
        stakeOptions.params = {
            amount: amountToStakeFormatted,
        }
        console.log(`Staking ${stakeOptions.params.amount} RT Token...`)
        const tx = await runContractFunction({
            params: stakeOptions,
            onError: (error) => console.log(error),
        })
        await tx.wait(3)
        console.log("Transaction has been confirmed by 3 blocks")
    }

    const handleStakeAmntChange = (value) => {
        setStakeAmount(value)
    }

    return (
        <div id="panel-stake" className="w-1/2">
            <div className="bg-white rounded-md shadow p-10">
                <form 
                   className="w-full flex justify-center flex-col"
                    onSubmit={handleStakeSubmit} 
                >
                    <h3 className="text-2xl text-center font-semibold uppercase">Stake Funds</h3>
                    <div className="slider-container mt-10">
                        <input className="sliderInput mb-8 ml-auto mr-auto block w-24 text-center" type="number" name="amountToStakeInput" value={stakeAmount} onChange={(e)=> setStakeAmount(e.target.value)}></input>
                        <div className="slider-wrapper flex flex-col justify-center align-center items-center">
                            <div className="slider flex justify-center items-center w-full">
                                <Emoji compStyle="text-3xl" compLabel="globe" emoji="🌍"/>
                                <InputSlider min={0} max={balances.rtBalance} amount={stakeAmount} sliderKey="amountToStake" handleSlider={handleStakeAmntChange}/>
                                <Emoji compStyle="text-3xl" compLabel="rocket" emoji="🚀"/>
                            </div>
                            <label className="text-textLight text-base text-right w-full mt-4" htmlFor="amountToStake">Amount to stake (ETH)</label>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <input className="bg-secondaryBlue px-8 font-semibold rounded-md py-2 mt-10 inline-block w-fit text-primaryBlue border-3 hover:bg-primaryBlue hover:text-white cursor-pointer" type="submit" value="Stake" />
                    </div>
                </form>
            </div>
        </div>
    )
}
