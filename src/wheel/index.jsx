import React from 'react'
import './style.css'
function Wheel() {
    return (
        <div>
            <ul className="menu">
                <li className="one">
                    <a href="#">
                        <span className="icon">icon-1</span>
                    </a>
                </li>
                <li className="two">
                    <a href="#">
                        <span className="icon">icon-2</span>
                    </a>
                </li>
                <li className="three">
                    <a href="#">
                        <span className="icon">icon-3</span>
                    </a>
                </li>
                <li className="four">
                    <a href="#">
                        <span className="icon">icon-4</span>
                    </a>
                </li>
                <li className="five">
                    <a href="#">
                        <span className="icon">icon-5</span>
                    </a>
                </li>
                <li className="six">
                    <a href="#">
                        <span className="icon">icon-6</span>
                    </a>
                </li>
                {/* <li className="seven">
                    <a href="#">
                        <span className="icon">icon-7</span>
                    </a>
                </li>
                <li className="eight">
                    <a href="#">
                        <span className="icon">icon-8</span>
                    </a>
                </li> */}
            </ul>

            <svg height="0" width="0">
                <defs>
                    <clipPath clipPathUnits="objectBoundingBox" id="sector">
                        <path fill="none" stroke="#111" stroke-width="1" className="sector"
                            d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}

export default Wheel
