import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { faceDetection } from '../store/actions'
import Webcam from './Webcam'

class VideoStream extends React.Component {
    
    componentDidMount() {
        setInterval(this.takeScreenshot, this.props.interval || 20000)
    }


    takeScreenshot = () => {
        const screenshot = this.webcam.getScreenshot()
        this.props.onTakeScreenshot(screenshot)
    }

    render() {
        return (

                <Webcam
                    width={this.props.width}
                    height={this.props.height}
                    audio={false}
                    ref={node => this.webcam = node} />

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
        onTakeScreenshot: (data) => dispatch(faceDetection(data))
    }
}

VideoStream.propTypes = {
    user: PropTypes.object,
    screenshot: PropTypes.string,
    onTakeScreenshot: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps) (VideoStream)