import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { vars } from '../styles/Global'
import { BiCurrentLocation } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'

const Today = ({ setShowSearch, capitalizeWords, formatDate, weatherImgHandler, showCelsius, currentData, setLoading, fetchData, setCity }) => {

  return (
    <StyledContainer>
      <div className="search-container">
        <button onClick={() => setShowSearch(true)} className="search-btn">
          Search for places</button>
        <button className="current-btn"><BiCurrentLocation size={22} className="current-icon" onClick={() => {
          setLoading(true)
          fetchData()
          setLoading(false)
        }} /></button>
      </div>
      <img src={weatherImgHandler(currentData?.weather[0].description)} className='weather-img' />
      <div className='degree-holder'>
        {showCelsius &&
          <><p className='degree-display'>{(currentData?.main.temp - 273.15).toFixed(0)}</p>
            <p className='degree-celsius'>&deg;C</p>
          </>}
        {!showCelsius &&
          <><p className='degree-display'>{((currentData?.main.temp - 273.15) * 9 / 5 + 32).toFixed(0)}</p>
            <p className='degree-celsius'>&deg;F</p>
          </>}
      </div>
      <p className='weather-description'>{currentData && capitalizeWords(currentData?.weather[0]?.description)}</p>
      <div className='date-holder'>
        <p>Today</p>
        <p className='dot'>•</p>
        <p className='date'>{formatDate(new Date())}</p>
      </div>
      <div className="city-holder">
        <MdLocationOn size={27} className="location-icon" />
        <p className="city-p">{currentData?.name}</p>
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.aside`
width: 93%;
display: flex;
flex-direction: column;

&::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: .05;
  background-image: url("/Cloud-background.png");
  background-repeat: no-repeat;
  background-position: center 100px;
  background-size: 155%;
}

.search-container {
  margin: 18px 12px 0 12px;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 1034px){
  margin: 42px 46px 0 46px;
}
}

.search-btn {
    border: none;
    width: 161px;
    font-size: 16px;
    font-weight: 500;
    color: ${vars.white};
    background-color: ${vars.btnBg};
    padding: 10px 0;
    cursor: pointer;
    z-index: 1;
}

.current-btn {
  display: grid;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: rgba(110, 112, 122, 0.3);
  border-radius: 50%;
  width: 39.2px;
  cursor: pointer;
  z-index: 1;
}

.current-icon {
  color: ${vars.white};
}

button:active {
  opacity: .8;
}

img {
  margin-top: 95px;
  align-self: center;
  transform: translateX(-15px);

  @media screen and (min-width: ${vars.desktopMedia}){
  margin-top: 110px;
}
}

.degree-holder {
  font-family: 'Raleway';
  color: ${vars.white};
  display: flex;
  align-self: center;
  margin-top: 90px;
  display: flex;
  align-items: center;

  .degree-display {
    font-size: 120px;
  }

  .degree-celsius {
    font-family: monospace;
    font-size: 48px;
    color: ${vars.lightGray};
    transform: translateY(8px);
  }
}

.weather-description {
  margin-top: 85px;
  align-self: center;
  color: ${vars.lightGray};
  font-size: 36px;
}

.date-holder {
  display: flex;
  color: ${vars.gray};
  align-self: center;
  margin-top: 48px;
  font-size: 18px;

  @media screen and (min-width: ${vars.desktopMedia}){
  margin-top: 90px;
}

  .dot {
    margin: 0 15px;
  }
}

.city-holder {
  margin: 32px 0 100px 0;
  display: flex;
  color: ${vars.gray};
  font-size: 18px;
  align-self: center;
  align-items: center;

  .location-icon {
    margin-right: 7px;
  }

  @media screen and (min-width: ${vars.desktopMedia}){
    margin-bottom: 0;
  }
}
`

export default Today