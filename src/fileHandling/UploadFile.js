import React, {useState} from "react";
import TreeDisplay from "../components/tree/TreeDisplay";

export function UploadFile() {
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState(null);
    const [fileJSON, setFileJSON] = useState(null);

    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        setFileName(e.target.files[0].name);
        // Set file and fileJSON according to file chosen.
        fileReader.onload = e => {
            setFile(e.target.result);
            setFileJSON(JSON.parse(e.target.result))
        };

    };

    return (
        <>
            { file ? <h4 align={"center"}>Visualization of {fileName}</h4> : <h4 align={"center"}>Upload PIQUE json file to visualize the results.</h4>}

            {file ? null : <input type="file" onChange={handleChange} />}
            <br />
            { file ? "Uploaded file content -- " + JSON.stringify(fileJSON.additionalData): null}

            {file ? <TreeDisplay fileData={fileJSON}/> : null}

        </>
    );
}