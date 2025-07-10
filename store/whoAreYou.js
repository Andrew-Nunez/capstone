export default {
  header: "Who Are You", // The text that shows on the view
  view: "whoAreYou" // This should match the view file name
  const view = match?.data?.view ? camelCase(match.data.view) : "WhoAreYou";
};
