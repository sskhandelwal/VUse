import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import CreateListingScreen from './screens/CreateListingScreen'
import LoginScreen from './screens/LoginScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path='/' element={<HomeScreen/>}/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='/cart/:id' element={<CartScreen/>}/>
            <Route path='/cart/' element={<CartScreen/>}/>
            <Route path='/createlisting/' element={<CreateListingScreen/>}/>
            <Route path='/login/' element={<LoginScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
