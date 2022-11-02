import React from 'react'
import QuestionTwo from '../../questionTwo'
import FakePerson from 'fake-person'
import ScoreView from './scoreView'

class GameView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    generateRandomCategory = () => {
        const {categories} = this.props 

        const selectedCategories = Object.keys(categories).filter(category => categories[category].isChoosen)

        if (selectedCategories.length < 2) {
            return selectedCategories[0]
        } else {
            return new FakePerson().makeSelection(selectedCategories)
        }
    }

    renderQuestion = () => {
        return <QuestionTwo
            players={this.props.players}
            categories={this.props.categories}
            handleScores={this.props.handleScores}
            handleView={this.props.handleView}
        />
    }

    render = () => {
        return (
            <>
                {this.renderQuestion()}

                <ScoreView
                    players={this.props.players}
                />
            </>
        )
    }
}

export default GameView
