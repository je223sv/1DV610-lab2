import React from 'react'
import styles from './setup.module.css'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"


class SetupView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render = () => {
        return (
            <>
                <button className={styles.buttonTwo} onClick={this.handleChooseCategory} id="choose-categories">Choose categories</button>

                <div className={styles.playersContainer}>

                    <div className={styles.playerContainer}>
                        <div className={styles.image}>
                            {/* <div className={styles.arrowContainer} onClick={e => this.handleChangePicture('left')}>
                                <MdKeyboardArrowLeft size="25" />
                            </div> */}
                            {this.props.players.player.image}
                            {/* <div className={styles.arrowContainer} onClick={e => this.handleChangePicture('right')}>
                                <MdKeyboardArrowRight size="25" />
                            </div> */}
                        </div>
                        <h2>{this.props.players.player.name}</h2>
                    </div>

                    <div className={styles.vsContainer}>VS</div>

                    <div className={styles.aiContainer}>
                        <div className={styles.image}>
                            {this.props.players.robot.image}
                        </div>
                        <h2>{this.props.players.robot.name}</h2>
                        <div className={styles.skillSetContainer}>
                            <div className={styles.arrowContainer} onClick={() => this.props.handleSkillLevel('left')}>
                                <MdKeyboardArrowLeft size="25" />
                            </div>
                            <p>{this.props.players.robot.skillLevel}</p>
                            <div className={styles.arrowContainer} onClick={() => this.props.handleSkillLevel('right')}>
                                <MdKeyboardArrowRight size="25" />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default SetupView
