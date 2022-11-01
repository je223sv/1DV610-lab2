import React from 'react'
import styles from './setupComputer.module.css'

class SetupComputerView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render = () =>  {
        return (
            <>
                <button className={styles.buttonTwo} onClick={() => this.props.handleView('select-categories')}>Select Categories</button>

                <h4 className={styles.smallTitle}>PLAYER VS COMPUTER</h4>
                <h2 className={styles.title}>Setup Computer</h2>

                <div className={styles.setupContainer}>
                    <div className={styles.imageContainer}>
                        {this.props.players.robot.image}
                    </div>
                    <div className={styles.nameContainer}>
                        <h2>{this.props.players.robot.name}</h2>
                    </div>
                    <div className={styles.skillLevelContainer}>
                        <button className={`${styles.skillLevelButton} ${this.props.players.robot.skillLevel === 'beginner' ? styles.selectedSkill : null}`} onClick={() => this.props.handleSkillLevel('beginner')}>Beginner</button>
                        <button className={`${styles.skillLevelButton} ${this.props.players.robot.skillLevel === 'average' ? styles.selectedSkill : null}`} onClick={() => this.props.handleSkillLevel('average')}>Average</button>
                        <button className={`${styles.skillLevelButton} ${this.props.players.robot.skillLevel === 'expert' ? styles.selectedSkill : null}`} onClick={() => this.props.handleSkillLevel('expert')}>Expert</button>
                    </div>
                </div>
            </>
        )
    }
}

export default SetupComputerView
