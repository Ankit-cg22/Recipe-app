import React from 'react'
import './RecipeTemplate.css'

const RecipeTemplate = ({title, calories, image, ingredients}) => {
    return (
        <div className="template">
                
            <div className="title">
                <h1>{title}</h1>
            </div>

            <div className="info">
                <img src={image} alt={title} />
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