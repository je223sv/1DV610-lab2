import React from 'react'
import styles from './resultView.module.css'
import Confetti from 'react-confetti'

class ResultView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winnerDecided: false,
            winner: null
        }
    }

    componentDidMount = () => {
        this.calculateWinner()
    }

    calculateWinner = () => {
        const {player, robot} = this.props.players

        if (player.lives === robot.lives) {
            this.setState(prevState => ({
                ...prevState,
                winnerDecided: true
            }))

            return
        }

        this.setState(prevState => ({
            ...prevState,
            winner: player.lives > robot.lives ? player : robot,
            winnerDecided: true
        }))
    }

    renderWinnner = () => {
        return (
            <>
                { this.state.winner === this.props.players.player &&  <Confetti
                    recycle={false}
                />}

                <div className={styles.imageContainer}>
                    { this.state.winner.image }
                </div>
                <div className={styles.textContainer}>
                    <p>{this.state.winner.name} won!</p>
                </div>
            </>
        )
    }

    renderDraw = () => {
        return (
            <>
                <p>It was a draw!</p>
            </>
        )
    }

    render = () => {
        return (
            <>
                {this.state.winnerDecided ? (this.state.winner ? this.renderWinnner() : this.renderDraw()) : 'loading..'}
            </>
        )
    }
}

export default ResultView
