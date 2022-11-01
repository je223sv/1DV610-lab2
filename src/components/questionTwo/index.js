import React from 'react'
import Timer from '../timer/index.js'
import styles from './question.module.css'
import fakePerson from 'fake-person'
import FakePerson from 'fake-person'

// TODO: Make question work for single and multiplayer!!!
// showOptions, and write out question might be overkill.. (Could add these afterwards..)

// Evaluate answer based on timer ending; or after an answer..

// Unique render for each <Question /> called..

// Question should be updated from here... when one question is done.. (and has been reported to the parent component)

class QuestionTwo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // question: null,
            question: null,
            showCategory: true,
            showAnswer: false,
            // showOptions: false
            seconds: 10,
            players: { // pass as props later..
                player: {
                    currentAnswer: null
                }
            }
        }
    }


    componentDidMount = () => {
        this.generateQuestion()
    }

    // componentDidMount = async () => {
    //     // doesn't matter how long it takes, will always be linear, unless it is a promise right?
    //     // this.generateQuestion()
    //     this.generateQuestion()

    //     await new Promise(r => setTimeout(r, 1500));

    //     this.setState(prevState => ({
    //         ...prevState,
    //         showCategory: false
    //     }))
    // }

    // componentDidUpdate = async (prevProps, prevState) => {
    //     // Show options later..
    //     if (prevState.showCategory !== this.state.showCategory) {
    //         if (this.state.showCategory) {
    //             return 
    //         }

    //         await new Promise(r => setTimeout(r, 1500));

    //         this.setState(prevState => ({
    //             ...prevState,
    //             showOptions: true
    //         }))
    //     }
    // }

    // handleAnswers = () => {


    //     // Return where I keep scores..
    //     // { playerCorrect: true }

    // }

    // generateQuestion = () => {
    //     this.setState(prevState => ({
    //         ...prevState,
    //         question: {
    //             text: 'What is the capital of Sweden?',
    //             options: ['Stockholm', 'Oslo', 'Helsinki',' Copenhagen'],
    //             correctAnswer: 'Stockholm'
    //         }
    //     }))
    // }


    componentDidUpdate = async (prevProps, prevState) => {
        if (this.state.seconds === 0) {
            await new Promise(r => setTimeout(r, 1500));

            this.evaluateResult()

            if (this.state.seconds !== prevState.seconds) {
                this.setState(prevState => ({
                    ...prevState,
                    showAnswer: true
                }))
            }
        }

        if (this.state.showAnswer !== prevState.showAnswer) {
            // End of the component.. call hook from parent; so it can change the question..
            this.props.handleQuestionAnswered()

            // new question..
            this.generateQuestion()
        }
    }

    generateQuestion = () => {
        const questions = [
            { id: 1, text: 'Who saw a falling apple and later came up with the law of gravity?', options: ['Albert Einstein', 'Michael Faraday', 'Isaac Newton', 'Nicolaus Copernicus'], correctAnswer: 'Isaac Newton' },
            { id: 2, text: 'Who came up with the special theory of relativity', options: ['Isaac Newton', 'Albert Einstein', 'Stephen Hawking', 'Alexander Fleming'], correctAnswer: 'Albert Einstein' },
            { id: 3, text: 'What is the largest bone in the human body?', options: ['Femur', 'Tibia', 'Fibula', 'Humerus'], correctAnswer: 'Femur' },
            { id: 4, text: 'What is the largest planet in our solar system?', options: ['Saturn', 'Earth', 'Mars', 'Jupiter'], correctAnswer: 'Jupiter' },
            { id: 5, text: 'What is the smallest planet in our solar system?', options: ['Earth', 'Mercury', 'Mars', 'Neptune'], correctAnswer: 'Mercury' },
            { id: 6, text: 'What was the name of Pierre Curie\'s wife which he and Henri Becquerel shared the noble prize with in physics 1903?', options: ['Lena', 'Petra', 'Eva', 'Marie'], correctAnswer: 'Marie' },
            { id: 7, text: 'Who invented the first alternating current (AC) motor?', options: ['Thomas Edison', 'Nikola Tesla', 'George Westinghouse', 'J.P Morgan'], correctAnswer: 'Nikola Tesla' },
            { id: 8, text: 'What checmial element is represented by the symbol L', options: ['Lutetium', 'Lithium', 'Lead', 'Lanthanum'], correctAnswer: 'Lithium' },
            { id: 9, text: 'What is the biggest shark?', options: ['Great White Shark', 'Tiger Shark', 'Whale Shark', 'Megamouth Shark'], correctAnswer: 'Whale Shark' },
            { id: 10, text: 'What checmial element is represented by the symbol N', options: ['Nitrogen', 'Neon', 'Nickel', 'Nobelium'], correctAnswer: 'Nitrogen' }
        ]


        const q = new FakePerson().makeSelection(questions)


        this.setState(prevState => ({
            ...prevState,
            question: q,
            players: { ...prevState.players, player: {...prevState.player, currentAnswer: null }},
            showAnswer: false,
            seconds: 10
        }))
    }

    evaluateResult = () => {
        const {currentAnswer} = this.state.players.player
        const {correctAnswer} = this.state.question

        if (currentAnswer === correctAnswer) {
            console.log("You were correct")
        } else {
            console.log("You were incorrect")
        }

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
            players: { ...prevState.players, player: { ...prevState.players.player, currentAnswer: option }}
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
                {this.renderPlayerSelect(option)}
            </div>
        ))
    }

    renderPlayerSelect = (option) => {
        if (!this.state.players.player.currentAnswer) {
            return
        }

        if (option === this.state.players.player.currentAnswer) {
            return <span>👩‍🦳</span>
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