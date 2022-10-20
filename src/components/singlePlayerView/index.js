import React from 'react'
import SinglePlayerSetupView from './singlePlayerSetupView/index.js'
import SinglePlayerGameView from './singlePlayerGameView/index.js'

class SinglePlayerView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setupDone: false,
            categories: []
        }
    }

    handleSetupDone = () => {
        this.setState(prevState => ({
            ...prevState,
            setupDone: !prevState.setupDone
        }))
    }

    handleSetCategories = (categories) => {
        this.setState(prevState => ({
            ...prevState,
            categories: [...prevState.categories, ...categories]
        }))
    }

    renderView = () => {
        return this.state.setupDone ? <SinglePlayerGameView categories={this.state.categories} /> : <SinglePlayerSetupView handleSetCategories={this.handleSetCategories} handleSetupDone={this.handleSetupDone} />
    }

    render() {
        return this.renderView()
    }
}

export default SinglePlayerView
