import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import { useChain } from "react-moralis"
import PanelContent from "../components/PanelContent"

export default function Home() {
    const { switchNetwork, chainId, chain, account } = useChain()
    return (
        <div className={styles.container}>
            <Header />
            <PanelContent/>
        </div>
    )
}
