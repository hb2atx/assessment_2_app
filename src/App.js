import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AddItemForm from "./AddItemForm";
import SnackOrBoozeApi from "./Api";
import Home from "./Home";
import Item from "./ItemHook";
import Menu from "./MenuHook";
import NavBar from "./NavBar";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  /** we use the getSnacks /getDrinks functions to draw from api in api.js */
  useEffect(() => {
    async function getSnacks() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  useEffect(() => {
    async function getDrinks() {
      let drinks = await SnackOrBoozeApi.getDrinks();
      setDrinks(drinks);
      setIsLoading(false);
    }
    getDrinks();
  }, []);

  const add = (formData, type) => {
    if (type === "snacks") {
      setSnacks((snacks) => [...snacks, { ...formData, id: uuid() }]);
    } else {
      setDrinks((drinks) => [...drinks, { ...formData, id: uuid() }]);
    }
  };

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar snacks={snacks} drinks={drinks}/>
        <main>
          <Routes>
            <Route exact path="/">
              <Home items={snacks} />
            </Route>

            <Route exact path="/:type/new">
              <AddItemForm add={add} />
            </Route>

            <Route exact path="/snacks">
              <Menu items={snacks} title="Snacks" />
            </Route>
            <Route path="/snacks/:id">
              <Item items={snacks} cantFind="/snacks" />
            </Route>

            <Route exact path="/drinks">
              <Menu items={drinks} title="Drinks" />
            </Route>

            <Route exact path="/drinks/:id">
              <Item items={drinks} cantFind="/drinks" />
            </Route>

            <Route>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;