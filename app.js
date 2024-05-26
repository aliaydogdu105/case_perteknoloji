document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#myTable tbody");

  // RapidAPI'den veri çekme fonksiyonu
  async function fetchData() {
    const options = {
      method: "GET",
      url: "https://fakestoreapi.com/products/", // API URL
    };

    try {
      const response = await axios.request(options);
      const products = response.data; // API'nin döndürdüğü veri

      // Gelen veriyi tabloya ekleme
      products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${index + 1}</td>
                <td class="text-capitalize">${product.title}</td>
                <td>${product.price}&#8378;</td>
                <td>${Math.floor(Math.random() * 30) + 1}/${
          Math.floor(Math.random() * 12) + 1
        }/${Math.floor(Math.random() * (2028 - 2024 + 1)) + 2025}</td>
              `;
        tableBody.appendChild(row);
      });

      // DataTables'i tabloya veri eklendikten sonra başlatma
      const table = $("#myTable").DataTable({
        dom: '<"top"lBf>rt<"bottom"ip<"clear"',
        buttons: ["excel", "pdf"],
      });

      // Büyük/Küçük harf duyarlı arama için özelleştirme
      $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        var input = table.search();
        var regex = new RegExp(input);
        var match = false;

        for (var i = 0; i < data.length; i++) {
          if (regex.test(data[i])) {
            match = true;
            break;
          }
        }

        return match;
      });

      // Arama kutusu her değiştiğinde tabloyu yeniden çizme
      $("#myTable_filter input").on("keyup", function () {
        table.draw();
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Veri çekme fonksiyonunu çağırıldı
  fetchData();
});
