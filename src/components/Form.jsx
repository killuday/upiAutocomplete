import {useState} from "react";
import {NOOP,BANK_UPI_HANDLES} from "../constants";
import "../styles.css"
const Form=()=>{
    const [upiId,setupiId]=useState("");
    const [prediction,setPrediction]=useState("")
    const[predictions,setPredictions]=useState([])
    const handleUpiChange=(e)=>{
        const{
            target:{value = ""}
        }=e;

        setupiId(value)

        if(!value.includes("@")){
            setPrediction(value || "")
            setPredictions([])
            return;
        }


        const [currentUserVPA,currentUserBankName]=value.split("@");

        if(!currentUserVPA) return;
        const userBankNameReg= new RegExp(`${currentUserBankName}`);
        const matchedBankNames= BANK_UPI_HANDLES.filter((bankName)=>{
            return userBankNameReg.test(bankName);
        });
        // console.log(matchedBankNames)
        let currentPredictedBankName=matchedBankNames[0];

        if(currentPredictedBankName && !matchedBankNames.length){
            currentPredictedBankName="";
        }

        setPrediction(`${currentUserVPA}@${currentPredictedBankName}`);
        setPredictions(matchedBankNames)

    };

    const  handleKeyPressDown=(e)=>{
        // console.log(e)
        const {which=-1, keyCode=-1,code=""}=e;
        const isrightArrowClick= which === 89 || keyCode === 89 || code.toLowerCase() === "arrowright";

        if(isrightArrowClick){
            setupiId(prediction)
            setPredictions([])
        }



    }
    const handleBankNameClick=(e)=>{
        const {target}=e;
        const currentBankName=target.getAttribute("data-bank-name")
        const [currentUserVPA]=upiId.split("@")
        const updatedUpiId= `${currentUserVPA}@${currentBankName}`

        setupiId(updatedUpiId)
        setPrediction(updatedUpiId)
        setPredictions([])
    }


    return(
        <form>

                <div className="input-container">
                    <input type="text"  onChange={NOOP} />
                    <input
                        type="text"
                        pattern=".+@.+"
                        placeholder="Enter your UPI id"
                        autoCapitalize="off"
                        autoComplete="off"
                        spellCheck="off"
                        value={upiId}
                        onChange={handleUpiChange}
                        onKeyDown={handleKeyPressDown}
                    />
                </div>
                <button>Pay Now</button>
            {
                predictions.length ? (
                    <ul>
                        {
                            predictions.map(prediction => {
                                return <li key={prediction} data-bank-name={prediction} onClick={handleBankNameClick}>{prediction}</li>
                            })

                        }
                    </ul>
                ): null
            }

        </form>
    )
}

export default Form;