import React from 'react'

const Emoji = ({compLabel, emoji, compStyle}) => {
    return (
    <span role="img" aria-label={compLabel} className={compStyle}>{emoji}</span>
    )
}

export default Emoji