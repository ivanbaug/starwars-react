import { HashRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import ListScreen from './screens/ListScreen'
import DetailsScreen from './screens/DetailsScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <HashRouter>
      <main>
        <Header />
        <Routes>
          <Route path="/" exact element={<ListScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/movies/:id" element={<DetailsScreen />} />
          <Route path="/*" element={<NotFoundScreen />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default App
