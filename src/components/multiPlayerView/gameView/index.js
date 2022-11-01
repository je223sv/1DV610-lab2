import React from 'react'
import styles from './game.module.css'
import QuestionTwo from '../../questionTwo'

class GameView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    renderQuestion = () => {
        return <QuestionTwo
            players={this.state.players}
            category="sports"
            handleQuestionAnswered={this.handleQuestionAnswered}
        />
    }

    render = () => {
        return (
            <>
                <p>Questions asked: {this.props.questionAnswered}</p>
                {this.renderQuestion()}
                
                {/* <Timer seconds={this.state.seconds} handleUpdateSeconds={this.handleUpdateSeconds} /> */}
                {/* <p>Score: {this.state.score}</p> */}
                {/* <p>answeredQuestions: {this.state.answeredQuestions}</p> */}
                {/* <div className={styles.card}><span className={styles.tag}>{category}</span>{text}</div>
                <div className={styles.answersContainer}>
                    {this.renderOptions(options)}
                </div>
                { this.renderScore() } */}
            </>
        )
    }
}

export default GameView
