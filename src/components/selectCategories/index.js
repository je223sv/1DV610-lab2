import React from 'react'
import styles from './styles.module.css'

// This one could probably be reused..

class SelectCategories extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            categories: { 
                history: { isChosen: false, name: 'history', icon: '📜' },
                geography: { isChosen: false, name: 'geography', icon: '🌍' },
                sports: { isChosen: false, name: 'sports', icon: '⚽' },
                literature: { isChosen: false, name: 'literature', icon: '📚' },
                scienceAndNature: { isChosen: false, name: 'science and nature', icon: '🧪' },
                entertainment: { isChosen: false, name: 'entertainment', icon: '🎞️' },
                programming: { isChosen: false, name: 'programming', icon: '🖥️' }
            }
        }
    }

    isChosen = (category) => {
        return this.state.categories[category].isChosen
    }

    hasCategoryBeenChoosen = () => {
        const { categories } = this.state
        const arr = Object.keys(categories)

        return arr.some(item => categories[item].isChosen)
    }

    handleStartGame = () => {
        this.props.setCategories(this.state.categories)
        this.props.setView('game')
    }

    handleCategories = (event, category) => {
        this.setState(prevState => ({
            ...prevState,
            categories: { ...prevState.categories, [category]: { ...prevState.categories[category], isChosen: !prevState.categories[category].isChosen } }
        }))
    }

    renderCategories = () => {
        const { categories } = this.state
        
        const categoriesAsButtons = Object.keys(categories).map((category) => {
            const buttonClasses = `${styles.buttonTwo} ${this.isChosen(category) && styles.selected}`
            return (
              <button
                className={buttonClasses}
                onClick={(e) => this.handleCategories(e, category)}
              >
                {categories[category].icon} {category}
              </button>
            )
        })

        return (
            <div>
                { categoriesAsButtons }
            </div>
        )
    }

    renderStartGameButton = () => {
        const styles = {
            position: 'absolute',
            right: '25px',
            top: '25px'
        }

        return <button onClick={this.handleStartGame} style={styles} disabled={!this.hasCategoryBeenChoosen()}>Start</button>
    }

    render = () => {
        return (
            <>
                { this.renderStartGameButton() }
                <h2 className={styles.title}>Choose Categories</h2>
                <div className={styles.buttonContainer}>
                    {this.renderCategories()}
                </div>
            </>
        )
    }
}

export default SelectCategories
