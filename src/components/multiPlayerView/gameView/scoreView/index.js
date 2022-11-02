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
        const {player, robot} = this.props.players

        return (
            <div className={styles.scoreContainer}>
                <div className={styles.playerScoreContainer}>
                    <div className={styles.playerInfoContainer}>
                        {player.image}
                        <p>{player.name}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        {this.renderLives(player.lives)}
                    </div>
                </div>
                <div className={styles.robotScoreContainer}>

                    <div className={styles.scoreContainer}>
                        {this.renderLives(robot.lives)}
                    </div>

                    <div className={styles.playerInfoContainer}>
                        {robot.image}
                        <p>{robot.name}</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ScoreView
