import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMusic} from "@fortawesome/free-solid-svg-icons";

const Nav = ({librarystatus, setlibrarystatus}) => {
    return (
        <nav>
            <h1>Sounds</h1>
            <button onClick={() => setlibrarystatus(!librarystatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>

    )
}

export default Nav;