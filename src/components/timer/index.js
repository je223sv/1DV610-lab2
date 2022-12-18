import React from 'react'
import styles from './timer.module.css'


class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidUpdate = () => {
        if (this.props.seconds === 0) {
            clearInterval(this.interval)
            this.interval = undefined
        }

        // Setup a new timer
        if (!this.interval && this.props.seconds !== 0) {
            this.setupInterval()
        }
    }

    setupInterval = () => {
        this.interval = setInterval(() => {
            this.props.handleUpdateSeconds()
        }, 1000)
    }

    componentDidMount = () => {
        this.setupInterval()
    }

    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    render = () => {
        return <div className={styles.timer}>{this.props.seconds}</div>
    }

}

export default Timer
