// staking abi
// staking address
// how much they want to stake
// approve our reward token
import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { rewardTokenAbi, rewardTokenAddress, stakingAbi, stakingAddress } from "../constants"
import { Form } from "web3uikit"
import { ethers } from "ethers"

export default function StakeForm() {
    const { runContractFunction } = useWeb3Contract()
    const [stakeAmount, setStakeAmount] = useState(500000);
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

    async function handleStakeSubmit(data) {
        const amountToApprove = data.data[0].inputResult
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
        await tx.wait(2)
        console.log("Transaction has been confirmed by 1 block")
    }

    return (
        <div className="">
            <div className="w-[65%] m-auto bg-white rounded-md shadow p-10">
                <form 
                   className="w-full flex justify-center flex-col"
                    onSubmit={handleStakeSubmit} 
                >
                    <h3 className="text-2xl text-center font-semibold uppercase">Let's stake!</h3>
                    <div className="slider-container mt-10">
                        <input className="sliderInput mb-8 ml-auto mr-auto block w-24 text-center" type="number" name="amountToStakeInput" value={stakeAmount} onChange={(e)=> setStakeAmount(e.target.value)}></input>
                        <div className="slider-wrapper flex flex-col justify-center align-center items-center">
                            <input 
                            className="w-[60%] h-0.5 outline-none border-none bg-black mb-3"
                            type="range" name="amountToStake" id="amountToStake" min="0" max="100000" step="1" value={stakeAmount} key="amountToStake" onChange={(e)=> setStakeAmount(e.target.value)}></input>
                            <label className="text-textLight text-base text-right w-[60%]" for="amountToStake">Amount to stake (in ETH)</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
