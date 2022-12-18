import React from 'react'
import styles from './scoreView.module.css'
import { FaHeart, FaRegLightbulb } from "react-icons/fa";


class ScoreView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderLives = (lives) => {
        let elements = []

        for (let i = 0; i < lives; i++) {
            elements.push(<FaHeart color="red" />)
        }

        return elements
    }

    render = () => {
        const {human, computer} = this.props.players

        return (
            <div className={styles.scoreContainer}>
                <div className={styles.playerScoreContainer}>
                    <div className={styles.playerInfoContainer}>
                        {human.image}
                        <p>{human.name}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        {this.renderLives(human.lives)}
                    </div>
                </div>
                <div className={styles.robotScoreContainer}>

                    <div className={styles.scoreContainer}>
                        {this.renderLives(computer.lives)}
                    </div>

                    <div className={styles.playerInfoContainer}>
                        {computer.image}
                        <p>{computer.name}</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ScoreView
