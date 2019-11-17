import React, { useState, useEffect } from "react";
import Constants from "../Constants";

async function fetchServiceData(service) {
  try {
    const data = await fetch("/api/" + service);
    const dataJSON = await data.json();
    return dataJSON;
  } catch (err) {
    return [{ status: "Error", error: err }];
  }
}

function matchRestaurantAndHours(restaurants, hours) {
  return restaurants.map(restaurant => {
    restaurant.hours = hours.find(hour => {
      return hour.restaurant_id === restaurant._id;
    });
    return restaurant;
  });
}

function formatRestuarants(restaurants) {
  if (restaurants) {
    const today = Constants.days[new Date().getDay()];
    return restaurants.map((restaurant, i) => {
      return (
        <li key={i}>
          <strong>{restaurant.name}</strong>
          <br />
          hours today: {restaurant.hours[today + "_open"]} -{" "}
          {restaurant.hours[today + "_close"]}
        </li>
      );
    });
  }
  return "";
}

function Restaurants(service) {
  const [restaurants, setRestaurants] = useState();
  const [hours, setHours] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const restaurants = await fetchServiceData("restaurants");
        const hours = await fetchServiceData("hours");
        setRestaurants(
          formatRestuarants(matchRestaurantAndHours(restaurants, hours))
        );
      } catch (err) {
        setRestaurants({ service: "Error", status: JSON.stringify(err) });
      }
    }
    fetchData();
  }, [hours]);

  return (
    <div className="restaurant">
      <ul>{restaurants}</ul>
    </div>
  );
}

export default Restaurants;
