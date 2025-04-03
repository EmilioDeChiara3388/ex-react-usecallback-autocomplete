import { useState, useEffect } from "react"

function App() {

  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {

    async function getData() {
      try {
        const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${search}`)
        const data = await response.json()
        setProducts(data)
        console.log(data);
      }
      catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [search])

  const suggestions = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
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
    </>
  )
}

export default App
