import { HashRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import ListScreen from './screens/ListScreen'
import DetailsScreen from './screens/DetailsScreen'
import Header from './components/Header'
import './App.css';
import Footer from './components/Footer'

function App() {
  return (
    <HashRouter>
      <main>
        <Header />
        <Routes>
          <Route path='/' exact element={<ListScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/movies/:id' element={<DetailsScreen />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
