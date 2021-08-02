import React , {useEffect , useState} from 'react'
import RecipeTemplate from './RecipeTemplate';
import './App.css';

function App() {

  const ID = '298c6e11'
  const KEY = 'c2983269077bf2a001bbb46d11a43d5d'

  const [dishes , setDishes ] = useState([])
  
  const [queryTemp , setQueryTemp]= useState("") // temporary query
  const [query , setQuery]= useState("chicken")


  const updateQueryTemp = e => {
    setQueryTemp(e.target.value);
    console.log(queryTemp);
  }

  const updateFinalQuery = e => {
    // runs when we submit the form
    e.preventDefault();
    console.log(queryTemp)
    setQuery(queryTemp)
    console.log(query)
    setQueryTemp("")
  }


  useEffect( () => {
     getDishes()
  } , [query])

  const getDishes = async () => {
    const recipeData = await fetch(` https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}`)
    const data = await recipeData.json();
    setDishes(data.hits)
  }

  return (
    <div className="App">
      <h1>Recipe App</h1>
        <form onSubmit={updateFinalQuery}>
        
            <input className="searchBar" type="text" value={queryTemp} onChange={updateQueryTemp} />    
            <button className="button" type="submit"> Search </button>
          
        </form>

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
    </div>
  );
}

export default App;
