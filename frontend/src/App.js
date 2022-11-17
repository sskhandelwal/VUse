import { Container } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import CreateListingScreen from './screens/CreateListingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import MyProductScreen from './screens/MyProductScreen'
import LandingScreen from './screens/LandingScreen'
import MyOrderScreen from './screens/MyOrderScreen'

function App() {
  return (
    <Router>
      <Header />
      {/* <main className="py-3">
        <Container> */}
          <Routes>
            <Route exact path='/' element={<LandingScreen/>}/>
            <Route exact path='/home' element={<HomeScreen/>}/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='/cart/:id' element={<CartScreen/>}/>
            <Route path='/cart/' element={<CartScreen/>}/>
            <Route path='/product/:id/edit' element={<CreateListingScreen/>}/>
            <Route path='/login/' element={<LoginScreen/>}/>
            <Route path='/register/' element={<RegisterScreen/>}/>
            <Route path='/profile/' element={<ProfileScreen/>}/>
            <Route path='/orders/' element={<MyOrderScreen/>}/>
            <Route path='/myproducts/' element={<MyProductScreen/>}/>
          </Routes>
        {/* </Container>
      </main> */}
      <Footer/>
    </Router>
  );
}

export default App;
