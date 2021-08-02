import React from 'react'
import './RecipeTemplate.css'

const RecipeTemplate = ({title, calories, image, ingredients}) => {
    return (
        <div className="template">
                
            <div className="title">
                <h1>{title}</h1>
            </div>

            <div className="info">
                <div className="img-val">
                    
                    <img src={image} alt={title} />
                    <p>calories : {calories}</p>
                    
                </div>
                <div className="ingredients">
                    <ul>
                        <h2>Ingredients:</h2>
                        {ingredients.map(ingredient => (
                        <li>{ingredient.text}</li>
                        ))}
                    </ul>
                </div>
            </div>
            
            
        </div>
    );
}

export default RecipeTemplate;