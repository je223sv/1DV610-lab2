import React from 'react'
import styles from './setupPlayer.module.css'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

class SetupPlayerView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render = () =>  {
        return (
            <>
                <button className={styles.buttonTwo} onClick={() => this.props.handleView('setup-computer')}>Setup computer</button>

                <h4 className={styles.smallTitle}>PLAYER VS COMPUTER</h4>
                <h2 className={styles.title}>Setup Player</h2>

                <div className={styles.setupContainer}>
                    <div className={styles.imageContainer}>
                        <div className={styles.arrowContainer} onClick={() => this.props.handleChangePicture('left')}>
                            <MdKeyboardArrowLeft size="25" />
                        </div>
                        {this.props.players.player.image}
                        <div className={styles.arrowContainer} onClick={() => this.props.handleChangePicture('right')}>
                            <MdKeyboardArrowRight size="25" />
                        </div>
                    </div>
                    <div className={styles.nameContainer}>
                        <h2>{this.props.players.player.name}</h2>
                    </div>
                </div>
            </>
        )
    }
}

export default SetupPlayerView
