import WithdrawForm from "../components/WithdrawForm"
import StakeDetails from "../components/StakeDetails"
import StakeForm from "../components/StakeForm"

const PanelContent = () => {
    return (
        <main className='main w-[65%] m-auto'>
            <StakeDetails />
            <div className="flex justify-center gap-x-4">
                <StakeForm />
                <WithdrawForm/>
            </div>
        </main>
    )
}

export default PanelContent