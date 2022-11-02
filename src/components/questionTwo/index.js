import React from 'react'
import Timer from '../timer/index.js'
import styles from './question.module.css'
import FakePerson from 'fake-person'
import entertainmentQuestions from '../../questions/entertainment.js'
import geographyQuestions from '../../questions/geography.js'
import historyQuestions from '../../questions/history.js'
import programmingQuestions from '../../questions/programming.js'
import scienceAndNatureQuestions from '../../questions/scienceAndNature.js'
import sportsQuestions from '../../questions/sports.js'

const questionsByCategory = {
    history: historyQuestions,
    entertainment: entertainmentQuestions,
    sports: sportsQuestions,
    programming: programmingQuestions,
    'science and nature': scienceAndNatureQuestions,
    geography: geographyQuestions
}

class QuestionTwo extends React.Component {
    constructor(props) {
        super(props)

        this.TIME_DELAY_IN_MS = 1500
        this.secondsToAnswer = 10
        this.fakePerson = new FakePerson()
        this.currentCategory = null
        this.categoriesUsed = []
        this.usedQuestionsById = {
            history: [],
            sports: [],
            geography: [],
            programming: [],
            scienceAndNature: [],
            entertainment: []
        }
        this.blacklistCategories = []
        this.state = {
            question: null,
            showCategory: true,
            showAnswer: false,
            seconds: this.secondsToAnswer,
            currentAnswers: {
                player: null,
                computer: null
            }
        }
    }

    componentDidMount = () => {
        this.generateQuestion()
    }

    componentDidUpdate = async (_, prevState) => {
        if (this.timeHasHitZero(prevState)) {
            this.setComputerAnswer()
        }

        if (this.computerHasAnswered(prevState)) {
            // Reference..
            await new Promise(r => setTimeout(r, this.TIME_DELAY_IN_MS))

            this.evaluateAnswers()

            this.setState(prevState => ({
                ...prevState,
                showAnswer: true
            }))
        }

        if (this.answerHasBeenShown(prevState)) {
            await new Promise(r => setTimeout(r, this.TIME_DELAY_IN_MS))

            if (this.playerOrRobotHasNoMoreLives()) {
                this.props.handleView('result')
            } else {
                this.generateQuestion()
            }
        }
    }

    playerOrRobotHasNoMoreLives = () => {
        const { player, robot } = this.props.players

        const playerLives = player.lives
        const computerLives = robot.lives

        return playerLives === 0 || computerLives === 0
    }

    timeHasHitZero = (prevState) => {
        return (prevState.seconds !== this.state.seconds) && this.state.seconds === 0
    }

    setComputerAnswer = () => {
        const { options, correctAnswer } = this.state.question
        const skillLevel = this.props.players.robot.skillLevel 
        const answer = this.fakePerson.answerQuizQuestion({options, correctAnswer}, skillLevel)

        this.setState(prevState => ({
            ...prevState,
            currentAnswers: { ...prevState.currentAnswers, computer: answer }
        }))
    }

    computerHasAnswered = (prevState) => {
        return (prevState.currentAnswers !== this.state.currentAnswers) && this.state.currentAnswers.computer
    }

    answerHasBeenShown = (prevState) => {
        return (prevState.showAnswer !== this.state.showAnswer) && this.state.showAnswer
    }

    generateQuestion = () => {
        const availableCategories = this.getAvailableCategories()

        if (this.noAvailableCategories(availableCategories)) {
            this.props.handleView('result')
            return
        }

        const category = this.getRandomCategory(availableCategories)
        const question = this.getRandomQuestion(category)

        this.blacklistCategoryIfNoMoreQuestions(category)
        
        this.setQuestion(question)
    }

    noAvailableCategories = (availableCategories) => {
        return availableCategories.length < 1
    }

    getAvailableCategories = () => {
        const {categories} = this.props
        const selectedCategories = Object.keys(categories).filter(category => categories[category].isChoosen)
        const availableCategories = selectedCategories.filter(category => !this.blacklistCategories.includes(category))

        return availableCategories
    }

    getRandomCategory = (categories) => {
        let category

        // Update when library is updated!
        if (categories.length < 2) {
            category = categories[0]
        } else {
            category = this.fakePerson.makeSelection(categories)
        }

        this.currentCategory = category

        return category
    }

    getRandomQuestion = (category) => {
        let question

        do {
            question = this.fakePerson.makeSelection(questionsByCategory[category])
        } while (this.usedQuestionsById[category].includes(question.id))

        this.usedQuestionsById[category].push(question.id)

        return question
    }

    blacklistCategoryIfNoMoreQuestions = (category) => {
        if (this.usedQuestionsById[category].length >= questionsByCategory[category].length) {
            this.blacklistCategories.push(category)
        }
    }

    setQuestion = (question) => {
        this.setState(prevState => ({
            ...prevState,
            question: question,
            currentAnswers: { player : null, computer: null },
            showAnswer: false,
            seconds: this.secondsToAnswer
        }))
    }

    evaluateAnswers = () => {
        const {correctAnswer} = this.state.question
        const playerAnswer = this.state.currentAnswers.player
        const computerAnswer = this.state.currentAnswers.computer

        let playerIsRight = playerAnswer === correctAnswer
        let computerIsRight = computerAnswer === correctAnswer

        this.props.handleScores(playerIsRight, computerIsRight)
    }

    handleUpdateSeconds = () => {
        this.setState(prevState => ({
            ...prevState,
            seconds: prevState.seconds - 1
        }))
    }

    handleAnswer = (option) => {
        if (this.state.seconds === 0) {
            return
        }

        this.setState(prevState => ({
            ...prevState,
            currentAnswers: { ...prevState.currentAnswers, player: option }
        }))
    }

    renderQuestion = () => {
        const { text, options } = this.state.question

        return (
            <div>
                <Timer handleUpdateSeconds={this.handleUpdateSeconds} seconds={this.state.seconds} />

                <div className={styles.cardContainer}>
                    <div className={`${styles.categoryContainer} ${styles[this.currentCategory]}`}>
                        <p>{this.currentCategory}</p>
                    </div>
                    <div className={styles.textContainer}>
                        {text}
                    </div>
                    
                </div>
                <div className={styles.answersContainer}>
                    {this.renderOptions(options)}
                </div>
            </div>
        )
    }

    renderOptions = (options) => {
        return options.map(option => (
            <div 
                onClick={this.state.currentAnswers.player ? null : () => this.handleAnswer(option)}
                className={`${styles.answer} ${this.showCorrectStyles(option)}`}
            >
                <p>{option}</p>
                <div>
                    {this.renderPlayerSelect(option)}
                    {this.renderComputerSelect(option)}
                </div>
            </div>
        ))
    }

    renderPlayerSelect = (option) => {
        if (!this.state.currentAnswers.player) {
            return
        }

        if (option === this.state.currentAnswers.player) {
            return <span>{this.props.players.player.image}</span>
        } else {
            return
        }
    }

    renderComputerSelect = (option) => {
        if (!this.state.currentAnswers.computer) return

        if (option === this.state.currentAnswers.computer) {
            return <span>{this.props.players.robot.image}</span>
        } else {
            return
        }
    }

    renderCategory = () => {
        return (
            <div>
                <p>{this.props.category}</p>
            </div>
        )
    }

    showCorrectStyles = (option) => {
        if (this.state.showAnswer && option === this.state.question.correctAnswer) {
            return styles.correct
        } else {
            return
        }
    }

    render = () => {
        return this.state.question ? this.renderQuestion() : 'loading..'
    }
}

export default QuestionTwo
