const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCount = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

let cart = []

// Abrir o modal do carrinho
cartBtn.addEventListener('click', function() {
  updateCartModal()
cartModal.style.display = 'flex'
document.body.style.overflow = 'hidden';
})
// Fechar o modal do carrinho quando clicar fora
cartModal.addEventListener('click', function(event) {
if(event.target === cartModal) {
  cartModal.style.display = 'none'
  document.body.style.overflow = '';
}
})
// Fechar o modal do carrinho
closeModalBtn.addEventListener('click', function() {
  cartModal.style.display = 'none'
  document.body.style.overflow = '';
})

menu.addEventListener('click', function(event) {
  let parentButton = event.target.closest('.add-to-cart-btn')
  if(parentButton) {
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))
    const image = parentButton.getAttribute("data-image")

    addToCart(name,price,image)
  }
})

// Adicionar ao carrinho
function addToCart (name,price,image) {
  const existingItem = cart.find(item => item.name === name)

  if(existingItem) {
    //se o item já existe aumenta a quantity +1
    existingItem.quantity += 1;
  } else {    
    cart.push({
      name,
      price,
      quantity: 1,
      image,
    })
  }
  updateCartModal()
}
//Atualiza o carrinho
function updateCartModal () {
  cartItemsContainer.innerHTML = ""
  let total = 0

  cart.forEach(item => {
    const cartItemElement = document.createElement('div')
    cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between" style="margin: 15px 0">
      <div class="flex">
        <div class="flex items-center justify-center">
          <img src="${item.image}" class="rounded-md hover:scale-110 duration-300" style="width: 60px; height: 60px">
        </div>
        <div class="flex flex-col justify-between" style="margin: 0 20px">
          <p class="font-bold">${item.name}</p>
          <p>Quantidade: ${item.quantity}</p>
          <p class="font-medium mt-2 ">R$ ${item.price.toFixed(2)}</p>
        </div>
      </div>
      <button style="color: #000; transition: all 0.5s" onmouseover="this.style.color='red'" onmouseout="this.style.color='black'">
      Remover
      </button>
    </div>
    `
    total += item.price * item.quantity
    cartItemsContainer.appendChild(cartItemElement)
  })
}