import React from 'react'
import styles from './game.module.css'


class Game extends React.Component {
    renderHomeView = () => {
        return (
            <div class={styles.container}>
                <h2 class={styles.title}>Quiz Battle</h2>
                <button class={styles.button}>Single Player</button>
                <button class={styles.button}>VS Computer</button>
                <button class={styles.button}>Statistics</button>
            </div>
        )
    }

    render = () => {
        return (
            <div>
                {this.renderHomeView()}
            </div>
        )
    }
}


export default Game
