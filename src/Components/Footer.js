import React from "react";


function Footer(){
    const [isHoveringOverEasterEgg, setIsHoveringOverEasterEgg] = React.useState(false)
    return(
        <div className='footerContainer'>
        <p className='footerText'>By ©</p>
        <div onMouseOver={() => setIsHoveringOverEasterEgg(true)} onMouseLeave={() => setIsHoveringOverEasterEgg(false)}>
          <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" style={{textDecoration: 'none'}} className="footerText">
            <p className={isHoveringOverEasterEgg ? "easterEgg" : "animationIdle"}>Marius Pfluger</p>
          </a>
        </div>
      </div>
    )
}

export default Footer;