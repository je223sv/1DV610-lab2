import React from 'react'
import styles from './index.module.css'
import FakePerson from 'fake-person'
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import SetupPlayerView from './setupPlayerView';
import SetupComputerView from './setupComputerView';
import SelectCategoryView from './selectCategoryView';
import GameView from './gameView';


class MultiPlayerView extends React.Component {
    constructor(props) {
        super(props)
        this.images = ['👦', '👩', '👨‍🦳', '👩‍🦳']
        this.fakePerson = new FakePerson()
        this.state = {
            view: 'setup-player',
            skillLevel: 'average',
            players: {
                player: {image: this.images[0], name: 'YOU'},
                robot: { image: '🤖', name: this.fakePerson.getFirstName(), skillLevel: 'average'}
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
            questionAnswered: 0
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

    handleQuestionAnswered = () => {
        this.setState(prevState => ({
            ...prevState,
            questionAnswered: prevState.questionAnswered + 1
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
                            questionAnswered={this.questionAnswered}
                        />
            default:
                return null
        }
    }

    renderScore = () => {
        return (
            <div className={styles.scoreContainer}>
                <div className={styles.playerScoreContainer}>
                    <div className={styles.playerInfoContainer}>
                        {this.state.players.player.image}
                        <p>{this.state.players.player.name}</p>
                    </div>
                    <div className={styles.scoreContainer}>
                        <FaLightbulb color="gold" />
                        <FaLightbulb color="gold" />
                        <FaLightbulb color="gold" />
                        <FaLightbulb color="gold" />
                        <FaRegLightbulb />
                    </div>
                </div>
                <div className={styles.robotScoreContainer}>

                    <div className={styles.scoreContainer}>
                        <FaLightbulb color="gold" />
                        <FaLightbulb color="gold" />
                        <FaRegLightbulb />
                        <FaRegLightbulb />
                        <FaRegLightbulb />
                    </div>

                    <div className={styles.playerInfoContainer}>
                        {this.state.players.robot.image}
                        <p>{this.state.players.robot.name}</p>
                    </div>
                    
                </div>
            </div>
        )
    }

    render() {
        return this.renderView()
    }
}

export default MultiPlayerView
