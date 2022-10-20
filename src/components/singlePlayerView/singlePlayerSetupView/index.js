import React from 'react'
import styles from './setup.module.css'

class SinglePlayerSetupView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: { 
                history: { isChoosen: false, name: 'history', icon: '📜' },
                geography: { isChoosen: false, name: 'geography', icon: '🌍' },
                sports: { isChoosen: false, name: 'sports', icon: '⚽' },
                literature: { isChoosen: false, name: 'literature', icon: '📚' },
                scienceAndNature: { isChoosen: false, name: 'science and nature', icon: '🧪' },
                entertainment: { isChoosen: false, name: 'entertainment', icon: '🎞️' },
                programming: { isChoosen: false, name: 'programming', icon: '🖥️' }
            }
        }
    }

    getCategories = () => {
        return this.state.categories
    }

    getCategory = (name) => {
        return this.getCategories()[name]
    }

    handleClick = (event) => {
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

    renderButtons = () => {
        const categories = Object.keys(this.state.categories)
        return categories.map((category => <button id={category} onClick={this.handleClick} className={`${styles.buttonTwo} ${ this.isChoosen(category) ? null : styles.notSelected}`}>{this.getCategory(category).name} {this.getCategory(category).icon}</button>))                                                    
    }

    renderView() {
        return (
            <>
                {this.renderStartButton()}
                <h4 className={styles.smallTitle}>SINGLE PLAYER</h4>
                <h2 className={styles.title}>Choose Categories</h2>
                <div className={styles.buttonContainer}>
                    {this.renderButtons()}
                </div>
            </>
        )
    }

    isChoosen = (category) => {
        return this.state.categories[category].isChoosen
    }

    handleStart = (event) => {
        // must have choosen at least one category!!
        if (!this.hasCategoryBeenChoosen()) {
            return
        }

        this.props.handleSetCategories(this.getChoosenCategories())
        this.props.handleSetupDone()
    }

    hasCategoryBeenChoosen = () => {
        const {categories} = this.state
        const arr = Object.keys(categories)

        return arr.some(item => categories[item].isChoosen)
    }

    getChoosenCategories = () => {
        const {categories} = this.state
        const arr = Object.keys(categories)

        return arr.filter(item => categories[item].isChoosen)
    }

    renderStartButton = () => {
        const styles = {
            position: 'absolute',
            right: '25px',
            top: '25px'
        }

        return <button onClick={this.handleStart} style={styles} disabled={!this.hasCategoryBeenChoosen()}>Start</button>
    }


    render() {
        return this.renderView()
    }

}

export default SinglePlayerSetupView
