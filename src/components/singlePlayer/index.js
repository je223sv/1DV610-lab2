import React from 'react'
import SelectCategories from '../selectCategories/index.js'
import GameView from './GameView/index.js'
import ResultView from './ResultView/index.js'


class SinglePlayer extends React.Component {
    constructor (props) {
        super(props)
        this.numOfQuestions = 10
        this.state = {
            view: 'select-categories',
            categories: [],
            player: { score: 0 },
        }
    }

    incrementScore = () => {
        this.setState(prevState => ({
            ...prevState,
            player: { ...prevState.player, score: prevState.player.score + 1 }
        }))
    }

    setCategories = (categories) => {
        this.setState(prevState => ({
            ...prevState,
            categories: categories
        }))
    }

    setView = (view) => {
        this.setState(prevState => ({
            ...prevState,
            view: view
        }))
    }

    renderView = () => {
        switch (this.state.view) {
            case "select-categories":
                return <SelectCategories
                            setCategories={this.setCategories}
                            setView={this.setView}
                        />
            case "game":
                return <GameView
                            categories={this.state.categories}
                            setView={this.setView}
                            incrementScore={this.incrementScore}
                            numOfQuestions={this.numOfQuestions}
                            player={this.state.player}
                        />
            case "result":
                return <ResultView
                            player={this.state.player}
                            numOfQuestions={this.numOfQuestions}
                        />
            default:
                return null
        } 
    }

    render = () => {
        return this.renderView()
    }
}

export default SinglePlayer
