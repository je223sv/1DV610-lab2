import React from 'react'
import FakePerson from 'fake-person'
import styles from './styles.module.css'

// Questions
import entertainmentQuestions from '../../../questions/entertainment.js'
import geographyQuestions from '../../../questions/geography.js'
import historyQuestions from '../../../questions/history.js'
import programmingQuestions from '../../../questions/programming.js'
import sportsQuestions from '../../../questions/sports.js'

// Can I move Question to it's own class? at least the presentation?? and all related functions??

// Game view for single player mode
class GameView extends React.Component {
    constructor (props) {
        super(props)
        this.TIME_DELAY_IN_MS = 1500
        this.fakePerson = new FakePerson()
        this.state = {
            numOfQuestionsAsked: 0,
            currentQuestion: null,
            currentAnswer: null,
            questionsByCategory: {
                'history': [ ...historyQuestions ],
                'sports': [ ...sportsQuestions ],
                'geography': [ ...geographyQuestions ],
                'entertainment': [ ...entertainmentQuestions ],
                'programming': [ ...programmingQuestions ]
            }
        }
    }

    componentDidMount = () => {
        this.generateQuestion()
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.hasAnswerBeenGiven(prevState)) {
            this.evaluateAnswer()

            // Short pause before the next questions is generated so that the user can see the
            // evaluated result.
            await new Promise(r => setTimeout(r, this.TIME_DELAY_IN_MS))

            this.generateQuestion()
        }
    }

    generateQuestion = () => {
        const category = this.getRandomCategory()
        const question = this.getRandomQuestion(category)
        
        this.setQuestion(question, category)
        this.removeUsedQuestion(question.id, category)
    }

    getRandomCategory = () => {
        const categoriesWithQuestionsLeft = this.getCategoriesWithQuestionsLeft()

        if (this.hasReachedMaxQuestions() || categoriesWithQuestionsLeft.length === 0) {
            this.props.setView('result')
            return
        }

        return this.fakePerson.makeSelection(categoriesWithQuestionsLeft)
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

    isCategoryChosen = (category) => {
        return this.props.categories[category].isChosen
    }

    hasCategoryAnyQuestionsLeft = (category) => {
        return this.state.questionsByCategory[category].length > 0
    }

    hasReachedMaxQuestions = () => {
        return this.state.numOfQuestionsAsked === this.props.numOfQuestions
    }

    getRandomQuestion = (category) => {
        return this.fakePerson.makeSelection(this.state.questionsByCategory[category])
    }


    setQuestion = (question, category) => {
        this.setState(prevState => ({
            ...prevState,
            currentQuestion: { ...question, category: category},
            currentAnswer: null,
            numOfQuestionsAsked: prevState.numOfQuestionsAsked + 1
        }))
    }

    removeUsedQuestion = (id, category) => {
        const index = this.state.questionsByCategory[category].findIndex(question => question.id === id)
        this.state.questionsByCategory[category].splice(index, 1)
    }

    hasAnswerBeenGiven = (prevState) => {
        return this.state.currentAnswer !== null && prevState.currentAnswer !== this.state.currentAnswer
    }

    handleAnswer = (event) => {        
        this.setState(prevState => ({
            ...prevState,
            currentAnswer: event.target.innerText
        }))
    }

    evaluateAnswer = async () => {
        if (this.isCorrectAnswer()) {
            this.props.incrementScore()
        }
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

        if (this.isWrongAnswer(option)) {
            return styles.wrong
        }
    }

    isWrongAnswer = (option) => {
        const {currentAnswer} = this.state
        const {correctAnswer} = this.state.currentQuestion
        return option === currentAnswer && currentAnswer !== correctAnswer
    }

    renderScore = () => {
        return this.props.player.score
    }

    render = () => {
        return this.state.currentQuestion ? this.renderQuestion() : 'Loading..'
    }
}

export default GameView
