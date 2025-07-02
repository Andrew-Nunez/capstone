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

export default () => html`
  <div class="floatingBox">
    <h4>Who Are You?</h4>
    <form action="#" method="POST">
      <label for="name">Name:</label><br />
      <input type="text" id="name" name="name" required /><br /><br />

      <label for="location">Location:</label><br />
      <input type="text" id="location" name="location" required /><br /><br />

      <p>Within which window of time are you regularly available? (Mon–Fri)</p>
      <label>
        <input type="checkbox" name="time[]" value="10pm-2am" />
        10PM–2AM </label
      ><br />

      <label>
        <input type="checkbox" name="time[]" value="2am-6am" />
        2AM–6AM </label
      ><br />

      <label>
        <input type="checkbox" name="time[]" value="6am-10am" />
        6AM–10AM </label
      ><br /><br />

      <button type="submit">Submit</button>
    </form>
  </div>
`;
