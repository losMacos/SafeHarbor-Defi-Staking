// how many tokens are in our wallet
// how many tokens are staked
// how many tokens we have earned
import { useMoralis, useWeb3Contract } from "react-moralis"
import { stakingAddress, stakingAbi, rewardTokenAbi, rewardTokenAddress } from "../constants"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import Image from 'next/image';
import logo from '../public/logo.png';

export default function StakeDetails() {
    const { account, isWeb3Enabled } = useMoralis()
    const [rtBalance, setRtBalance] = useState("0")
    const [stakedBalance, setStakedBalance] = useState("0")
    const [earnedBalance, setEarned] = useState("0")

    const { runContractFunction: getRtBalance } = useWeb3Contract({
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        },
    })

    const { runContractFunction: getStakedBalance } = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "getStaked",
        params: {
            account: account,
        },
    })

    const { runContractFunction: getEarned } = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "earned",
        params: {
            account: account,
        },
    })
    
    const { runContractFunction: getRewardPerToken } = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "rewardPerToken",
        params: {
            account: account,
        },
    })

    const toEuNumberFormat = (number, rounded) => {
        // Return a string formated with ',' and rounded to the specific number
        return new Intl.NumberFormat('en-GB', {maximumSignificantDigits: rounded}).format(number)
    }

    useEffect(() => {
        // update the UI and get balances
        if (isWeb3Enabled && account) {
            updateUiValues()
        }
    }, [account, isWeb3Enabled])

    async function updateUiValues() {
        const rtBalanceFromContract = (
            await getRtBalance({ onError: (error) => console.log(error) })
        ).toString()
        const formatttedRtBalanceFromContract = ethers.utils.formatUnits(
            rtBalanceFromContract,
            "ether"
        )
        setRtBalance(formatttedRtBalanceFromContract)

        const stakedFromContract = (
            await getStakedBalance({ onError: (error) => console.log(error) })
        ).toString()
        const formatttedstakedFromContract = ethers.utils.formatUnits(stakedFromContract, "ether")
        setStakedBalance(formatttedstakedFromContract)

        const earnedFromContract = (
            await getEarned({ onError: (error) => console.log(error) })
        ).toString()
        
        const rewardPerToken = (
            await getRewardPerToken({ onError: (error) => console.log(error) })
        ).toString()

        console.log(`Reward per token: ${rewardPerToken}`);

        console.log(`Earned: ${earnedFromContract}`)

        const formatttedEarnedFromContract = ethers.utils.formatUnits(earnedFromContract, "ether")
        setEarned(formatttedEarnedFromContract)
    }

    return (
        <div id="panel">
            <div className="panel flex justify-center">
                <div className="flex-initial min-w-panelNumbers px-10 py-5 bg-white shadow mb-5 mx-2 rounded-md">
                    <div className="text-textLight text-base">
                        <Image
                            src={logo}
                            height={12}
                            width={20}>
                        </Image>
                        RT Balance is:
                    </div>
                    <div className="text-2xl font-bold">{toEuNumberFormat(rtBalance, rtBalance.length)}</div>
                </div>
                <div className="flex-initial min-w-panelNumbers px-10 py-5 bg-white shadow mb-5 mx-2 rounded-md">
                    <div className="text-textLight text-base">
                        <Image
                            src={logo}
                            height={12}
                            width={20}>
                        </Image>
                        Earned Balance is:</div>
                    <div className="text-2xl font-bold">{toEuNumberFormat(earnedBalance, earnedBalance.length)}</div>
                </div>
                <div className="flex-initial min-w-panelNumbers px-10 py-5 bg-white shadow mb-5 mx-2 rounded-md">
                    <div className="text-textLight text-base">
                        <Image
                            src={logo}
                            height={12}
                            width={20}>
                        </Image>
                        Staked Balance is:</div>
                    <div className="text-2xl font-bold">{toEuNumberFormat(stakedBalance, stakedBalance.length)}</div>
                </div>
            </div>
        </div>
    )
}
