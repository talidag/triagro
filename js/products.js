const pretMinInput = document.getElementById("pretMin");
const pretMaxInput = document.getElementById("pretMax");

pretMinInput.addEventListener("input", function () {
  pretMaxInput.min = pretMinInput.value;
});

document
  .getElementById("utilajForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const utilajInput = document.getElementById("cautaUtilaj").value;
    const categorie = document.getElementById("categorie").value;
    // const stare = document.querySelector('input[name="stare"]:checked').value;
    const pretMin = document.getElementById("pretMin").value;
    const pretMax = document.getElementById("pretMax").value;

    const params = new URLSearchParams();

    if (utilajInput) params.append("utilaj", utilajInput);
    if (categorie) params.append("categorie", categorie);
    // if (stare) params.append("stare", stare);
    if (pretMin) params.append("pretMin", pretMin);
    if (pretMax) params.append("pretMax", pretMax);

    window.location.href = `products.html?${params.toString()}`;
  });

// TEST TEMPLATE

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page") || "page1"; // Default to 'page1' if no param

  const categorieFilter = urlParams.get("categorie");
  // Fetch the JSON file
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      if (categorieFilter === "tractoare-premium") {
        const filteredData = data.filter((item) => item.ID === "C00001");
        console.log(filteredData[0].SUBCATEGORIES);
      } else if (categorieFilter === "combine-premium") {
        const filteredData = data.filter((item) => item.ID === "C00002");
        console.log(filteredData[0].SUBCATEGORIES);
      }
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
});
