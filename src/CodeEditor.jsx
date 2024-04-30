import React, { useState, useCallback, cloneElement } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './CodeEditor.css'
import { EditorView } from "@codemirror/view"
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
// import OffcanvasExample from './Navbar'
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AirplayRounded, AodRounded, DesktopMacRounded, DoneRounded } from '@mui/icons-material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';




let myTheme = EditorView.theme({
    "*": {

        // borderRadius: '5px'
    },
    // ".cm-scroller": { overflow: "auto" },
})





const HtmlRunner = () => {
    //const [htmlCode, setHtmlCode] = useState('');

    const [value, setValue] = useState("");

    const [isCopied, setCopied] = useState(true);


    const [isDesktop, setDesktop] = useState(true);

    const onChange = useCallback((val, viewUpdate) => {
        console.log(val)
        setValue(val);
    }, []);

    const iframe = document.getElementById("outputFrame");


    // function to handle the click on the run code button
    const handleRun = () => {

        // get the iframe element
        const iframe = document.getElementById("outputFrame");

        const frameDoc = iframe.contentDocument || iframe.contentWindow.document;
        frameDoc.documentElement.innerHTML = "";

        // write the code to the iframe document
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(value);
        iframe.contentWindow.document.close();
    };


    // function to handle the click on the clear canvas button
    const handleClear = () => {
        // get the iframe element
        const iframe = document.getElementById("outputFrame");
        // clear the iframe document
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write("");
        iframe.contentWindow.document.close();
    };



    function toggleOverlay() {
        var overlay = document.getElementById('overlay');
        if (overlay.style.display === 'block') {
            overlay.style.display = 'none';
        } else {
            overlay.style.display = 'block';
        }
    }

    function hideOverlay() {
        var overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
    }


    function mobileView() {
        var overlay = document.getElementById('tareaCodemirror');
        overlay.style.width = '400px'
        overlay.style.height = '500px'
    }


    function desktopView() {
        var overlay = document.getElementById('outputFrame');
        if (isDesktop) {
            overlay.style.width = '50%'
            overlay.style.marginLeft = '25%'
            setDesktop(false)
        }
        else{
            overlay.style.width = '97%'
            overlay.style.height = '75%'
            overlay.style.marginLeft = '1%'
            setDesktop(true)
        }

    }





    const handleCopy = () => {
        console.log(isCopied)



        navigator.clipboard.writeText(value);

        setCopied(false);


        setTimeout(
            () => {
                setCopied(true);

            }, 2500
        )

        // alert('Code copied to clipboard!');
    };






    return (
        <div className="big-box">
            {/* <OffcanvasExample /> */}
            <div className="main-container">
                <div className="container">
                    <h3>Input</h3>


                    {/* <textarea style={{ 'width': '300px', 'height': '250px' }} onChange={onChange} id="editor" ></textarea> */}


                    <CodeMirror id="editor" style={{ 'borderRadius': '10px', 'fontSize': '15px', 'alignItems': 'center', 'display': 'flex' }}
                        theme={myTheme}
                        value={value}
                        height="100%"
                        width="100%"
                        extensions={[html()]}
                        onChange={onChange}

                    />



                    <div style={{ 'display': 'flex','marginTop': '3%' }}>

                        <button style={{  'background': 'transparent', 'borderRadius': '5px' }} onClick={toggleOverlay}>
                            <FullscreenRoundedIcon>
                            </FullscreenRoundedIcon>
                        </button>
                        <button style={{  'marginLeft': '20px','background': 'transparent', 'borderRadius': '5px', 'color': 'green' }} variant="success" onClick={handleRun} >
                            <PlayArrowRoundedIcon>

                            </PlayArrowRoundedIcon>
                        </button>

                        <button style={{ 'marginLeft': '20px', 'background': 'transparent', 'borderRadius': '5px' }} onClick={handleCopy} id='copybutton'>
                            {/* <ContentCopyRoundedIcon ></ContentCopyRoundedIcon> */}

                            {isCopied ? (<ContentCopyRoundedIcon></ContentCopyRoundedIcon>) : (<DoneRounded style={{ 'color': 'green' }}></DoneRounded>

                            )}
                        </button>
                    </div>


                    <div className='overlay' id="overlay" >

                        <button id="hide-overlay-btn" style={{ 'borderRadius': '5px', 'backgroundColor': 'lightgray' }} onClick={hideOverlay}>
                            <FullscreenExitRoundedIcon style={{ 'color': 'black' }}>
                            </FullscreenExitRoundedIcon>
                        </button>


                        {/* <ToggleButtonGroup
                            style={{ 'borderRadius': '5px', 'backgroundColor': 'lightgray' }}

                            id="hide-overlay-btn"
                            exclusive
                            size='small'

                        >
                            <ToggleButton>
                                <AirplayRounded style={{ 'color': 'black' }} alt='fghj' onClick={desktopView}></AirplayRounded>
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
                                <AodRounded style={{ 'color': 'black' }} onClick={mobileView}></AodRounded>
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned">
                                <FullscreenExitRoundedIcon style={{ 'color': 'black' }} onClick={hideOverlay}>
                                </FullscreenExitRoundedIcon>
                            </ToggleButton>

                        </ToggleButtonGroup> */}

                        <svg data-testid="FullscreenExitRoundedIcon"></svg>

                        <div className="content">
                            {/* <p>Selectable text</p> */}

                            <div id="tarea2" style={{ 'borderRadius': '5px' }}>
                                <CodeMirror
                                    style={{ 'width': '1000px', 'height': '400px', 'fontSize': '15px', 'backgroundColor': 'rgb(236, 236, 236)' }}
                                    theme={myTheme}
                                    value={value}
                                    height='100%'
                                    width='100%'
                                    id='tareaCodemirror'
                                    onChange={onChange}
                                    extensions={[html()]}
                                // id="editor"
                                ></CodeMirror>
                            </div>

                        </div>
                    </div>



                </div >

                <div className="second-container">
                    <h3 style={{ 'textAlign': 'center' }}>Output</h3>

                    <iframe id="outputFrame"></iframe>


                    <a style={{ 'display': 'flex', 'justifyContent': 'center', 'marginTop': '0%', 'marginBottom': '0%' }} >


                        
                        <button onClick={desktopView} style={{ 'marginTop': '0%', 'marginRight': '2%', 'background': 'transparent', 'borderRadius': '5px' }} >
                            {isDesktop ? (<AodRounded/>):(<AirplayRounded/>)}
                        </button>


                        <button style={{ 'marginTop': '0%', 'background': 'transparent', 'borderRadius': '5px', 'color': 'red' }} onClick={handleClear}>
                            <CloseRoundedIcon></CloseRoundedIcon>
                        </button>


                    </a>
                </div >
            </div >
        </div >

    );
};

export default HtmlRunner;
