import React from 'react'
import FakePerson from 'fake-person'
import styles from './styles.module.css'

// Questions
import entertainmentQuestions from '../../../questions/entertainment.js'
import geographyQuestions from '../../../questions/geography.js'
import historyQuestions from '../../../questions/history.js'
import programmingQuestions from '../../../questions/programming.js'
import scienceAndNatureQuestions from '../../../questions/scienceAndNature.js'
import sportsQuestions from '../../../questions/sports.js'

// Game view for single player mode
class GameView extends React.Component {
    constructor (props) {
        super(props)
        this.TIME_DELAY_IN_MS = 1500
        this.state = {
            numOfQuestionsAsked: 0,
            currentQuestion: null,
            currentAnswer: null,
            questionsByCategory: {
                'history': [ ...historyQuestions ],
                'sports': [ ...sportsQuestions ],
                'geography': [ ...geographyQuestions ],
                'entertainment': [ ...entertainmentQuestions ],
                'scienceAndNature': [ ...scienceAndNatureQuestions ],
                'programming': [ ...programmingQuestions ],
                // literature... cause error..
            }
        }
    }

    componentDidMount = () => {
        this.generateQuestion()
    }

    componentDidUpdate = (prevProps, prevState) => {
        // Evaluate answer when an answer is given (only want from null => answer, not answer => null)
        if (this.state.currentAnswer !== null && prevState.currentAnswer !== this.state.currentAnswer) {
            this.evaluateAnswer()
        }
    }

    handleAnswer = (event) => {        
        this.setState(prevState => ({
            ...prevState,
            currentAnswer: event.target.innerText
        }))
    }

    getCategoriesWithQuestionsLeft = () => {
        const { categories } = this.props
        const categoryKeys = Object.keys(categories)

        return categoryKeys.filter(category => {
            return (
              this.state.questionsByCategory[category] &&
              this.isCategoryChosen(category) &&
              this.hasCategoryAnyQuestionsLeft(category)
            )
        })
    }

    hasCategoryAnyQuestionsLeft = (category) => {
        return this.state.questionsByCategory[category].length > 0
    }

    isCategoryChosen = (category) => {
        return this.props.categories[category].isChosen
    }

    generateQuestion = () => {
        const fakePerson = new FakePerson() 
        const categoriesWithQuestionsLeft = this.getCategoriesWithQuestionsLeft()

        if (this.state.numOfQuestionsAsked === this.props.numOfQuestions || categoriesWithQuestionsLeft.length === 0) {
            this.props.setView('result')
            return
        }
        
        const category = fakePerson.makeSelection(categoriesWithQuestionsLeft) // error if only one category.. update lib..
        const question = fakePerson.makeSelection(this.state.questionsByCategory[category]) // error if only one question left in category..

        // Set the current question..
        this.setState(prevState => ({
            ...prevState,
            currentQuestion: { ...question, category: category},
            currentAnswer: null,
            numOfQuestionsAsked: prevState.numOfQuestionsAsked + 1
        }))

        // remove questions!!!
        this.removeQuestion(question.id, category)
    }

    removeQuestion = (id, category) => {
        const index = this.state.questionsByCategory[category].findIndex(question => question.id === id)
        this.state.questionsByCategory[category].splice(index, 1)
    }

    evaluateAnswer = async () => {
        if (this.isCorrectAnswer()) {
            this.props.incrementScore()
        }

        await new Promise(r => setTimeout(r, this.TIME_DELAY_IN_MS))

        this.generateQuestion()
    }

    isCorrectAnswer = () => {
        const { currentAnswer, currentQuestion } = this.state

        return currentAnswer === currentQuestion.correctAnswer
    }

    renderQuestion = () => {
        return (
            <div className={styles.gameContainer}>

                <div className={styles.textContainer}>
                    <p>{this.state.currentQuestion.category}: {this.state.currentQuestion.text} ({this.state.numOfQuestionsAsked}/{this.props.numOfQuestions})</p>
                </div>

                <div className={styles.optionsContainer}>
                    {this.renderOptions()}
                </div>
            </div>
        )
    }

    renderOptions = () => {
        return this.state.currentQuestion.options.map(option => (
            <button 
                onClick={this.handleAnswer}
                disabled={this.state.currentAnswer}
                className={`${styles.option} ${this.renderAnswerStyles(option)} `}
            >
                {option}
            </button>
        ))
    }

    renderAnswerStyles = (option) => {
        const {currentAnswer} = this.state
        const {correctAnswer} = this.state.currentQuestion

        if (!currentAnswer) return

        if (option === correctAnswer) {
            return styles.correct
        }

        // When answering wrong
        if (option === currentAnswer && currentAnswer !== correctAnswer) {
            return styles.wrong
        }
    }

    renderScore = () => {
        return this.props.player.score
    }

    render = () => {
        return this.state.currentQuestion ? this.renderQuestion() : 'Loading..'
    }
}

export default GameView
