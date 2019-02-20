/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import logo from '../assets/images/elgentos-logo.svg'

const Header = (props) => (
    <header id="header" className="alt">
        <Link to="/" className="logo"><img src={logo} alt={'elgentos'} title={'elgentos'} /></Link>
        <nav>
            <a className="menu-link" onClick={props.onToggleMenu} href="javascript:;">Menu</a>
        </nav>
    </header>
)

Header.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Header
