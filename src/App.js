import React , {useEffect , useState} from 'react'
import RecipeTemplate from './RecipeTemplate';
import './App.css';

function App() {

  const ID = '298c6e11'
  const KEY = 'c2983269077bf2a001bbb46d11a43d5d'

  const [item , setItem]= useState('chicken')
  const [dishes , setDishes ] = useState([])
  // const [item , setItem]= useState('')

    useEffect( () => {
      getDishes()
    } , [])


  const getDishes = async () => {
    const recipeData = await fetch(` https://api.edamam.com/search?q=${item}&app_id=${ID}&app_key=${KEY}`)
    const data = await recipeData.json();
    setDishes(data.hits)
  }

  return (
    <div className="App">
      <h1>Recipe App</h1>
        <div className="searchBox">
          <input className="searchBar" type="text" name="" id="" />
          <button className="button" type="submit" > Search </button>
        </div>

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
