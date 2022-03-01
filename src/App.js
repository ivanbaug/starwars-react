import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/LoginScreen'
import ListScreen from './screens/ListScreen'
import DetailsScreen from './screens/DetailsScreen'
import Header from './components/Header'
import './App.css';
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route path='/' exact element={<HomeScreen />} />
          <Route path='/list' element={<ListScreen />} />
          <Route path='/details' element={<DetailsScreen />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
