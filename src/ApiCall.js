import React, { useState, useEffect } from "react";
import "./ApiCall.css"

function ApiCall() {

  const [display, setDisplay] = useState('Loading....')
  const mealApiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=egg'
  const mealLikesUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bbDC3TOidzHVfwfLZkFs/likes';

  let extractedData = []

  let mealApi = fetch(mealApiUrl).then((response) => {
    return response.json();
  })

  let mealLikesApi = fetch(mealLikesUrl).then((response) => {
    return response.json();
  })

  const retrieveAllData = async function () {
    let result = await Promise.all([mealApi, mealLikesApi])

    // Here is a map function that contains the main meal details
    result[0].meals.map((meal) => {

      result[1].forEach(like => {
        if (meal.idMeal === like.item_id) {
          extractedData.push([meal, like])
        }
      });

      let displayData = extractedData.map((el) => {
        return (<div key={el[1].item_id}>
          <h4>{el[0].strMeal}</h4>
          <img src={el[0].strMealThumb} className='img-size' alt={el[0].strMeal} />
          <h1>{el[1].likes} likes</h1>
        </div>)
      })

      // Changing State Using useState
      setDisplay(displayData)

    })

    return result;
  }

  retrieveAllData()

  return (
    <>
      <h1>Api Call Tests...</h1>
      {display}
    </>
  )
}

export default ApiCall;