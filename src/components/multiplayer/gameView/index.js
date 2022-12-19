import React from 'react'
import FakePerson from 'fake-person'
import Timer from '../../timer/index.js'
import styles from './styles.module.css'
import ScoreView from './scoreView/index.js'

// Questions
import entertainmentQuestions from '../../../questions/entertainment.js'
import geographyQuestions from '../../../questions/geography.js'
import historyQuestions from '../../../questions/history.js'
import programmingQuestions from '../../../questions/programming.js'
import sportsQuestions from '../../../questions/sports.js'

// Game view for single player mode
class GameView extends React.Component {
    constructor (props) {
        super(props)
        this.TIME_DELAY_IN_MS = 1500
        this.secondsToAnswer = 3
        this.fakePerson = new FakePerson()
        this.state = {
            currentQuestion: null,
            currentAnswer: {
                human: null,
                computer: null
            },
            seconds: this.secondsToAnswer,
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
        if (prevState.seconds !== this.state.seconds && this.state.seconds === 1) {
            this.setComputerAnswer()
        }

        if (prevState.currentAnswer.computer !== this.state.currentAnswer.computer && this.state.currentAnswer.computer) {
            // Short pause before the answers are evaluated.
            await new Promise(r => setTimeout(r, this.TIME_DELAY_IN_MS))

            this.evaluateAnswer()

            // Short pause before the next questions is generated so that the user can see the
            // evaluated result.
            await new Promise(r => setTimeout(r, this.TIME_DELAY_IN_MS))

            this.generateQuestion()
        }
    }

    generateQuestion = () => {
        const category = this.getRandomCategory()
        const question = this.fakePerson.makeSelection(this.state.questionsByCategory[category])

        this.setQuestion(question, category)
        this.removeUsedQuestion(question.id, category)
    }

    getRandomCategory = () => {
        const categoriesWithQuestionsLeft = this.getCategoriesWithQuestionsLeft()

        // TODO: Might refactor this conditional (not same as single player)
        if (categoriesWithQuestionsLeft.length === 0 || this.props.players.human.lives === 0 || this.props.players.computer.lives === 0) {
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

    setQuestion = (question, category) => {
        this.setState(prevState => ({
            ...prevState,
            currentQuestion: { ...question, category: category},
            currentAnswer: {
                human: null,
                computer: null
            },
            seconds: this.secondsToAnswer   
         }))
    }

    handleUpdateSeconds = () => {
        this.setState(prevState => ({
            ...prevState,
            seconds: prevState.seconds - 1
        }))
    }

    setHumanAnswer = (event) => {    
        this.setState(prevState => ({
            ...prevState,
            currentAnswer: { ...prevState.currentAnswer, human: event.target.innerText }
        }))
    }

    setComputerAnswer = () => {
        const { options, correctAnswer } = this.state.currentQuestion
        const skillLevel = this.props.players.computer.skillLevel 
        const answer = this.fakePerson.answerQuizQuestion({options, correctAnswer}, skillLevel)

        this.setState(prevState => ({
            ...prevState,
            currentAnswer: { ...prevState.currentAnswer, computer: answer }
        }))
    }

    removeUsedQuestion = (id, category) => {
        const index = this.state.questionsByCategory[category].findIndex(question => question.id === id)
        this.state.questionsByCategory[category].splice(index, 1)
    }

    evaluateAnswer = async () => {
        const { correctAnswer } = this.state.currentQuestion
        const humanAnswer = this.state.currentAnswer.human
        const computerAnswer = this.state.currentAnswer.computer

        let isHumanRight = humanAnswer === correctAnswer
        let isComputerRight = computerAnswer === correctAnswer

        this.props.handleLives(isHumanRight, isComputerRight)
    }

    isCorrectAnswer = () => {
        const { currentAnswer, currentQuestion } = this.state

        return currentAnswer === currentQuestion.correctAnswer
    }

    renderQuestion = () => {
        return (
            <div className={styles.gameContainer}>
                <Timer handleUpdateSeconds={this.handleUpdateSeconds} seconds={this.state.seconds} />

                <div className={styles.textContainer}>
                    <p>{this.state.currentQuestion.category}: {this.state.currentQuestion.text}</p>
                </div>

                <div className={styles.optionsContainer}>
                    {this.renderOptions()}
                </div>

                <ScoreView players={this.props.players} />
            </div>
        )
    }

    renderOptions = () => {
        return this.state.currentQuestion.options.map(option => (
            <button 
                onClick={this.setHumanAnswer}
                disabled={this.state.currentAnswer.human}
                className={`${styles.option} ${this.renderCorrectStyles(option)}`}
            >
                {option} {this.renderAnswer(option, 'human')} {this.renderAnswer(option, 'computer')}
            </button>
        ))
    }

    renderAnswer = (option, player) => {
        const {currentAnswer} = this.state

        if (option === currentAnswer[player]) {
            return this.props.players[player].image
        }
    }

    renderCorrectStyles = (option) => {
        const {correctAnswer} = this.state.currentQuestion

        if (this.state.seconds !== 0) return

        if (option === correctAnswer) {
            return styles.correct
        }
    }

    render = () => {
        return this.state.currentQuestion ? this.renderQuestion() : 'Loading..'
    }
}

export default GameView
