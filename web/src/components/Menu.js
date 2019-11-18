import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function sortItems(a, b) {
  return a.name < b.name ? -1 : 1;
}

function sortPrices(a, b) {
  return a.price < b.price ? -1 : 1;
}

function formatPrices(prices) {
  if (prices && prices.length) {
    return prices.sort(sortPrices).map((price, i) => {
      return (
        <span className="pr-10" key={i}>
          {price.size} - <strong>{price.price}</strong>
        </span>
      );
    });
  }
  return "";
}

function formatItem(items) {
  return items.map((item, i) => {
    return (
      <div key={i}>
        <strong>{item.name}</strong> - {item.description}
        <br />
        <small>
          <i>{item.notes}</i>
        </small>
        <br />
        {formatPrices(item.prices)}
      </div>
    );
  });
}

function formatMenu(menu) {
  if (menu && menu.menu_items && menu.menu_items.length) {
    const menuClone = menu.menu_items.reduce((acc, item) => {
      if (!acc.hasOwnProperty(item.category)) {
        acc[item.category] = [item];
      } else {
        const itemArr = acc[item.category].slice(0);
        itemArr.push(item);
        acc[item.category].push(itemArr.sort(sortItems));
      }

      return acc;
    }, {});

    const categoryKeys = Object.keys(menuClone).sort();
    return categoryKeys.map((key, i) => {
      return (
        <li key={i}>
          <h3>{key}</h3>
          <div>{formatItem(menuClone[key])}</div>
        </li>
      );
    });
  }
  return "";
}

function FormattedMenu(obj) {
  if (obj && obj.menu) {
    const format = formatMenu(obj.menu);
    return (
      <div>
        <ul>{format}</ul>
      </div>
    );
  }
  return "";
}

function Menu() {
  const [menu, setMenu] = useState();
  const [d, setD] = useState();
  let { id } = useParams();
  useEffect(() => {
    async function fetchMenu() {
      try {
        const data = await fetch("/api/menus/" + id);
        const dataJSON = await data.json();
        setD(Object.assign({}, dataJSON));
        setMenu(formatMenu(dataJSON));
      } catch (err) {
        setMenu(JSON.stringify(err));
      }
    }
    fetchMenu();
  }, [id]);

  return (
    <div>
      Menu for {id}
      <FormattedMenu menu={d} />
    </div>
  );
}

export default Menu;
