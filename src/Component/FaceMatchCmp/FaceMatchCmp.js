import React from 'react';
import Aux from '../../hoc';
import { connect } from 'react-redux';
import { widthHeight  } from '../../Store/Actions/UsersActions/ChatAction';

const FaceMatchCmp = (props) => {
    const widht = props.InfoRdr.wh
    if (props.pic.mode) {
        const canvas = document.getElementById("canvas");
        if (canvas) {
            const context = canvas.getContext('2d');
            context.drawImage(props.pic.mode, 0, 0, widht['width'], widht['height']);
            // let img = canvas.toDataURL('image/png', 1.0);
            // props.canvasImage(img);
            // let imgPath = img.split(',')[1]
            // props.livecheck(imgPath);
        }
    }

    return (
        <Aux>
            <div className="photos">
                <h2 className="info-title mb-1">
                    FACE MATCH AND LIVENESS CHECK
      {/* <span className="success"><i className="far fa-check-circle"></i></span> */}
                    {/* <span className="danger"><i className="far fa-times-circle" /></span> */}
                    {/* <span className="warning"><i className="far fa-question-circle"></i></span> */}
                </h2>
                <div className="row m-0">
                    <div className="col p-0 disabledButton">
                        <div className="photo-img border">
                            {props.photos.info.pandetails?.map((data, i) =>
                                (<img key={i} src={data.aipht ? "data:image/png;base64," + data.aipht : '../images/noimg.png'} onClick={() => props.popup("data:image/png;base64," + data.aipht)} alt="no img" />)
                            )}
                        </div>
                        <h6 className="photo-title mb-1">DATABASE</h6>
                        <span className="text-danger ml-2">Feature Disabled</span>
                        <div className="score-box">
                            {/* <p className="mb-0">Match Score</p> */}
                            <span className="small text-white" style={{ fontSize: "11px" }}>
                                Database Photo
                            </span>
                            {/* <span className="score-status text-center ml-2">
                                {props.panPer <= 50
                                    ? <span>{props.panPer.toFixed(2)}%</span>
                                    : <span style={{ color: "#43e109 !important" }}>{props.panPer.toFixed(2)}%</span>
                                }
                            </span> */}
                        </div>
                    </div>
                    <div className="col p-0">
                        <div className="photo-img photo-img1 position-relative border">
                            <div>
                                <canvas id="canvas" width={widht['width']} height={widht['height']} style={{ objectFit: 'fill', position: "absolute", width: "100%", height: "100%", display: "none" }}></canvas>
                                <img width={widht['width']} height={widht['height']} src={props.pic.canvasImage ? "data:image/png;base64," + props.pic.canvasImage : '../images/noimg.png'} 
                                onClick={() => props.popup("data:image/png;base64," + props.pic.canvasImage)} 
                                style={{ objectFit: 'fill', position: "absolute", width: "100%", height: "100%" }} alt="no img" />
                            </div>
                        </div>
                        <h6 className="photo-title mb-1">LIVE PHOTO</h6>
                        <h6 className="text-center">
                            {props.livecheckPer <= "50"
                                ? <span style={{color: "red"}}>{props.livecheckPer.toFixed(2)}% </span>
                                : <span style={{color: "green"}}>{props.livecheckPer.toFixed(2)}% </span>
                            }
                            
                        </h6>
                    </div>
                    <div className="col p-0">
                        <div className="photo-img border">
                            {props.photos.info.kycdetails?.map((data, i) =>
                                (<img key={i} src={data.pht ? "data:image/png;base64," + data.pht : '../images/noimg.png'} 
                                onClick={() => props.popup("data:image/png;base64," + data.pht)}
                                 alt="no img" />)
                            )}
                        </div>
                        <h6 className="photo-title mb-1">AADHAAR</h6>

                        <div className="score-box">
                            <p className="mb-0">Match Score</p>
                            <span className="small text-white" style={{ fontSize: "11px" }}>
                                AADHAAR - Live
                            </span>
                            {console.log(props.addrPer, props.livecheckPer, props.livecheck)}
                            <span className="score-status text-center ml-2">
                                {props.addrPer <= 50
                                    ? <span>{props.addrPer.toFixed(2)}%</span>
                                    : <span style={{ color: "green" }}>{props.addrPer.toFixed(2)}%</span>
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 text-center box-gap fm-btn">
                <button className="custom-btn mr-2 mb-1 mt-1" onClick={props.livecheck}>
                    LIVENESS CHECK
                    {props.spinner ? <span className="spinner"></span> : null}
                </button>
                <button className="custom-btn mb-1 mt-1" onClick={props.faceMatchCheck}>
                    FACE MATCH
                    {props.spinner3 ? <span className="spinner"></span> : null}
                </button>
                {/* <button className="custom-btn mr-2" onClick={() => props.faceMatchCheck("3")}>
                    FACE MATCH(PAN)
                    {props.spinner3 ? <span className="spinner"></span> : null}
                </button>
                <button className="custom-btn mr-2" onClick={() => props.faceMatchCheck("2")}>
                    FACE MATCH(AADHAAR)
                    {props.spinner2 ? <span className="spinner"></span> : null}
                </button>
                <button className="custom-btn mr-2" onClick={() => props.faceMatchCheck("1")}>
                    FACE MATCH(PAN & AADHAAR)
                    {props.spinner1 ? <span className="spinner"></span> : null}
                </button> */}
            </div>
            <hr className="custom-hr" />

            <div className="row m-0 text-center">
                <div className="col-md p-0">
                    <p className="score-title">AADHAAR Score</p>
                    <h6 className="score-status">
                        {props.addrPer <= 50
                            ? <span>{props.addrPer.toFixed(2)}%</span>
                            : <span style={{ color: "green" }}>{props.addrPer.toFixed(2)}%</span>
                        }
                    </h6>
                </div>
                <div className="col-md p-0">
                    <p className="score-title">Average Match Score</p>
                    <h6 className="score-status text-danger" style={{ color: "green" }}>
                        {props.addrPer ? (props.addrPer <= 50
                            ? <span>{props.addrPer}%</span>
                            : <span style={{ color: "green" }}>{props.addrPer}%</span>)
                            // props.addrPer.toFixed(2) + "%" 
                            : "0"
                        }
                    </h6>
                </div>
                <div className="col-md p-0">
                    <p className="score-title">System Suggested Status</p>
                    <h6 className="score-status">
                        {props.addrPer ?
                            props.addrPer <= 50
                                ? <span>Not Matched</span>
                                : <span style={{ color: "green" }}>Matched</span>
                            : "Not Matched"
                        }
                    </h6>
                </div>
            </div>
            
{/* 
            <div className="row m-0 text-center">
                <div className="col-md p-0">
                    <p className="score-title">AADHAAR Score</p>
                    <h6 className="score-status">
                        {props.fcmatchPer <= 50
                            ? <span>{props.fcmatchPer.toFixed(2)}%</span>
                            : <span style={{ color: "green" }}>{props.fcmatchPer.toFixed(2)}%</span>
                        }
                    </h6>
                </div>
                <div className="col-md p-0">
                    <p className="score-title">Average Match Score</p>
                    <h6 className="score-status text-danger" style={{ color: "green" }}>
                        {props.fcmatchPer ? (props.avgPer <= 50
                            ? <span>{props.avgPer}%</span>
                            : <span style={{ color: "green" }}>{props.avgPer}%</span>)
                            // props.avgPer.toFixed(2) + "%" 
                            : "0"
                        }
                    </h6>
                </div>
                <div className="col-md p-0">
                    <p className="score-title">System Suggested Status</p>
                    <h6 className="score-status">
                        {props.avgPer ?
                            props.avgPer <= 50
                                ? <span>Not Matched</span>
                                : <span style={{ color: "green" }}>Matched</span>
                            : "Not Matched"
                        }
                    </h6>
                </div>
            </div>
             */}
            {/* <hr className="custom-hr" /> */}

        </Aux>
    )
}


const mapStateToProps = (state) => {
    const { InfoRdr } = state;
    return { InfoRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        widthHeight: (width, height) => dispatch(widthHeight(width, height))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceMatchCmp);
