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
        this.categoriesUsed = [] // data I don't want to rerender component when updated..
        this.usedQuestionsById = {
            history: [],
            sports: [],
            geography: [],
            programming: [],
            scienceAndNature: [],
            entertainment: []
        }
        this.computerAnswer = null
        this.blacklistCategories = []
        this.state = {
            inEvaluation: false,
            question: null,
            showCategory: true,
            showAnswer: false,
            // showOptions: false
            seconds: 4,
            players: { // pass as props later..
                player: {
                    currentAnswer: null
                },
                robot: {
                    currentAnswer: null
                }
            },
        }
    }

    componentDidMount = () => {
        this.generateQuestion()
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if ((prevState.seconds !== this.state.seconds) && this.state.seconds === 0) {
            // console.log("FIRST")

            // Computer answer here..
            const {options, correctAnswer} = this.state.question
            const skillLevel = this.props.players.robot.skillLevel 
            const answer = new FakePerson().answerQuizQuestion({options, correctAnswer}, skillLevel)

            this.setState(prevState => ({
                ...prevState,
                players: { ...prevState.players, robot: { currentAnswer: answer } }
            }))
        }

        if ((prevState.players !== this.state.players) && this.state.players.robot.currentAnswer) {
            // console.log("SECOND")

            await new Promise(r => setTimeout(r, 1500))

            this.evaluateResult()

            this.setState(prevState => ({
                ...prevState,
                showAnswer: true
            }))
        }

        if ((prevState.showAnswer !== this.state.showAnswer) && this.state.showAnswer) {
            // console.log("THIRD")

            await new Promise(r => setTimeout(r, 1500))

            const playerLives = this.props.players.player.lives
            const computerLives = this.props.players.robot.lives

            if (playerLives === 0 || computerLives === 0) {
                this.props.handleView('result')
            } else {
                this.generateQuestion()
            }
        }
    }

    generateQuestion = () => {
        /* Decide categories to choose from */

        const {categories} = this.props // categories object
        const selectedCategories = Object.keys(categories).filter(category => categories[category].isChoosen)
        const availableCategories = selectedCategories.filter(category => !this.blacklistCategories.includes(category))

        // QUIT IT.. no more questions..
        if (availableCategories.length < 1) {
            console.log("No more categories with questions left!!")
            this.props.handleView('result')
            return
        }

        // ELSE pick a category
        let category

        if (availableCategories.length < 2) { // update the library.. more user friendly.. user do not need to check size of array..
            category = availableCategories[0]
        } else {
            category = new FakePerson().makeSelection(availableCategories) // choose a random category..
        }

        // Choose question
        let question

        do {
            question = new FakePerson().makeSelection(questionsByCategory[category])
        } while (this.usedQuestionsById[category].includes(question.id))

        // Define question as used
        this.usedQuestionsById[category].push(question.id)

        // If category has no more questions.. add to blacklist..
        if (this.usedQuestionsById[category].length >= questionsByCategory[category].length) {
            this.blacklistCategories.push(category)
        }

        this.setState(prevState => ({
            ...prevState,
            question: question,
            players: { player: { currentAnswer: null }, robot: { currentAnswer: null }},
            showAnswer: false,
            seconds: 4, // from parent compoent instead?
        }))
    }

    evaluateResult = () => {
        const {currentAnswer} = this.state.players.player
        const {correctAnswer} = this.state.question
        const computerAnswer = this.state.players.robot.currentAnswer

        let playerIsRight = currentAnswer === correctAnswer
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
            players: { ...prevState.players, player: { ...prevState.players.player, currentAnswer: option } }
        }))
    }

    renderQuestion = () => {
        const {text, options } = this.state.question

        return (
            <div>
                <Timer handleUpdateSeconds={this.handleUpdateSeconds} seconds={this.state.seconds} />
                <div className={styles.card}><span className={styles.tag}>{this.state.category}</span>{text}</div>
                <div className={styles.answersContainer}>
                    {this.renderOptions(options)}
                </div>
            </div>
        )
    }

    renderOptions = (options) => {
        return options.map(option => (
            <div 
                // onClick={this.props.currentAnswer ? null : this.props.handleAnswer}
                onClick={this.state.players.player.currentAnswer ? null : () => this.handleAnswer(option)}
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
        if (!this.state.players.player.currentAnswer) {
            return
        }

        if (option === this.state.players.player.currentAnswer) {
            return <span>{this.props.players.player.image}</span>
        } else {
            return
        }
    }

    renderComputerSelect = (option) => {
        if (!this.state.players.robot.currentAnswer) return

        if (option === this.state.players.robot.currentAnswer) {
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

    showWrongStyles = (option) => {
        if (!this.state.players.player.currentAnswer) {
            return false
        }

        if (this.state.players.player.currentAnswer === option && this.state.players.player.currentAnswer !== this.state.question.correctAnswer) {
            return styles.wrong
        }
    }

    showCorrectStyles = (option) => {
        if (this.state.showAnswer && option === this.state.question.correctAnswer) {
            return styles.correct
        } else {
            return
        }

        // if (!this.state.players.player.currentAnswer) {
        //     return
        // }

        // if (this.state.question.correctAnswer === option) {
        //     return styles.correct
        // }
    }

    render = () => {
        // return this.state.showCategory ? this.renderCategory() : (this.state.question ? this.renderQuestion() : 'loading..')
        return this.state.question ? this.renderQuestion() : 'loading..'
    }
}

export default QuestionTwo
