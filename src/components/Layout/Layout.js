import React from 'react';
import styles from './styles.styl';

export default function Layout({children}) {
    return (
        <div className={styles.background}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Vote as a Service (VaaS)
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        </div>
    );
}
Layout.propTypes = {
    children: React.PropTypes.element.isRequired
};
