const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const moreInfo = document.getElementById('more-info')
const infoModal = document.getElementById('info-modal')
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
  var total = 0

  cart.forEach(item => {
    const cartItemElement = document.createElement('div')
    cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between" style="margin: 15px 0">
      <div class="flex">
        <div class="flex items-center justify-center">
          <img src="${item.image}" class="rounded-md hover:scale-110 duration-300" style="width: 60px; height: 60px; margin-left: 5px">
        </div>
        <div class="flex flex-col justify-between" style="margin: 0 15px">
          <p class="font-bold">${item.name}</p>
          <p>Quantidade: ${item.quantity}</p>
          <p class="font-medium mt-2 ">R$ ${item.price.toFixed(2)}</p>
        </div>
      </div>
      <button class="remove-from-cart-btn" data-name="${item.name}" style="color: #000; transition: all 0.5s" onmouseover="this.style.color='red'" onmouseout="this.style.color='black'">
      Remover
      </button>
    </div>
    `
    total += item.price * item.quantity
    cartItemsContainer.appendChild(cartItemElement)
  })

  cartTotal.textContent = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  cartCount.innerHTML = cart.length
}

cartItemsContainer.addEventListener('click', function(event) {
  if(event.target.classList.contains('remove-from-cart-btn')) {
    const name = event.target.getAttribute('data-name')

    removeItemCart(name)
  }
})
//Função de Detalhes
menu.addEventListener('click', function(event) {
  let parentButton = event.target.closest('.more-info')

  if(parentButton) {
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))
    const image = parentButton.getAttribute("data-image")
    const description = parentButton.getAttribute("data-description")
  }
})

moreInfo.addEventListener('click', function() {
  infoModal.style.display = "flex"
})

//Função de remover item do carrinho
function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name)

  if(index !== -1) {
    const item = cart[index]

    if(item.quantity > 1) {
      item.quantity -= 1
      updateCartModal()
      return
    }

    cart.splice(index, 1)
    updateCartModal()
  }
}

addressInput.addEventListener('input', function(event) {
  let inputValue = event.target.value 

  if(inputValue !== '') {
    addressInput.classList.remove('border-red-500')
    addressWarn.classList.add('hidden')
  }

})
// Verificar a hora e manupular o card de horario
function checkRestaurantOpen() {
  const data = new Date()
  const hora = data.getHours()
  return hora >= 18 && hora <22
}

const spanItem = document.getElementById('date-span')
const isOpen = checkRestaurantOpen()

if(isOpen) {
  spanItem.classList.remove('bg-red-500')
  spanItem.classList.add('bg-green-600')
} else {
  spanItem.classList.remove('bg-green-600')
  spanItem.classList.add('bg-red-500')
}
//Finalizar pedido
checkoutBtn.addEventListener('click', function() {

  const isOpen = checkRestaurantOpen()
  if(!isOpen){
    alert('Restaurante fechado no momento, confira os horários de funcionamento.')
    return
  }

  //Enviar o pedido para API do WhatsApp
  const cartItems = cart.map((item) => {
    return(
      `*(${item.quantity})* - *${item.name}* Preço: R$ ${item.price} | 
`
    )
  }).join("")

/*   const msg = encodeURIComponent(cartItems) */

  const msg2 = encodeURIComponent(`${cartItems}
  
  Endereço: ${addressInput.value}
  Total do pedido: ${cartTotal.textContent}`)

  const phone = '27997215329'

  window.open(`https://wa.me/${phone}?text=${msg2}`, "_blank")

  if(cart.length === 0) return;
  if(addressInput.value === "") {
    addressWarn.classList.remove('hidden')
    addressInput.classList.add('border-red-500')
    return
  }
})