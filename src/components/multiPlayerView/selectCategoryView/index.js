import React from 'react'
import styles from './selectCategoryView.module.css'


class SelectCategoryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderButtons = () => {
        const categories = Object.keys(this.props.categories)
        return categories.map((category => <button id={category} onClick={this.props.handleCategories} className={`${styles.button} ${ this.isChoosen(category) ? null : styles.notSelected}`}>{this.getCategory(category).name} {this.getCategory(category).icon}</button>))                                                    
    }

    getCategory = (name) => {
        return this.getCategories()[name]
    }

    isChoosen = (category) => {
        return this.props.categories[category].isChoosen
    }

    getCategories = () => {
        return this.props.categories
    }

    handleStart = () => {}

    hasCategoryBeenChoosen = () => {

        const {categories} = this.props
        const arr = Object.keys(categories)

        return arr.some(item => categories[item].isChoosen)
    }

    renderStartButton = () => {
        const styles = {
            position: 'absolute',
            right: '25px',
            top: '25px'
        }

        return <button onClick={() => this.props.handleView('start')} style={styles} disabled={!this.hasCategoryBeenChoosen()}>Start</button>
    }

    render = () => {
        return (
            <>
                {this.renderStartButton()}
                <h4 className={styles.smallTitle}>PLAYER VS COMPUTER</h4>
                <h2 className={styles.title}>Choose Categories</h2>
                <div className={styles.buttonContainer}>
                    {this.renderButtons()}
                </div>
            </>
        )
    }
}

export default SelectCategoryView
