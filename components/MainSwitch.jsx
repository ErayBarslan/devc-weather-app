import React from 'react'
import styled from 'styled-components'
import { vars } from '../styles/Global'

const MainSwitch = ({ setShowCelsius, showCelsius }) => {

  return (
    <StyledContainer>
      <button className={showCelsius ? "active" : "passive"} onClick={() => setShowCelsius(true)}>
        <span>&deg;C</span>
      </button>
      <button className={showCelsius ? "passive" : "active"} onClick={() => setShowCelsius(false)}>
        <span>&deg;F</span>
      </button>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
display: none;

@media screen and (min-width: ${vars.desktopMedia}) {
  display: flex;
  justify-self: end;
  margin-top: 42px;
  margin-right: 15px;
  gap: 12px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    font-family: monospace;
    font-weight: bold;
    cursor: pointer;
  }

  button:active {
    opacity: .8;
  }

  .active {
    color: #110E3C;
    background-color: ${vars.white};
  }

  .passive {
    color: ${vars.white};
    background-color: #585676;
  }
}

@media screen and (min-width: 1034px) {
  margin-right: 2px;
}
`

export default MainSwitch