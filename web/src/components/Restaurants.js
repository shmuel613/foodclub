import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Constants from "../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function duckstepError(which) {
  return which.length && which[0].status && which[0].status === "Error";
}

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
  if (!duckstepError(restaurants)) {
    return restaurants.map(restaurant => {
      if (!duckstepError(hours)) {
        restaurant.hours = hours.find(hour => {
          return hour.restaurant_id === restaurant._id;
        });
      } else {
        restaurant.hours = {};
      }
      return restaurant;
    });
  }
  return [];
}

function formatRestuarants(restaurants) {
  if (restaurants) {
    const today = Constants.days[new Date().getDay()];
    return restaurants.map((restaurant, i) => {
      return (
        <li className="mt-15" key={i}>
          <FontAwesomeIcon icon="utensils" /> <strong>{restaurant.name}</strong>
          <div className="pl-20 pt-5">
            <FontAwesomeIcon icon="clock" /> hours today:
            {restaurant.hours[today + "_open"]} - {restaurant.hours[today + "_close"]}
          </div>
          <div className="pl-20 pt-5">
            <Link to={`/menu/${restaurant._id}`}>menu</Link>
          </div>
        </li>
      );
    });
  }
  return "";
}

function Restaurants(service) {
  const [restaurants, setRestaurants] = useState();
  const [hours] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const restaurants = await fetchServiceData("restaurants");
        const hours = await fetchServiceData("hours");
        setRestaurants(
          formatRestuarants(matchRestaurantAndHours(restaurants, hours))
        );
      } catch (err) {
        setRestaurants(
          JSON.stringify({ service: "Error", status: JSON.stringify(err) })
        );
      }
    }
    fetchData();
  }, [hours]);

  return (
    <div className="restaurant status-box mt-15">
      <div className="bold">Restaurants:</div>
      <ul>{restaurants}</ul>
    </div>
  );
}

export default Restaurants;
