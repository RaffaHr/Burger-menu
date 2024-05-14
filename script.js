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
cartModal.style.display = 'flex'
})
// Fechar o modal do carrinho quando clicar fora
cartModal.addEventListener('click', function(event) {
if(event.target === cartModal) {
  cartModal.style.display = 'none'
}
})
// Fechar o modal do carrinho
closeModalBtn.addEventListener('click', function() {
  cartModal.style.display = 'none'
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

    cartItemElement.innerHTML = `
    <div>
      <div>
        <img src="${item.image}"
        <P>${item.name}</P>
        <P>${item.quantity}</P>
        <P>${item.price}</P>
      </div>
      <div>
      <button>
      Remover
      </button>
      </div>
    </div>
    `
    cartItemsContainer.appendChild(cartItemElement)
  })
}