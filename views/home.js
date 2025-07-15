import html from "html-literal";

export default state => html`
  <section id="jumbotron">
    <h2 class="archivo-black-regular">
      LIQID Trading
    </h2>
    <a href="/home">"Call to Action" "Button"</a>

    <h3>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </h3>
  </section>
`;
