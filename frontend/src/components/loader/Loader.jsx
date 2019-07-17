import React from 'react';
import classnames from 'classnames';
import Proptypes from 'prop-types';
import './loader.css';

const Loader = props => {
    const displayClass = classnames({
        'loaderContainer': true,
        'loaderContainer-hidden': !props.visible,
        'loaderContainer-visible': props.visible
    });
    return(
        <div className={displayClass}>
            <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#E2007C" />
                <circle cx="170" cy="170" r="135" stroke="#404041" />
                <circle cx="170" cy="170" r="110" stroke="#E2007C" />
                <circle cx="170" cy="170" r="85" stroke="#404041" />
            </svg>
        </div>
    );
}

Loader.propTypes = {
    visible: Proptypes.bool.isRequired
}

export default Loader;