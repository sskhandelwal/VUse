import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function LandingScreen() {
  return (
    <section class="home">
        <div class="max-width">
            <div class="home-content">
                <div class="text-1">Welcome to VUse</div>
                <div class="text-2">Anchor Down!</div>
                <Link to='/login'>
                    <div>
                        <Button size='lg'>
                            Login
                        </Button>
                    </div>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default LandingScreen