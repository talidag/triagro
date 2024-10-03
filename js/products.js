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
    const stare = document.querySelector('input[name="stare"]:checked').value;
    const pretMin = document.getElementById("pretMin").value;
    const pretMax = document.getElementById("pretMax").value;

    const params = new URLSearchParams();

    if (utilajInput) params.append("utilaj", utilajInput);
    if (categorie) params.append("categorie", categorie);
    if (stare) params.append("stare", stare);
    if (pretMin) params.append("pretMin", pretMin);
    if (pretMax) params.append("pretMax", pretMax);

    window.location.href = `products.html?${params.toString()}`;
  });

// TEST TEMPLATE

document.addEventListener("DOMContentLoaded", function () {
  // Get the query parameter from the URL (e.g., ?page=page1)
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page") || "page1"; // Default to 'page1' if no param

  // Fetch the JSON file
  // fetch("products.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     data.map((category) => {
  //       category.SUBCATEGORIES.map((product) => {
  //         if (
  //           product.DETAILS &&
  //           product.DETAILS.IMAGES &&
  //           product.DETAILS.IMAGES.length > 0
  //         );
  //         {
  //           let toAdd = "";
  //           product.DETAILS.IMAGES.map(
  //             (img) =>
  //               (toAdd += `
  //          <div class="swiper-slide">
  //           <img src="${img}" />
  //         </div>
  //           `)
  //           );
  //           document.getElementById("products").innerHTML += `
  //           <div class="swiper">
  //               <div class="swiper-wrapper">

  //             ${toAdd}
  //              </div>
  //       <!-- Add Pagination -->
  //       <div class="swiper-pagination"></div>
  //       <!-- Add Navigation -->
  //       <div class="swiper-button-prev"></div>
  //       <div class="swiper-button-next"></div>
  //     </div>`;
  //         }
  //       });
  //     });

  //     var swiper = new Swiper(".swiper", {
  //       pagination: {
  //         el: ".swiper-pagination",
  //         clickable: true,
  //       },
  //       navigation: {
  //         nextEl: ".swiper-button-next",
  //         prevEl: ".swiper-button-prev",
  //       },
  //     });

  //     if (data[0]) {
  //       // Update the DOM with the data from the JSON
  //       // document.getElementById("page-content").innerText = data[page].content;
  //     } else {
  //       // Fallback if the page doesn't exist
  //       document.getElementById("page-title").innerText = "Page Not Found";
  //       document.getElementById("page-content").innerText =
  //         "The requested page does not exist.";
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error loading JSON data:", error);
  //   });
});
