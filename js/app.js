'use strict';

Product.allProducts = [];
var totalClicks = 0;
// Display product functions needs previous indices
var productIndexOnPage = [0, 1, 2];

function Product(liveClicks, name, src, timesRendered) {
  this.liveClicks = liveClicks;
  this.name = name;
  this.itemSrc = src;
  this.itemWidth = 250;
  this.timesRendered = timesRendered;

  Product.allProducts.push(this);
};

Product.prototype.renderProducts = function() {
  var target = document.getElementById('list-of-products');
  var productHomeLi = document.createElement('li');

  var productImg = document.createElement('img');
  productImg.src = this.itemSrc;
  productImg.alt = this.name;
  productImg.width = this.itemWidth;
  productHomeLi.appendChild(productImg);

  var productTextP = document.createElement('p');
  productTextP.textContent = this.name;
  productHomeLi.appendChild(productTextP);

  target.appendChild(productHomeLi);
};

function handleClickOnProduct(event) {
  if (event.target.tagName === 'IMG') {
    totalClicks++;
    for (var prodIndex = 0; prodIndex < Product.allProducts.length; prodIndex++) {
      if (Product.allProducts[prodIndex].itemSrc === event.target.getAttribute('src')) {
        Product.allProducts[prodIndex].liveClicks++;
      }
    }
    displayProducts();



    if (totalClicks === 25) {
      listOfProducts.removeEventListener('click', handleClickOnProduct);

      var stringyProdArr = JSON.stringify(Product.allProducts);
      localStorage.setItem('products', stringyProdArr);

      displayFinalProducts();
      renderChart();
    }
  }
};

function displayProducts() {
  var index1 = Math.floor(Math.random() * Product.allProducts.length);

  while (
    index1 === productIndexOnPage[0] ||
    index1 === productIndexOnPage[1] ||
    index1 === productIndexOnPage[2]
    ) {
      index1 = Math.floor(Math.random() * Product.allProducts.length);
  }

  var index2 = Math.floor(Math.random() * Product.allProducts.length);

  while (
    index2 === index1 ||
    index2 === productIndexOnPage[0] ||
    index2 === productIndexOnPage[1] ||
    index2 === productIndexOnPage[2]
    ) {
    index2 = Math.floor(Math.random() * Product.allProducts.length);
  }

  var index3 = Math.floor(Math.random() * Product.allProducts.length);

  while (
    index3 === index1 ||
    index3 === index2 ||
    index3 === productIndexOnPage[0] ||
    index3 === productIndexOnPage[1] ||
    index3 === productIndexOnPage[2]
  ) {
    index3 = Math.floor(Math.random() * Product.allProducts.length);
  }

  var newProduct1 = Product.allProducts[index1];
  var newProduct2 = Product.allProducts[index2];
  var newProduct3 = Product.allProducts[index3];

  productIndexOnPage = [index1, index2, index3];

  var productList = document.getElementById('list-of-products');
  productList.innerHTML = '';
  newProduct1.renderProducts();
  newProduct2.renderProducts();
  newProduct3.renderProducts();

  newProduct1.timesRendered++;
  newProduct2.timesRendered++;
  newProduct3.timesRendered++;
};

function displayFinalProducts() {
  var target = document.getElementById('list-of-final-products')
  target.innerHTML = '';
  for (var i = 0; i < Product.allProducts.length; i++) {
    var finalDisplay = Product.allProducts[i].name + ' had ' + Product.allProducts[i].liveClicks + ' votes and has shown ' + Product.allProducts[i].timesRendered + ' times.'
    var productHomeLi = document.createElement('li');
    productHomeLi.textContent = finalDisplay;
    target.appendChild(productHomeLi);
  }
};

var listOfProducts = document.getElementById('list-of-products');
listOfProducts.addEventListener('click', handleClickOnProduct);

function renderChart() {
  var labelArray = [];

  for (var i = 0; i < Product.allProducts.length; i++) {
    labelArray.push(Product.allProducts[i].name)
  }

  var productDataArray = [];

  for (var i = 0; i < Product.allProducts.length; i++) {
    productDataArray.push(Product.allProducts[i].liveClicks)
  }

  var timesProductRenderedArray = [];

  for (var i = 0; i < Product.allProducts.length; i++) {
    timesProductRenderedArray.push(Product.allProducts[i].timesRendered)
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelArray,
        datasets: [{
            label: '# of Votes',
            data: productDataArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
                
            ],
            borderWidth: 1
        }, {
          label: '# of times Rendered',
          data: timesProductRenderedArray,
          type: 'line'
        }],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
};

/*var prodFromLS = localStorage.getItem('products');
var parsedProducts = JSON.parse(prodFromLS);

if(parsedProducts !== null) {
  for (var i = 0; i < parsedProducts.length; i++) {
    new Product(parsedProducts[i].liveClicks, parsedProducts[i].name, parsedProducts[i].itemSrc, parsedProducts[i].timesRendered)
  };
} else {
  new Product(0, 'R2D2 Suitcase', 'img/bag.jpg', 0);
  new Product(0, 'Banana Slicer', 'img/banana.jpg', 0);
  new Product(0, 'Toilet Paper/Ipad Stand Dispenser', 'img/bathroom.jpg', 0);
  new Product(0, 'Toe Boots', 'img/boots.jpg', 0);
  new Product(0, 'All Purpose Breakfast Appliance', 'img/breakfast.jpg', 0);
  new Product(0, 'Meatball Bubble Gum', 'img/bubblegum.jpg', 0);
  new Product(0, 'Hump Chair', 'img/chair.jpg', 0);
  new Product(0, 'Green Tentacle Face Alien', 'img/cthulhu.jpg', 0);
  new Product(0, 'Dog Duck', 'img/dog-duck.jpg', 0);
  new Product(0, 'Dragon Meat', 'img/dragon.jpg', 0);
  new Product(0, 'Utensil Pen', 'img/pen.jpg', 0);
  new Product(0, 'Pet Swiffer Shoes', 'img/pet-sweep.jpg', 0);
  new Product(0, 'Pizza Scissors', 'img/scissors.jpg', 0);
  new Product(0, 'Shark Sleeping Bag', 'img/shark.jpg', 0);
  new Product(0, 'Baby Sweep', 'img/sweep.png', 0);
  new Product(0, 'Taun Taun Sleeping Bag', 'img/tauntaun.jpg', 0);
  new Product(0, 'Unicorn Meat', 'img/unicorn.jpg', 0);
  new Product(0, 'Tentacle USB', 'img/usb.gif', 0);
  new Product(0, 'Not a Watering Can', 'img/water-can.jpg', 0);
  new Product(0, 'Egg Wine Glass', 'img/wine-glass.jpg', 0);
}*/

displayProducts();
