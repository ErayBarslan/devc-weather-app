import Head from 'next/head'
import { GlobalStyles, vars } from '../styles/Global'
import { useState, useEffect } from 'react'
import Search from '../components/Search'
import Today from '../components/Today'
import Main from '../components/Main'
import LoadEffect from '../components/LoadEffect'
import styled from 'styled-components'

export const getServerSideProps = () => {
  return { props: { API_KEY: process.env.API_KEY } }
}

export default function Home({ API_KEY }) {
  const [showSearch, setShowSearch] = useState(false)
  const [city, setCity] = useState("")
  const [showCelsius, setShowCelsius] = useState(true)

  const [currentData, setCurrentData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    if (!city) {
      try {
        setLoading(true)
        const res = await fetch('https://geolocation-db.com/json/')
        const data = await res.json()
        const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}`)
        const data2 = await res2.json()
        setCurrentData(data2)
        const res3 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}`)
        const data3 = await res3.json()
        setForecastData(data3)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    else {
      try {
        setLoading(true)
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
        const data = await res.json()
        const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${API_KEY}`)
        const data2 = await res2.json()
        setCurrentData(data2)
        const res3 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${API_KEY}`)
        const data3 = await res3.json()
        setForecastData(data3)
        setCity("")
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const weatherImgHandler = (description) => {
    if (description === "clear sky") {
      return "/Clear.png"
    }
    else if (
      description === "few clouds" ||
      description === "broken clouds" ||
      description === "scattered clouds") {
      return "/LightCloud.png"
    }
    else if (description === "overcast clouds") {
      return "/HeavyCloud.png"
    }
    else if (description === "light rain") {
      return "/LightRain.png"
    }
    else if (description === "moderate rain") {
      return "/Shower.png"
    }
    else if (description === "heavy rain") {
      return "/HeavyRain.png"
    }
    else if (description === "light snow") {
      return "/Sleet.png"
    }
    else if (description === "snow") {
      return "/Snow.png"
    }
    else if (description === "heavy snow") {
      return "/Hail.png"
    }
    else return "/Thunderstorm.png"
  }

  const capitalizeWords = (sentence) => {
    const words = sentence.split(" ")

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1)
    }
    return words.join(" ")
  }

  const formatDate = (date) => {
    const formatted = new Date(date).toLocaleDateString('en-gb', { weekday: "short", day: "numeric", month: "short" })

    return formatted
  }

  return (<>
    <Head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Weather App | DevC</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;1,700&family=Raleway:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
    </Head>
    <GlobalStyles />
    <StyledContainer>
      {loading && <LoadEffect />}
      {!loading && <>
        <AsideContainer>
          {showSearch ?
            <Search
              setShowSearch={setShowSearch}
              setCity={setCity}
              city={city}
              fetchData={fetchData}
              setLoading={setLoading} /> :
            <Today
              setShowSearch={setShowSearch}
              showCelsius={showCelsius}
              capitalizeWords={capitalizeWords}
              formatDate={formatDate}
              weatherImgHandler={weatherImgHandler}
              currentData={currentData}
              fetchData={fetchData}
              setLoading={setLoading}
              setCity={setCity}
            />}
        </AsideContainer>
        <MainContainer>
          <Main
            setShowCelsius={setShowCelsius}
            showCelsius={showCelsius}
            formatDate={formatDate}
            weatherImgHandler={weatherImgHandler}
            currentData={currentData}
            forecastData={forecastData} />
        </MainContainer>
      </>}
    </StyledContainer>
  </>)
}

const AsideContainer = styled.div`
display: flex;
position: relative;
flex-direction: row;
justify-content: center;
background-color: ${vars.asideBg};

@media screen and (min-width: 780px){
  min-height: 100vh;
}
`

const MainContainer = styled.div`
  background-color: ${vars.mainBg};
  display: grid;
  justify-content: center;

  @media screen and (min-width: 780px){
  min-height: 100vh;
  display: grid;
  align-items: start;
}
`

const StyledContainer = styled.div`
display: grid;
justify-content: center;
grid-template-columns: 100%;

@media screen and (min-width: ${vars.desktopMedia}){
  grid-template-columns: 31.875% 68.125%;
}
`