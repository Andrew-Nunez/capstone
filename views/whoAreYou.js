// // import html from "html-literal";

// // export default () => html`
// //   <div class="floatingBox">
//     <!-- <h4>Who Are You?</h4>
//     <ol>
//       <li>NAME</li>
//       <li>LOCATION</li>
//       <li>Within which window of time are you regularly available?(Mon-Fri)</li>
//       <ol>
//         <ul>
//           10PM-2AM
//         </ul>
//         <ul>
//           2AM-6AM
//         </ul>
//         <ul>
//           6AM-10AM
//         </ul>
//       </ol>
//     </ol>
//   </div>
// `; -->

import html from "html-literal";

export default state => html`
  <div class="floatingBox">
    <h4>Who Are You?</h4>
    <form>
      <label for="name">Name:</label><br />
      <input type="text" id="name" name="name" required /><br /><br />

      <label for="location">Location:</label><br />
      <input type="text" id="location" name="location" required /><br /><br />

      <p>Within which window of time are you regularly available? (Mon–Fri)</p>
      <label>
        <input type="checkbox" name="time" value="Asian Session" />
        10PM–2AM </label
      ><br />

      <label>
        <input type="checkbox" name="time" value="London Session" />
        2AM–6AM </label
      ><br />

      <label>
        <input type="checkbox" name="time" value="New York Session" />
        6AM–10AM </label
      ><br /><br />

      <input type="submit" value="submit" />
    </form>
    ${state.users.map(user => {
      return `<p> ${user.name} ${user.location} ${user.time.join(" & ")}
      </p>`;
    })}
  </div>
`;
