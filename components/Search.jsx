import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import cities from '../cities.json'
import { IoClose } from 'react-icons/io5'
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNavigateNext } from 'react-icons/md'
import { vars } from '../styles/Global'

const Search = ({ setShowSearch, setCity, setLoading, fetchData, city }) => {
  const [filteredCities, setFilteredCities] = useState([])
  const [cityList, setCityList] = useState([])

  useEffect(() => {
    setCityList([...new Set(cities.map(city => {
      return city.name
    }))])
  }, [])

  const filterHandler = e => {
    let str = e.target.value
    str = str.charAt(0).toUpperCase() + str.slice(1)

    setCity(str)
    if (cityList) {
      const filterCities = cityList.filter(city => {
        return city.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setFilteredCities(filterCities)
    }
  }

  return (
    <StyledContainer>
      <button className="close-btn" onClick={() => setShowSearch(false)}><IoClose size={25} className="close-icon" /></button>
      <div className="search-container">
        <form className="input-holder" onSubmit={e => {
          e.preventDefault()
          setCity(city)
          fetchData()
          setShowSearch(false)
        }}>
          <AiOutlineSearch size={22} className="search-icon" />
          <input type="text" autoFocus placeholder="search city" className="search-input" onChange={filterHandler} />
        </form>
        <button type="submit" className="search-btn" onClick={() => {
          setCity(city)
          fetchData()
          setShowSearch(false)
        }}>Search</button>
      </div>
      {
        <div className="cities-container">
          {filteredCities.slice(0, 20).map((city) => {
            return <button className="city" value={city} key={city} onClick={() => {
              setCity(city)
              fetchData()
              setShowSearch(false)
            }}>
              <p>{city}</p>
              <MdNavigateNext className='next-icon' size={23} />
            </button>
          })}
        </div>
      }
    </StyledContainer>
  )
}

const StyledContainer = styled.aside`
display: flex;
flex-direction: column;
width: 93%;

button:active {
  opacity: .8;
}

.close-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  align-self: end;
  cursor: pointer;
  margin-top: 17px;
  transform: translateX(5px);
}

.close-icon {
  color: ${vars.white};
}

.search-container {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  .input-holder {
    background: transparent;
    border: 1px solid ${vars.white};
    display: flex;
    align-items: center;
    width: 71.765%;
    max-width: 268px;

    .search-icon {
      color: ${vars.searchGray};
      margin-left: 15px;
    }

    .search-input {
    background: transparent;
    border: none;
    outline: none;
    margin-left: 15px;
    color: ${vars.searchGray};
    }
  }

  .search-btn {
    border: none;
    padding: 14px 0;
    width: 60px;
    background-color: ${vars.searchBlue};
    color: ${vars.white};
    cursor: pointer;
  }
}

.cities-container {
  padding: 1px;
  margin-top: 53px;
  height: 55vh;
  overflow:hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  color: ${vars.white};
}

.city {
  display: block;
  width: 100%;
  text-align: start;
  border: none;
  background: transparent;
  margin-top: 6px;
  padding: 22px 0 22px 12px;
  cursor: pointer;
  position: relative;

  p {
    font-size: 16px;
    font-weight: 500;
    color: ${vars.white};
  }

  .next-icon {
    color: ${vars.searchGray};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    display: none;
  }
}

.city:hover {
  outline: 1px solid ${vars.searchGray};
}

.city:hover > .next-icon {
  display: initial;
}
`

export default Search