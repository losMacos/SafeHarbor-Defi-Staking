import { ConnectButton } from "@web3uikit/web3";

export default function Header() {
    return (
        <nav>
            <h1>Safe Harbor Defi</h1>
            <div>
                <ConnectButton />
            </div>
        </nav>
    );
}