import styles from './styles.styl';

import BaseComponent from '../shared/BaseComponent';

export default class BouncingBall extends BaseComponent {

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.ball} />
      </div>
    );
  }

};
