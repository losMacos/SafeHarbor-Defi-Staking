import "../styles/globals.css"
import { MoralisProvider } from "react-moralis";
import { BalancesProvidder } from '../contexts/BalancesContext.js';

function MyApp({ Component, pageProps }) {
    return (
        <BalancesProvidder>
            <MoralisProvider initializeOnMount={false}>
                <Component {...pageProps} />
            </MoralisProvider>
        </BalancesProvidder>
        
    )
}

export default MyApp
