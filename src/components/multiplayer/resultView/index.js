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
        const { human, computer } = this.props.players

        if (human.lives === computer.lives) {
            this.setState(prevState => ({
                ...prevState,
                winnerDecided: true
            }))

            return
        }

        this.setState(prevState => ({
            ...prevState,
            winner: human.lives > computer.lives ? human : computer,
            winnerDecided: true
        }))
    }

    renderWinnner = () => {
        return (
            <>
                { this.state.winner === this.props.players.human &&  <Confetti
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
