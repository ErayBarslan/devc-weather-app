import React from 'react'
import styled from 'styled-components'
import { vars } from '../styles/Global'

const MainForecast = ({ formatDate, weatherImgHandler, showCelsius, forecastData }) => {

  return (
    <StyledContainer>
      {forecastData?.list.slice(0, 5).map((day, index) => {
        return (
          <div className="forecast-card" key={index}>
            <p className='date'>{index === 0 ? "Tomorrow" : formatDate(new Date().setDate(new Date().getDate() + index + 1))}</p>
            <img className="weather-img" src={weatherImgHandler(day.weather[0].description)} alt={day.weather[0].description} />
            <div className="degree-holder">
              {showCelsius && <>
                <div className='max-degree'>
                  <p className='degree-display'>{(day.main.temp_max - 273.15).toFixed(0)}</p>
                  <p className='degree-celsius'>&deg;C</p>
                </div>
                <div className='min-degree'>
                  <p className='degree-display'>{(day.main.temp_min - 273.15).toFixed(0)}</p>
                  <p className='degree-celsius'>&deg;C</p>
                </div>
              </>}
              {!showCelsius && <>
                <div className='max-degree'>
                  <p className='degree-display'>{((day.main.temp_max - 273.15) * 9 / 5 + 32).toFixed(0)}</p>
                  <p className='degree-celsius'>&deg;F</p>
                </div>
                <div className='min-degree'>
                  <p className='degree-display'>{((day.main.temp_min - 273.15) * 9 / 5 + 32).toFixed(0)}</p>
                  <p className='degree-celsius'>&deg;F</p>
                </div>
              </>}
            </div>
          </div>
        )
      })}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
margin-top: 52px;
display: grid;
justify-content: center;
grid-gap: 32px 26px;
grid-template-columns: repeat(auto-fill, 120px);
width: 87.421vw;
max-width: 704px;

@media screen and (min-width: ${vars.desktopMedia}){
  width: 68.125vw;
}

.forecast-card {
  width: 120px;
  background-color: ${vars.asideBg};
  display: flex;
  flex-direction: column;
  align-items: center;

  .date {
    margin-top: 18px;
    font-size: 16px;
    font-weight: 500;
  }

  .weather-img {
    margin-top: 10px;
    width: 62px;
    height: 62px;
  }

  .degree-holder {
    font-family: 'Raleway';
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 18.6px;

    .max-degree {
  color: ${vars.white};
  display: flex;
  align-items: center;
  margin-right: 16px;
}

  .min-degree {
    color: ${vars.gray};
    display: flex;
    align-items: center;
  }

  .degree-display {
    font-size: 16px;
  }

  .degree-celsius {
    transform: translateY(1px);
  }
  }
}
`

export default MainForecast