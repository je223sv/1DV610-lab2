import React from 'react'
import FakePerson from 'fake-person'
import SetupPlayerView from './setupPlayerView';
import SetupComputerView from './setupComputerView';
import SelectCategoryView from './selectCategoryView';
import GameView from './gameView';
import ResultView from './resultView';


class MultiPlayerView extends React.Component {
    constructor(props) {
        super(props)
        this.images = ['👦', '👩', '👨‍🦳', '👩‍🦳']
        this.fakePerson = new FakePerson()
        this.state = {
            view: 'setup-player',
            players: {
                player: { image: this.images[0], name: 'YOU', lives: 3 },
                robot: { image: '🤖', name: this.fakePerson.getFirstName(), skillLevel: 'average', lives: 3 }
            },
            categories: { 
                history: { isChoosen: false, name: 'history', icon: '📜' },
                geography: { isChoosen: false, name: 'geography', icon: '🌍' },
                sports: { isChoosen: false, name: 'sports', icon: '⚽' },
                scienceAndNature: { isChoosen: false, name: 'science and nature', icon: '🧪' },
                entertainment: { isChoosen: false, name: 'entertainment', icon: '🎞️' },
                programming: { isChoosen: false, name: 'programming', icon: '🖥️' }
            },
            seconds: 10,
        }
    }

    handleView = (view) => {
        this.setState(prevState => ({
            ...prevState,
            view: view
        }))
    }

    handleUpdateSeconds = () => {
        this.setState(prevState => ({
            ...prevState,
            seconds: prevState.seconds - 1
        }))
    }

    handleCategories = (event) => {
        const category = event.target.id

        this.setState(prevState => ({
            categories: {
                ...prevState.categories,
                [category]: {
                    ...prevState.categories[category],
                    isChoosen: !prevState.categories[category].isChoosen
                }
            }
        }))
    }

    handleSkillLevel = (skillLevel) => {
        this.setState(prevState => ({
            ...prevState,
            players: {...prevState.players, robot: {...prevState.players.robot, skillLevel: skillLevel}}
        }))
    }

    handleChangePicture = (direction) => {   
        const currentIndex = this.images.indexOf(this.state.players.player.image)

        if (direction === 'left' && currentIndex > 0) {
            this.setState(prevState => ({
                ...prevState,
                players: { ...prevState.players, player: { ...prevState.players.player, image: this.images[currentIndex - 1] } }
            }))
        } else if (direction === 'right' && currentIndex < (this.images.length - 1)) {
            this.setState(prevState => ({
                ...prevState,
                players: { ...prevState.players, player: { ...prevState.players.player, image: this.images[currentIndex + 1] } }
            }))
        }
    }

    handleScores = (playerIsRight, computerIsRight) => {
        this.setState(prevState => ({
            ...prevState,
            players: {
                player: { ...prevState.players.player, lives: playerIsRight ? prevState.players.player.lives : prevState.players.player.lives - 1 },
                robot: { ...prevState.players.robot, lives: computerIsRight ? prevState.players.robot.lives : prevState.players.robot.lives - 1 },
            }
        }))
    }

    renderView = () => {
        switch(this.state.view) {
            case 'setup-player':
                return <SetupPlayerView
                            players={this.state.players}
                            handleChangePicture={this.handleChangePicture}
                            handleView={this.handleView}
                        />
            case 'setup-computer':
                return <SetupComputerView
                            players={this.state.players}
                            handleView={this.handleView}
                            handleSkillLevel={this.handleSkillLevel}
                        />
            case 'select-categories':
                return <SelectCategoryView
                            categories={this.state.categories}
                            handleView={this.handleView}
                            handleCategories={this.handleCategories}
                        />
            case 'start':
                return <GameView
                            categories={this.state.categories}
                            players={this.state.players}
                            handleScores={this.handleScores}
                            handleView={this.handleView}
                        />
            case 'result':
                return <ResultView
                            players={this.state.players}
                        />
            default:
                return null
        }
    }

    render() {
        return this.renderView()
    }
}

export default MultiPlayerView
