function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  }
}

import { useState, useEffect, useCallback } from "react"

function App() {

  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])

  const getData = useCallback(debounce((search) => {
    fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${search}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        console.log("Debounce!");
      })
  }, 500), [])

  useEffect(() => {
    if (!search.trim()) {
      setProducts([])
      return
    }
    getData(search)
  }, [search])

  const suggestions = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className="container">
        <h1>Autocompletamento</h1>
        <input
          type="text"
          placeholder="Cerca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <div className="productsContainer">
          {search && suggestions.length > 0 ? suggestions.map(item =>
            <p key={item.id}>{item.name}</p>
          ) : <p>Nessun elemento trovato</p>}
        </div>
      </div>

    </>
  )
}

export default App
