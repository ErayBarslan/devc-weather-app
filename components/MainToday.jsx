import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { vars } from '../styles/Global'
import { TiLocationArrow } from 'react-icons/ti'

const MainToday = ({ currentData }) => {
  const commaMiles = (currentData?.visibility / 1609).toFixed(1).replace(".", ",")

  const theme = {
    humidity: currentData?.main.humidity,
    wind: currentData?.wind.deg
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <h1>Today&apos;s Highlights</h1>
        <div className="highlights-container">
          <div className="highlight-card">
            <h2>Wind Status</h2>
            <p className="speed-holder"><span className="speed-num">{(currentData?.wind.speed * 2.236).toFixed(0)}</span><span className="speed-mph">mph</span></p>
            <div className="degree-holder">
              <div className='arrow-holder'><TiLocationArrow className="arrow-icon" size={15.5} style={{
                transform: 'rotate(${currentData.wind.deg}deg)',
              }} /></div>
              <p className="direction-txt">
                {(345 < currentData?.wind.deg && currentData?.wind.deg <= 360) && "E"}
                {(0 <= currentData?.wind.deg && currentData?.wind.deg < 15) && "E"}
                {(15 <= currentData?.wind.deg && currentData?.wind.deg < 75) && "SE"}
                {(75 <= currentData?.wind.deg && currentData?.wind.deg < 105) && "S"}
                {(105 <= currentData?.wind.deg && currentData?.wind.deg < 165) && "SW"}
                {(165 <= currentData?.wind.deg && currentData?.wind.deg < 195) && "W"}
                {(195 <= currentData?.wind.deg && currentData?.wind.deg < 255) && "NW"}
                {(255 <= currentData?.wind.deg && currentData?.wind.deg < 285) && "N"}
                {(285 <= currentData?.wind.deg && currentData?.wind.deg <= 345) && "NE"}
              </p>
            </div>
          </div>

          <div className="highlight-card">
            <h2>Humidity</h2>
            <p className="humidity-holder">
              <span className="humidity-num">{currentData?.main.humidity}</span>
              <span className="humidity-per">%</span>
            </p>
            <div className="bar-holder" aria-hidden="true">
              <div className="bar-num"><span>0</span><span>50</span><span>100</span></div>
              <div className="bar" style={{
                marginTop: '2px',
                width: '100%',
                height: '8px',
                borderRadius: '80px',
                background: 'linear-gradient(to right,#FFEC65 ${currentData.main.humidity}%, ${vars.white} ${currentData.main.humidity}%, ${vars.white} 100%)',
              }}></div>
              <span className="bar-per">%</span>
            </div>
          </div>

          <div className="highlight-card">
            <h2>Visibility</h2>
            <p className="visibility-holder">
              <span className="visibility-num">{commaMiles}</span>
              <span className="visibility-txt">miles</span>
            </p>
          </div>

          <div className="highlight-card">
            <h2>Air Pressure</h2>
            <p className="pressure-holder">
              <span className="pressure-num">{currentData?.main.pressure}</span>
              <span className="pressure-txt">mb</span>
            </p>
          </div>

        </div>
      </StyledContainer>
    </ThemeProvider>
  )
}

const StyledContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;

h1 {
  font-weight: 700;
  font-size: 24px;
  color: ${vars.white};
  margin-top: 50px;

  @media screen and (min-width: ${vars.desktopMedia}) {
    margin-top: 72px;
  }
  @media screen and (min-width: 1034px){
  align-self: flex-start;
}
}

.highlights-container {
  width: 100%;
  margin-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 328px);
  justify-content: center;
  margin-top: 32px;
  grid-gap: 32px;

  @media screen and (min-width: 1034px){
  grid-gap: 48px;
}
}

.highlight-card {
  width: 100%;
  max-width: 328px;
  background-color: ${vars.asideBg};
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: ${vars.white};
    font-size: 16px;
    font-weight: 500;
    margin-top: 22px;
  }

  .speed-holder {
    display: flex;
    align-items: center;
    color: ${vars.white};
    margin-top: 10.6px;

    .speed-num {
      font-size: 64px;
      font-weight: 700;
    }

    .speed-mph {
      font-size: 36px;
      font-weight: 500;
      transform: translateY(7px);
    }
  }

  .degree-holder {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 33px;
    margin-top: 24px;

    .arrow-holder {
      background-color: rgba(255, 255, 255, 0.3);
      width: 20px;
      height: 20px;
      display: grid;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transform: rotate(46deg);
    }

    .arrow-icon {
      transform: rotate(${props => props.theme.wind}deg)
    }

    .direction-txt {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .humidity-holder {
    margin-top: 12px;
    display: flex;
    align-items: center;

    .humidity-num {
      font-size: 64px;
      font-weight: 700;
    }
    
    .humidity-per {
      font-size: 36px;
      font-weight: 400;
      transform: translateY(5px);
    }
  }

  .bar-holder {
    width: 230px;
    margin-top: 11.2px;
    color: ${vars.lightGray};
    position: relative;
    margin-bottom: 40px;
    font-size: 12px;
    font-weight: 700;

    .bar-num {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .bar {
      margin-top: 2px;
      width: 100%;
      height: 8px;
      border-radius: 80px;
      background: linear-gradient(to right, #FFEC65 ${props => props.theme.humidity}%, ${vars.white} ${props => props.theme.humidity}%, ${vars.white} 100%);
    }

    .bar-per {
      position: absolute;
      right: 0;
      top: 26px;
    }
  }

  .visibility-holder , .pressure-holder {
    margin-top: 6.6px;
    margin-bottom: 36px;
  }

  .visibility-num , .pressure-num {
    font-size: 64px;
    font-weight: 700;
  }

  .visibility-txt , .pressure-txt {
    display: inline-block;
    margin-left: 10px;
    font-size: 36px;
    font-weight: 500;
    transform: translateY(-5px);
  }
}
`

export default MainToday