"use client"

import { useState } from "react"
import Login from "../components/Login"
import ProductList from "../components/ProducList"

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="App">{isLoggedIn ? <ProductList onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}</div>
  )
}

export default Admin
