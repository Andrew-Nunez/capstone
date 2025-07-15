import html from "html-literal";

export default state => html`
  <header>
    <h1 class="LIQID">L I Q I D</h1>
    <h2 class="famous quote">
      ${state.quote}
    </h2>
  </header>
`;
