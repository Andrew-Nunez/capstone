// importing all by name
import * as store from "./store";
import { header, nav, main, footer } from "./components";
import Navigo from "navigo";
import { camelCase } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
      ${header(state)}
      ${nav(store.links)}
      ${main(state)}
      ${footer()}
    `;



}

router.hooks({
  // We pass in the `done` function to the before hook handler to allow the function to tell Navigo we are finished with the before hook.
  // The `match` parameter is the data that is passed from Navigo to the before hook handler with details about the route being accessed.
  // https://github.com/krasimir/navigo/blob/master/DOCUMENTATION.md#match
  before: (done, match) => {
    console.info("Before hook executing")
    // We need to know what view we are on to know what data to fetch
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // New Case for the Home View
    case "home":
      axios
        // Get request to retrieve the current weather data using the API key and providing a city name
        .get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial&q=st%20louis`
        )
        .then(response => {
          console.log("response", response)
          // Create an object to be stored in the Home state from the response
          store.home.weather = {
            city: response.data.name,
            temp: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            description: response.data.weather[0].main
          };
          done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
      break;

      // Add a case for each view that needs data from an API
      case "whoAreYou":
        // New Axios get request utilizing already made environment variable
        axios
          .get(`${process.env.LIQID_API_URL}/users`)
          .then(response => {
            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            console.log("response", response);
            store.whoAreYou.users = response.data;
            console.log(store.whoAreYou.users)
            done();
          })
          .catch((error) => {
            console.log("It puked", error);
            done();
          });
          break;
      default :
        // We must call done for all views so we include default for the views that don't have cases above.
        done();
        // break is not needed since it is the last condition, if you move default higher in the stack then you should add the break statement.
    }
  },
  already: (match) => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    render(store[view]);
  },
  after: (match) => {
    console.info("After hook executing")
        const view = match?.data?.view ? camelCase(match.data.view) : "home";
  //each view with a form will have an if statement like this
  //if there are multiple forms on one page, give it an id to seperate them
    if (view === "whoAreYou") {
  // Add an event handler for the submit button on the form
  document.querySelector("form").addEventListener("submit", event => {
    //look up this code for more context of why we need event.preventDefault()
    event.preventDefault();

    // Get the form element
    const inputList = event.target.elements;
    console.log("Input Element List", inputList);
    const timeCheckBoxes = []
    for (let input of inputList.time) {
      if (input.checked) {
        timeCheckBoxes.push(input.value)
      }
    }


    // Create a request body object to send to the API
    const requestData = {
      name: inputList.name.value,
      location: inputList.location.value,
      time: timeCheckBoxes
    };
    // Log the request body to the console
    console.log("request Body", requestData);

    axios
      // Make a POST request to the API to create a new pizza
      .post(`${process.env.LIQID_API_URL}/users`, requestData)
      .then(response => {
      //  Then push the new pizza onto the Pizza state pizzas attribute, so it can be displayed in the pizza list
        store.whoAreYou.users.push(response.data);
        console.log("this is the response data", response.data);
        router.navigate("/whoAreYou");
      })
      // If there is an error log it to the console
      .catch(error => {
        console.log("It puked", error);
      });
  });
}
    router.updatePageLinks();

    // add menu toggle to bars icon in nav bar
    document.querySelector(".fa-bars").addEventListener("click", () => {
        document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    });
  }
});



router.on({
  "/": () => render(),
  // The :view slot will match  any single URL segment that appears directly after the domain name and a slash
  '/:view': function(match) {
    console.info("Route Handler Executing");
    // If URL is '/about-me':
    // match.data.view will be 'about-me'
    // Using Lodash's camelCase to convert kebab-case to camelCase:
    // 'about-me' becomes 'aboutMe'

    const view = match?.data?.view ? camelCase(match.data.view) : "home";
//if view is in data
    // If the store import/object has a key named after the view
    if (view in store) {
      // Then the invoke the render function using the view state, using the view name
      render(store[view]);
    } else {
      // If the store
      render(store.viewNotFound);
      console.log(`View ${view} not defined`);
    }
  }
}).resolve();


// if (view === "order") {
//   // Add an event handler for the submit button on the form
//   document.querySelector("form").addEventListener("submit", event => {
//     event.preventDefault();

//     // Get the form element
//     const inputList = event.target.elements;
//     console.log("Input Element List", inputList);

//     // Create a request body object to send to the API
//     const requestData = {
//       name: inputList.name.value,
//       location: inputList.location.value,
//       time: inputList.time.value,
//     };
//     // Log the request body to the console
//     console.log("request Body", requestData);

//     axios
//       // Make a POST request to the API to create a new pizza
//       .post(`${process.env.PIZZA_PLACE_API_URL}/user`, requestData)
//       .then(response => {
//       //  Then push the new pizza onto the Pizza state pizzas attribute, so it can be displayed in the pizza list
//         store.user.push(response.data);
//         router.navigate("/pizza");
//       })
//       // If there is an error log it to the console
//       .catch(error => {
//         console.log("It puked", error);
//       });
//   });
// }
