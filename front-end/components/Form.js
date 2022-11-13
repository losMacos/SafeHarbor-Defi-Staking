import React from 'react'

const Form = () => {
    return (
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
                        <input 
                            className="w-[60%] h-0.5 outline-none border-none bg-black"
                            placeholder={stakeAmount} value={stakeAmount} onChange={(e)=> setStakeAmount(e.target.value)}
                            type="range" name="amountToStake" id="amountToStake" min="0" max="100000" step="1" key="amountToStake"></input>
                        <Emoji compStyle="text-3xl" compLabel="rocket" emoji="🚀"/>
                    </div>
                    <label className="text-textLight text-base text-right w-[60%]" htmlFor="amountToStake">Amount to stake (in ETH)</label>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <input className="bg-secondaryBlue px-8 font-semibold rounded-md py-2 mt-10 inline-block w-fit text-primaryBlue border-3 hover:bg-primaryBlue hover:text-white cursor-pointer" type="submit" value="Stake" />
            </div>
        </form>
    )
}

export default Form