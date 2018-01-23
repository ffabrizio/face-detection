import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

const Log = ({ user, product, log, loading }) =>  {
    return (
        <div className="log">
            <p>{processLog({ user, log })}</p>
            <p dangerouslySetInnerHTML={{__html: getUserDetails(user, product, loading) }} />
        </div>
    )
}

const processLog = ({ user, log }) => {
    if (log === 'User detected!' && user === undefined) {
        return 'User not identified. Try moving the camera in a better position.'
    }

    return log
}

const getUserDetails = (user, product, loading) => {
    if (!loading && user !== undefined && user.name !== undefined) {
        let msg = `<p>detected <strong>${user.name}</strong> age <strong>${user.age}</strong> gender <strong>${user.gender}</strong>...</p>`;
        msg += `<p>looking at: <strong>${product.name}</strong> (${product.tags})</p>`
        if (user.emotions !== undefined) {
            const sortable = processEmotions(user.emotions)
            msg += `<p>emotions: ${sortable[0][0]} (${(sortable[0][1] * 100).toFixed(2)}%) / ${sortable[1][0]} (${(sortable[1][1] * 100).toFixed(2)}%)</p>`
        }
        return msg
    }

    return ''
}

const processEmotions = (emotions) => {
    var items = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise']
    var sortable = []
    items.map(i => {
        sortable.push([i, emotions[i]])
        return i;
    })
    sortable.sort((a, b) => {
        return a[1] - b[1]
    }).reverse()

    return sortable;
}


const mapStateToProps = state => {
    return { 
        user: state.app.user,
        log: state.app.log,
        product: state.app.products[state.app.current],
        loading: state.app.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

Log.propTypes = {
    user: PropTypes.object,
    log: PropTypes.string,
    product: PropTypes.object,
    loading: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps) (Log)