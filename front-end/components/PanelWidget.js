import React from 'react'
import Image from 'next/image'

const PanelWidget = ({logo, title, number}) => {

    return (
    <div className="flex-initial min-w-panelNumbers px-10 py-5 bg-white shadow mb-4 flex-1 rounded-md">
        <div className="text-textLight text-base">
            <Image
                src={logo.src}
                height={logo.height}
                width={logo.width}>
            </Image>
            {title}</div>
        <div className="text-2xl font-bold">{number}</div>
    </div>
    )
}

export default PanelWidget