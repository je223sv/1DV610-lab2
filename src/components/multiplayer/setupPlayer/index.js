import React from 'react'
import styles from './styles.module.css'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

class SetupPlayer extends React.Component {
    constructor (props) {
        super(props)
        this.images = ['👦', '👩', '👨‍🦳', '👩‍🦳']
        this.state = {}
    }

    handleChangeImage = (direction) => {
        const currentIndex = this.images.indexOf(this.props.players.human.image)
        if (direction === 'left' && currentIndex > 0) {
            const image = this.images[currentIndex - 1]
            this.props.setHumanImage(image)
        } else if (direction === 'right' && currentIndex < (this.images.length - 1)) {
            const image = this.images[currentIndex + 1]
            this.props.setHumanImage(image)
        }
    }

    render = () => {
        return (
            <>
                <button className={styles.buttonTwo} onClick={() => this.props.setView('setup-computer')}>Setup computer</button>

                {/* <h4 className={styles.smallTitle}>PLAYER VS COMPUTER</h4> */}
                <h2 className={styles.title}>Setup Player</h2>

                <div className={styles.setupContainer}>
                    <div className={styles.imageContainer}>
                        <div className={styles.arrowContainer} onClick={() => this.handleChangeImage('left')}>
                            <MdKeyboardArrowLeft size="25" />
                        </div>
                        {this.props.players.human.image}
                        <div className={styles.arrowContainer} onClick={() => this.handleChangeImage('right')}>

                            <MdKeyboardArrowRight size="25" />
                        </div>
                    </div>
                    <div className={styles.nameContainer}>
                        <h2>{this.props.players.human.name}</h2>
                    </div>
                </div>
            </>
        )
    }
}

export default SetupPlayer
