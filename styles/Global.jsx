import { createGlobalStyle } from "styled-components"

export const vars = {
  'asideBg' : '#1E213A',
  'mainBg' : '#100E1D',
  'white' : '#E7E7EB',
  'lightGray' : '#A09FB1',
  'gray' : '#88869D',
  'btnBg' : '#6E707A',
  'searchGray' : '#616475',
  'searchBlue' : '#3C47E9',
  'desktopMedia' : '780px'
}

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: 0;
}

html {
  min-height: 100%;
}

body {
  height: 100%;
  font-family: 'Raleway';
  display: grid;
  justify-content: center;
  grid-template-columns: 100%;
  overflow-x: hidden;
  background: ${vars.mainBg};
}

.center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.wave {
  width: 5px;
  height: 100px;
  background: linear-gradient(45deg, cyan, #fff);
  margin: 10px;
  -webkit-animation: wave 1s linear infinite;
          animation: wave 1s linear infinite;
  border-radius: 20px;
}

.wave:nth-child(2) {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
}

.wave:nth-child(3) {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
}

.wave:nth-child(4) {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
}

.wave:nth-child(5) {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
}

.wave:nth-child(6) {
  -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s;
}

.wave:nth-child(7) {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
}

.wave:nth-child(8) {
  -webkit-animation-delay: 0.7s;
          animation-delay: 0.7s;
}

.wave:nth-child(9) {
  -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s;
}

.wave:nth-child(10) {
  -webkit-animation-delay: 0.9s;
          animation-delay: 0.9s;
}

@-webkit-keyframes wave {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes wave {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
`