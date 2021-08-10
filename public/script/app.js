const form = document.querySelector("form");
const message = document.querySelector("#message");
const error = document.querySelector("#error");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { value } = form.querySelector("input");
  message.textContent = "Loading...";
  error.textContent = "";
  fetch(`/weather?address=${value}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Failed to fetch");
    })
    .then((json) => {
      if (json.error) {
        throw new Error("Could not fetch location");
      }
      message.textContent = ` Location : ${json.placeName} has the temperature of ${json.current.temperature} and rain of ${json.current.rain}`;
      form.reset();
    })
    .catch((err) => {
      message.textContent = "";
      error.textContent = err.message || "Failed to fetch weather data";
    });
});
