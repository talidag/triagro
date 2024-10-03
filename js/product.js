document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");

  const url = "products.json";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const product = data
        .flatMap((category) => category.SUBCATEGORIES)
        .flatMap((subcategory) => subcategory.PRODUCTS)
        .find((product) => product.ID === productId);

      // Check if product was found
      if (product) {
        displayProductDetails(product);
      } else {
        document.getElementById("product-details").innerText =
          "Product not found";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById("product-details").innerText =
        "Error fetching product details";
    });

  function displayProductDetails(product) {
    const details = product.PRODUCT_DETAILS;
    const productContainer = document.getElementById("product-details");

    productContainer.innerHTML = `
    <div class="product-images"> 
        <div class="swiper">
            <div class="swiper-wrapper">
                ${details.DETALII.IMAGES.map(
                  (image) => `
                    <div class="swiper-slide">
                        <img src="${image}" />
                    </div>
                `
                ).join("")}
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
            <!-- Add Navigation -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        
        <div class="product-offer">    
            <div class="product-title">
                <h3>${details.TITLE}</h3>
                <h4>${details.SUBTITLE}</h4>
            </div>
            <div class="product-end">
                <img src="${details.BRAND}" class="product-brand" />
                <button onclick="window.open('tel:900300400');">Cere o oferta</button> 
            </div>
        </div>
    </div>

    <div class="product-caracteristics">
        <p>Caracteristici</p>
    </div>

    <table class="product-table">
        <tbody>
            ${[
              { label: "Motor", value: details.DETALII.MOTOR },
              { label: "Transmisie", value: details.DETALII.TRANSMISIE },
              { label: "Sistem Hidraulic", value: details.DETALII.SISTEM },
              { label: "Priza de putere", value: details.DETALII.PUTERE },
              { label: "Frâne", value: details.DETALII.FRANE },
              {
                label: "Ridicator Hidraulic si Cuple",
                value: details.DETALII.RIDICATOR,
              },
              { label: "Punti", value: details.DETALII.PUNTI },
              { label: "Lestare", value: details.DETALII.LESTARE },
              { label: "Roti/Anvelope/Aparatori", value: details.DETALII.ROTI },
              { label: "Mediu Operator", value: details.DETALII.MEDIU },
              { label: "Tehnologia Fuse", value: details.DETALII.FUSE },
              {
                label: "Echipament Electric",
                value: details.DETALII.ECHIPAMENT,
              },
              { label: "Diverse", value: details.DETALII.DIVERSE },
              { label: "Masa (nelestat)", value: details.DETALII.MASA },
            ]
              .map(
                (item, index) => `
                <tr style="background-color: ${
                  index % 2 === 0 ? "#F2F2F2" : "#FFFFFF"
                };">
                    <td><strong>${item.label}</strong></td>
                    <td>${item.value}</td>
                </tr>
            `
              )
              .join("")}
        </tbody>
    </table>

    <div class="product-extra"> 
        <h4>Dotari Suplimentare</h4>
        <ul>
            ${details.DETALII.SUPLIMENTARE.map(
              (item) => `<li>${item}</li>`
            ).join("")}
        </ul>
    </div>
    
    <button class="end-btn"  onclick="window.open('tel:900300400');">Contacteaza-ne acum pentru o oferta!</button> 
`;

    var swiper = new Swiper(".swiper", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
});
