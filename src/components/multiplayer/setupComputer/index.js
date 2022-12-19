import React from 'react'
import styles from './styles.module.css'


class SetupComputer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render = () => {
        return (
            <>
                <button className={styles.buttonTwo} onClick={() => this.props.setView('select-categories')}>Select Categories</button>

                <h2 className={styles.title}>Setup Computer</h2>

                <div className={styles.setupContainer}>
                    <div className={styles.imageContainer}>
                        {this.props.players.computer.image}
                    </div>
                    <div className={styles.nameContainer}>
                        <h2>{this.props.players.computer.name}</h2>
                    </div>
                    <div className={styles.skillLevelContainer}>
                        <button className={`${styles.skillLevelButton} ${this.props.players.computer.skillLevel === 'beginner' ? styles.selectedSkill : null}`} onClick={() => this.props.setSkillLevel('beginner')}>Beginner</button>
                        <button className={`${styles.skillLevelButton} ${this.props.players.computer.skillLevel === 'average' ? styles.selectedSkill : null}`} onClick={() => this.props.setSkillLevel('average')}>Average</button>
                        <button className={`${styles.skillLevelButton} ${this.props.players.computer.skillLevel === 'expert' ? styles.selectedSkill : null}`} onClick={() => this.props.setSkillLevel('expert')}>Expert</button>
                    </div>
                </div>
            </>
        )
    }
}

export default SetupComputer
