import "./NodeDescriptionPanel.css"
import linear from './linearLine.PNG';
import gaussian from './gaussianLine.PNG';
import gam from './gamLine.png';


export function determineNodeInfo(node,impacts) {

    const node_type = determineNodeType();

    function determineNodeType() {
        if (node.name.includes("Measure")) return "Measure";
        else if (node.name.includes("Diagnostic")) return "Diagnostic";
        else if (node.name.includes("Category")) return "Product Factor";
        else if (node.name) return "TQI";
        
        else return "Quality Aspect";
    }

    function getThresholds() {
        const thresholds_array = node.thresholds;
        let thresholds = "";
        for (let i = 0; i < thresholds_array.length; i++) {
            thresholds += (thresholds_array[i] === 0 ? "0" : thresholds_array[i].toFixed(4)) + ",";
        }
        thresholds = thresholds.substring(0,thresholds.length-1);
        return thresholds;
    }

    function getCorrectNumberWithSuffix(num) {
        const last_digit = num % 10;
        switch (last_digit) {
            case 1:
                return "1st"
            case 2:
                return "2nd"
            case 3:
                return "3rd"
            default:
                return last_digit + "th"
        }
    }

    function getQualityImpactScore() {
        if (node_type === "Quality Aspect" || node_type === "Product Factor" || node_type === "Measure") {
            return <div><b>Quality Impact Score: </b>
                {impacts[node_type][node.name].value !== 0 ?
                    <>{impacts[node_type][node.name].value.toFixed(4)}
                        <i style={{"paddingLeft" : "0.5vw"}}>(Ranked {getCorrectNumberWithSuffix(impacts[node_type][node.name].rank)} highest of {Object.keys(impacts[node_type]).length} {node_type}s)</i></>
                    : 0
            }
            </div>
        }
    }
    
    // change the name of the node when it is created as well as the image associated with gam
    // TO DO: change the height and width to change as the screen size changes
    // TO DO: Test the changes of adding the class name 

    function graphImage(){
        if (node.utility_function === 'pique.evaluation.DefaultUtility'){
            return ( <img src={linear} alt="Linear Graph" width={30} height={30} /> );
            //return ( <img src={linear} alt="Linear Graph" width={20} height={20}/> );
        } else if (node.utility_function === 'evaluator.BinaryUtility'){
            return ( <img src={linear} alt="Linear Graph" width={30} height={30} /> );
        } else if (node.utility_function === 'pique.evaluation.GaussianUtility'){
            return ( <img src={gaussian} alt="Gaussian Graph" width={40} height={20}/> );
        } else if (node.utility_function === 'pique.evaluation.GamUtility'){
            return ( <img src={gam} alt="Gamutility Graph" width={30} height={30}/> );
        } 
     }


    return (
        <>
            <div className="node-name">{node.name}</div>
            <div className="node-info">
                <div><b>Node Type: </b>{node_type}</div>
                <div><b>Value: </b>{node.value.toFixed(5)}</div>
                {node.description !== "" ? <div><b>Description: </b>{node.description}</div> : null}
                {node_type === "Measure" ? <div><b>Thresholds: </b>[{getThresholds(node)}]</div> : null}
                {node_type === "Diagnostic" ? <div><b>Tool: </b>{node.toolName}</div> : null}
                <div><b>Evaluation Strategy: </b>{node.eval_strategy}</div>
                <div><b>Normalizer: </b>{node.normalizer}</div>
                <div><b>Utility Function: </b>{node.utility_function} 
                    {graphImage()}
                </div>                
                {getQualityImpactScore()}
                
            </div>
            
        </>
    )
}