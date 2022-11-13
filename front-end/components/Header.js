import Image from 'next/image';
import { ConnectButton } from "web3uikit";
import logo from '../public/logo.png';
import { useRouter } from 'next/router';
import ethSVG from '../public/eth.svg';

export default function Header() {
    const router = useRouter();

    return (
        <nav className="py-3 border-b-2 border-lightGrey px-10 mb-10 flex flex-row bg-white">
            <Image
                className='cursor-pointer'
                onClick={()=> router.push('/')}
                src={logo}
                height={50}
                width={100}>
            </Image>
            <div className="ml-auto p-2 flex">
                <Image src={ethSVG} height={10} width={10} alt={"etherium logo"}/>
                <ConnectButton moralisAuth={false} signingMessage={"Connected"}/>
            </div>
        </nav>
    )
}
