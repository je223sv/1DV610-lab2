import React from 'react'

class ResultView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showResult: false
        }
    }

    renderResult = () => {
        return (
            <div>
                <p>Result here..</p>
            </div>
        )
    }

    handleShowResult = () => {
        this.setState(prevState => ({
            ...prevState,
            showResult: !prevState.showResult
        }))
    }

    renderView = () => {
        return (
            <div>
                <h2>You scored {this.props.score} out of {this.props.answeredQuestions}</h2>
                <button onClick={this.handleShowResult}>See result</button>
                { this.state.showResult && this.renderResult() }
            </div>
        )
    }

    render() {
        return this.renderView()
    }
}

export default ResultView
