import React from 'react'
import styles from './styles.module.css'


class ResultView extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render = () => {
        return (
            <div>
                <h2 className={styles.text}>You scored {this.props.player.score} out of {this.props.numOfQuestions}</h2>
            </div>
        )
    }
}

export default ResultView
