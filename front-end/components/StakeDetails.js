// how many tokens are in our wallet
// how many tokens are staked
// how many tokens we have earned
import { useContext } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { stakingAddress, stakingAbi, rewardTokenAbi, rewardTokenAddress } from "../constants"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import PanelWidget from './PanelWidget.js'
import logo from '../public/logo.png';
import { BalancesDispatchContext } from '../contexts/BalancesContext.js';

export default function StakeDetails() {
    const dispatch = useContext(BalancesDispatchContext);
    const { account, isWeb3Enabled } = useMoralis()
    const [earnedBalance, setEarned] = useState("0")
    const [rtBalance, setRtBalance] = useState("0")
    const [stakedBalance, setStakedBalance] = useState("0")

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
            await getRtBalance({ onError: (error) => console.error(error) })
        ).toString()

        const formatttedRtBalanceFromContract = ethers.utils.formatUnits(
            rtBalanceFromContract,
            "ether"
        )
        setRtBalance(formatttedRtBalanceFromContract)

        const stakedFromContract = (
            await getStakedBalance({ onError: (error) => console.error(error) })
        ).toString()
        const formatttedstakedFromContract = ethers.utils.formatUnits(stakedFromContract, "ether")
        setStakedBalance(formatttedstakedFromContract)

        const earnedFromContract = (
            await getEarned({ onError: (error) => console.error(error) })
        ).toString()
        
        const rewardPerToken = (
            await getRewardPerToken({ onError: (error) => console.error(error) })
        ).toString()

        console.log(`Reward per token: ${rewardPerToken}`);
        console.log(`Earned: ${earnedFromContract}`)

        const formatttedEarnedFromContract = ethers.utils.formatUnits(earnedFromContract, "ether")
        setEarned(formatttedEarnedFromContract)

        // Update Context
        dispatch({
            type: 'updateBalances',
            earnedBalance: earnedFromContract,
            rtBalance: formatttedRtBalanceFromContract,
            stakedBalance: formatttedstakedFromContract,
        }); 
    }

    return (
        <div id="panel-numbers">
            <div className="">
                <div className="gap-x-4 flex justify-center w-full">
                    <PanelWidget logo={{src: logo, height: 12, width: 20}} title="SAFE Balance is:" number={toEuNumberFormat(rtBalance, rtBalance.length)}/>
                    <PanelWidget logo={{src: logo, height: 12, width: 20}} title="Earned Balance is:" number={toEuNumberFormat(earnedBalance, 5)}/>
                    <PanelWidget logo={{src: logo, height: 12, width: 20}} title="Staked Balance is:" number={toEuNumberFormat(stakedBalance, stakedBalance.length)}/>
                </div>
            </div>
        </div>
    )
}
