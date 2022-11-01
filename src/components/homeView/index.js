import React from 'react'
import SinglePlayerView from '../singlePlayerView/index.js'
import MultiPlayerView from '../multiPlayerView/index.js'
import styles from './home.module.css'
import { ImHome3 } from 'react-icons/im'

class HomeView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentView: 'home' }
    }

    handleClick = (event) => {
        this.setState(prevState => ({
            ...prevState,
            currentView: event.target.id
        }))
    }

    renderHomeView() {
        return (
            <>
                <h2 className={styles.title}>Quiz Battle</h2>
                <button className={styles.button} onClick={this.handleClick} id="single-player">Single Player</button>
                <button className={styles.button} onClick={this.handleClick} id="multi-player">VS Computer</button>
                <button className={styles.button} onClick={this.handleClick} id="statistics">Statistics</button>
            </>
        )
    }

    handleHomeButton = () => {
        this.setState(prevState => ({ ...prevState, currentView: 'home' }))
    }

    renderHomeButton = () => {
        if (this.state.currentView === 'home') {
            return
        }

        return <button className={styles.homeButton} onClick={this.handleHomeButton}>
                    <ImHome3 size="25" />
                </button>
    }

    // Behave as a router for the application..
    renderView = () => {
        switch(this.state.currentView) {
            case 'home':
                return this.renderHomeView()
            case 'single-player':
                return <SinglePlayerView />
            case 'multi-player':
                return <MultiPlayerView />
            default:
                return null
        }
    }

    render() {
        return (
            <div className={styles.container}>
                { this.renderHomeButton() }
                { this.state.currentView ? this.renderView() : 'Loading..' }
            </div>
        )
    }
}

export default HomeView
