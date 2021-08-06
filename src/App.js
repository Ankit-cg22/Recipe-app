import React , {useEffect , useState} from 'react'
import RecipeTemplate from './RecipeTemplate';
import './App.css';
import HashLoader from "react-spinners/HashLoader"; // loader


function App() {

  const ID = '298c6e11'
  const KEY = 'c2983269077bf2a001bbb46d11a43d5d'


  //=-=-=-=-=-=-=-= PRELOADER =-=-=-=-=-=-=-=-=-=-=-=-=-//
  
  const [loading , setLoading] = useState(false);
  const [load , setLoad] = useState(false);
  const [op , setOp] = useState(0);
  
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false);
    },5000)
  }, [load])
  

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-//


  const [dishes , setDishes ] = useState([])
  
  const [queryTemp , setQueryTemp]= useState("") // temporary query
  const [query , setQuery]= useState("")


  const updateQueryTemp = e => {
    setQueryTemp(e.target.value);

  }

  const updateFinalQuery = e => {
    // runs when we submit the form
    e.preventDefault();
    setQuery(queryTemp)

    setQueryTemp("")
    setLoad(!load)
  }


  useEffect( () => {
     getDishes()
  } , [query])

  const getDishes = async () => {
    const recipeData = await fetch(` https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}`)
    const data = await recipeData.json();
    setDishes(data.hits)
  }


  //=-=-=-=-=-= Scroll to top =-=-=-=-=-=-
  function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // for smooth scroll up
    })
  }

  window.addEventListener('scroll', () => {
       if(window.scrollY > 500)setOp(1);
       else setOp(0);
  })



  return (
    <div className="App">
        <div class="header">
          <div class="head">
            <div class="name">
              <h1>Recipe App</h1>
            </div>
          </div>
          <form onSubmit={updateFinalQuery}>
          
              <input className="searchBar" type="text" value={queryTemp} onChange={updateQueryTemp} placeholder =" Seach your dish..."/>
              <button className="button" type="submit"> Search </button>
          
          </form>
        </div>

        {
          loading ?
            <div class="preloader">
              <h1>Fetching Dishes....</h1>
              <HashLoader color='white' loading={loading}  size={50} />
            </div>
          :
            <div className="dishesContainer">
            {dishes.map(dish => {
              return <RecipeTemplate
                key={dish.recipe.label}
                title={dish.recipe.label}
                calories={dish.recipe.calories}
                image={dish.recipe.image}
                ingredients={dish.recipe.ingredients}
              />
            })}
          </div>
        }

       <div className="scroll-top" onClick={scrollUp} style = {{opacity: op}} >
          <svg id="arrow" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
          </svg>  
       </div>

    </div>
  );
}

export default App;
