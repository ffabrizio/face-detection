import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { webcamReady, webcamTakeScreenshot, faceDetection } from '../store/actions'
import Webcam from './Webcam'

class VideoStream extends React.Component {
    
    componentDidMount() {
        setInterval(this.props.takeScreenshot, this.props.interval || 20000)
    }

    render() {
        return (

                <Webcam
                    width={this.props.width}
                    height={this.props.height}
                    audio={false}
                    ref={node => this.props.camReady(node)} />

            )
        }
            
}

const mapStateToProps = state => {
    return { 
        user: state.app.user,
        screenshot: state.app.lastScreenshot
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        camReady: (webcam) => dispatch(webcamReady(webcam)),
        takeScreenshot: () => {
            dispatch(webcamTakeScreenshot())
            dispatch(faceDetection())
        }
    }
}

VideoStream.propTypes = {
    user: PropTypes.object,
    screenshot: PropTypes.string,
    camReady: PropTypes.func.isRequired,
    takeScreenshot: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps) (VideoStream)