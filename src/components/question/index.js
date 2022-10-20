import React from 'react'
import styles from './question.module.css'

class Question extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCategory: true
        }
    }

    async componentDidMount() {
        await new Promise(r => setTimeout(r, 1500));
        
        this.setState(prevState => ({
            ...prevState,
            showCategory: false
        }))
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.question !== this.props.question) {
            this.setState(prevState => ({
                ...prevState,
                showCategory: true
            }))
        }

        if (prevState.showCategory !== this.state.showCategory) {
            if (this.state.showCategory) {
                await new Promise(r => setTimeout(r, 1500));
                this.setState(prevState => ({
                    ...prevState,
                    showCategory: false
                }))
            }
        }
    }

    renderQuestion = () => {
        const {category, text, options} = this.props.question

        return (
            <div>
                {/* <div className={styles.timer}>00:21</div> */}
                {/* <p>Score: {this.state.score}</p> */}
                {/* <p>answeredQuestions: {this.state.answeredQuestions}</p> */}
                <div className={styles.card}><span className={styles.tag}>{category}</span>{text}</div>
                <div className={styles.answersContainer}>
                    {this.renderOptions(options)}
                </div>
            </div>
        )
    }

    showWrongStyles = (option) => {
        if (!this.props.currentAnswer) {
            return false
        }

        if (this.props.currentAnswer === option && this.props.currentAnswer !== this.props.question.correctAnswer) {
            return styles.wrong
        }
    }

    showCorrectStyles = (option) => {
        if (!this.props.currentAnswer) {
            return
        }

        if (this.props.question.correctAnswer === option) {
            return styles.correct
        }
    }

    renderOptions = (options) => {
        return options.map(option => (
            <div 
                onClick={this.props.currentAnswer ? null : this.props.handleAnswer}
                className={`${styles.answer} ${this.showCorrectStyles(option)} ${this.showWrongStyles(option)}`}
            >
                {option}
            </div>
        ))
    }

    renderCategory = () => {
        return (
            <div>
                <div className={styles.categoryCard}>
                    {this.props.question.category}
                </div>
            </div>
        )
    }

    render() {
        return this.state.showCategory ? this.renderCategory() : this.renderQuestion()
    }
}

export default Question
