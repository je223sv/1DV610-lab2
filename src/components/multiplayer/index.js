import React from 'react'
import FakePerson from 'fake-person'

// views
import SetupPlayer from './setupPlayer/index.js'
import SetupComputer from './setupComputer/index.js'
import SelectCategories from '../selectCategories/index.js'
import GameView from './gameView/index.js'
import ResultView from './resultView/index.js'


class MultiPlayer extends React.Component {
    constructor (props) {
        super(props)
        this.fakePerson = new FakePerson()
        this.state = {
            view: 'setup-player',
            categories: [],
            players: {
                human: { image: '👦', name: 'YOU', lives: 3 },
                computer: { image: '🤖', name: this.fakePerson.getFirstName(), skillLevel: 'average', lives: 3 }
            },
        }
    }

    handleLives = (isHumanRight, isComputerRight) => {
        this.setState(prevState => ({
            ...prevState,
            players: {
                human: { 
                    ...prevState.players.human,
                    lives: isHumanRight ? prevState.players.human.lives : prevState.players.human.lives - 1
                },
                computer: {
                    ...prevState.players.computer,
                    lives: isComputerRight ? prevState.players.computer.lives : prevState.players.computer.lives - 1
                },
            }
        }))
    }

    setCategories = (categories) => {
        this.setState(prevState => ({
            ...prevState,
            categories: categories
        }))
    }

    setHumanImage = (image) => {
        this.setState(prevState => ({
            ...prevState,
            players: { ...prevState.players, human: { ...prevState.players.human, image: image }}
        }))
    }

    setSkillLevel = (skillLevel) => {
        this.setState(prevState => ({
            ...prevState,
            players: { ...prevState.players, computer: { ...prevState.players.computer, skillLevel: skillLevel }}
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
            case "setup-player":
                return <SetupPlayer
                            players={this.state.players}
                            setHumanImage={this.setHumanImage}
                            setView={this.setView}
                        />
            case "setup-computer":
                return <SetupComputer
                            players={this.state.players}
                            setSkillLevel={this.setSkillLevel}
                            setView={this.setView}
                        />
            case "select-categories":
                return <SelectCategories
                            setCategories={this.setCategories}
                            setView={this.setView}
                        />
            case "game":
                return <GameView
                            categories={this.state.categories}
                            setView={this.setView}
                            handleLives={this.handleLives}
                            players={this.state.players}
                        />
            case "result":
                return <ResultView
                            players={this.state.players}
                        />
            default:
                return null
        }
    }

    render = () => {
        return this.renderView()
    }
}

export default MultiPlayer
