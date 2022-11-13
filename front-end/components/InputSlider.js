import React from 'react'

const InputSlider = ({min, max, amount, sliderKey, handleSlider}) => {
    return (
        <input 
            className="w-full h-0.5 outline-none border-none bg-black"
            placeholder={amount} 
            value={amount} 
            onChange={(e)=> handleSlider(e.target.value)}
            type="range" 
            name={sliderKey} 
            id={sliderKey} min={min} max={max} step="1">
        </input>
    )
}

export default InputSlider