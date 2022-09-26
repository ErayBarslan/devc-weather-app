import React, { useEffect } from 'react'
import styled from 'styled-components'
import { vars } from '../styles/Global'
import MainForecast from './MainForecast'
import MainToday from './MainToday'
import MainSwitch from './MainSwitch'

const Main = ({ formatDate, weatherImgHandler, setShowCelsius, showCelsius, currentData, forecastData }) => {
  return (
    <StyledContainer>
      <MainSwitch
        setShowCelsius={setShowCelsius}
        showCelsius={showCelsius} />
      <MainForecast
        formatDate={formatDate}
        weatherImgHandler={weatherImgHandler}
        showCelsius={showCelsius}
        currentData={currentData}
        forecastData={forecastData} />
      <MainToday
        currentData={currentData} />
    </StyledContainer>
  )
}

const StyledContainer = styled.main`
color: ${vars.white};
display: grid;
justify-content: center;
justify-items: center;

@media screen and (min-width: ${vars.desktopMedia}) {
  width: 100%;
  justify-self: center;
}
`

export default Main