import React from 'react'
import styles from './game.module.css'
import FakePerson from 'fake-person'
import Question from '../../question/index.js'
import ResultView from './resultView/index.js'
import entertainmentQuestions from '../../../questions/entertainment.js'
import geographyQuestions from '../../../questions/geography.js'
import historyQuestions from '../../../questions/history.js'
import programmingQuestions from '../../../questions/programming.js'
import scienceAndNatureQuestions from '../../../questions/scienceAndNature.js'
import sportsQuestions from '../../../questions/sports.js'


class SinglePlayerGameView extends React.Component {
    #MAX_QUESTIONS = 3

    constructor(props) {
        super(props)

        this.state = {
            currentAnswer: null,
            answeredQuestions: 0,
            score: 0,
            question: null,
            usedQuestionsById: {
                history: [],
                sports: [],
                geography: [],
                programming: [],
                scienceAndNature: [],
                entertainment: []
            },
            gameOver: false,
            questionLog: []
        }
    }

    componentDidMount() {
        this.generateQuestion()
    }

    async componentDidUpdate(prevProps, prevState) {        
        if (prevState.currentAnswer !== this.state.currentAnswer) {
            if (this.state.currentAnswer === null) {
                return
            }

            // https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
            await new Promise(r => setTimeout(r, 2000));

            this.generateQuestion()
        }
    }

     /** This can be split up into more parts.. */
     generateQuestion = () => {
        const fakePerson = new FakePerson()

        const mapper = {
            'history': historyQuestions,
            'sports': sportsQuestions,
            'geography': geographyQuestions,
            'entertainment': entertainmentQuestions,
            'scienceAndNature': scienceAndNatureQuestions,
            'programming': programmingQuestions
        }

        let question = null

        const { categories } = this.props

        // See what category has questions left..
        const categoriesWithQuestionsLeft = categories.filter(category => mapper[category].length > this.state.usedQuestionsById[category].length)

        // Handle it.
        if (categoriesWithQuestionsLeft.length < 1 || this.state.answeredQuestions === this.#MAX_QUESTIONS) {
            this.setState(prevProps => ({
                ...prevProps,
                gameOver: true
            }))
        } else {
            let category

            if (categoriesWithQuestionsLeft.length === 1) {
                // Pick remaning category..
                category = categoriesWithQuestionsLeft[0]
            } else {
                // Randomly choose between the remaining categories..
                category = fakePerson.makeSelection(categoriesWithQuestionsLeft)
            }

            // Select question
            do {
                question = fakePerson.makeSelection(mapper[category])
            } while (this.state.usedQuestionsById[category].includes(question.id))

            // Add category
            question.category = category // add category (could be added to the question object straight away)

            this.setState(prevState => ({
                ...prevState,
                currentAnswer: null,
                question: question,
                usedQuestionsById: {
                    ...prevState.usedQuestionsById,
                    [category]: [...prevState.usedQuestionsById[category], question.id]
                },
            }))
        }
    }
    
    handleAnswer = (event) => {
        const answer = event.target.innerText

        const isCorrectAnswer = answer === this.state.question.correctAnswer

        this.setState(prevState => ({
            ...prevState,
            currentAnswer: answer,
            answeredQuestions: prevState.answeredQuestions + 1,
            score: isCorrectAnswer ? prevState.score + 1 : prevState.score,
            questionLog: [...prevState.questionLog, {...this.state.question, answer }]
        }))
    }

    renderQuestion = () => {
        return <Question
                    question={this.state.question}
                    currentAnswer={this.state.currentAnswer}
                    handleAnswer={this.handleAnswer}
                />
    }

    renderGameOver = () => {
        return <ResultView
                    score={this.state.score}
                    answeredQuestions={this.state.answeredQuestions}
                    questionLog={this.state.questionLog}
                />
    }

    render = () => {
        return this.state.gameOver ? this.renderGameOver() : (this.state.question && this.renderQuestion())
    }
}

export default SinglePlayerGameView
