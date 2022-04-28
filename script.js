const cart = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const ol = document.querySelector(cart);
  ol.removeChild(event.target);
  saveCartItems(event.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function cartAdd(event) {
  const id = event.target.parentNode.querySelector('.item__sku').innerText;
  const ol = document.querySelector(cart);
  const response = await fetchItem(id);
  const element = createCartItemElement({ sku: response.id, 
    name: response.title, 
    salePrice: response.price });
  ol.appendChild(element);
  saveCartItems(element.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', cartAdd);
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(button);
  return section;
}

window.onload = async () => {
  const products = await fetchProducts('computador');
  const itemsContainer = document.querySelector('.items');
  products.results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    itemsContainer.appendChild(createProductItemElement({ sku, name, image }));
  });
  getSavedCartItems();
  document.querySelector(cart).addEventListener('click', cartItemClickListener);
};
