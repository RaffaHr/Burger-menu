const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const moreInfo = document.querySelector('.more-info')
const infoModal = document.getElementById('info-modal')
const infoItems = document.getElementById('info-items')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCount = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const houseNumber = document.getElementById('house-number')
const cep = document.getElementById('cep')
const contact = document.getElementById('contact')
const addressWarn = document.getElementById('address-warn')
const empyCart = document.getElementById('empy-cart')

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
  empyCart.classList.add('hidden')
  document.body.style.overflow = '';
}
})
// Fechar o modal do carrinho
closeModalBtn.addEventListener('click', function() {
  cartModal.style.display = 'none'
  empyCart.classList.add('hidden')
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

// Abrir o modal de detalhes e pega as informações
menu.addEventListener('click', function(event) {
  let parentButtonInfo = event.target.closest('.more-info')

  const name = parentButtonInfo.getAttribute("data-name")
  const price = parseFloat(parentButtonInfo.getAttribute("data-price"))
  const image = parentButtonInfo.getAttribute("data-image")
  const description = parentButtonInfo.getAttribute("data-description")

  infoItems.innerHTML = ""

  //Constroi os elementos no modal de acordo com o item
  const infoModalElements = document.createElement('div')
  infoModalElements.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')
  infoModalElements.innerHTML = `
  <div>
  <h1 class="text-center font-bold text-2xl">${name}</h1>
</div>
<div class="flex justify-center items-center my-3">
  <img class="rounded-2xl hover:scale-110 duration-300" style="width: 120px; height: 120px;" src="${image}" alt="${name}">
</div>
<div class="text-center my-5">
  <span class="font-medium">Descrição:</span>
</div>
<div class="flex justify-center items-center flex-wrap h-full">
  <p class="text-justify text-sm"  style="width: 90%;">${description}</p>
</div>
<div class="flex justify-between items-center mt-10">
  <button class="rounded-xl bg-red-600 p-2 add-to-cart-btn w-full hover:scale-105 duration-300" data-name="${name}" data-price="${price}" data-image="${image}"><i class="fa fa-cart-plus text-sm text-white md:mx-2"></i><span class="mx-2 text-white text-sm">Adicionar ao carrinho:</span><span class="md:mx-2 text-white text-sm">R$ ${price}</span></button>
</div>
  `

  infoItems.appendChild(infoModalElements)

  infoModal.style.display = "flex"

})

//Função do botao de acionar no carrinho dentro do modal de detalhes
infoModal.addEventListener('click', function(event) {
  let parentButton = event.target.closest('.add-to-cart-btn')
  if(parentButton) {
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))
    const image = parentButton.getAttribute("data-image")

    addToCart(name,price,image)
  }
})
//Fecha o modal se clicar no botão fechar

infoModal.addEventListener('click', function(event) {
  let parentButtonCloseInfoBtn = event.target.closest('#close-modal-info')
  if(parentButtonCloseInfoBtn) {
    infoModal.style.display = "none"
    
  }
})

//Fechar o modal se clicar fora dele
infoModal.addEventListener('click', function(event) {
  if(event.target === infoModal) {
    infoModal.style.display = 'none'
    
  }
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

// Verificar a hora e manupular o card de horario
function checkRestaurantOpen() {
  const data = new Date()
  const hora = data.getHours()
  return hora >= 12 && hora <22
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
//Verificações dos inputs do cart
addressInput.addEventListener('input', function(event) {
  let inputValue = event.target.value 

  if(inputValue !== '') {
    addressInput.classList.remove('border-red-500')
    addressWarn.classList.add('hidden')
  }
})
houseNumber.addEventListener('input', function(event) {
  let inputValue = event.target.value 

  if(inputValue !== '') {
    houseNumber.classList.remove('border-red-500')
    addressWarn.classList.add('hidden')
  }
})
cep.addEventListener('input', function(event) {
  let inputValue = event.target.value 

  if(inputValue !== '') {
    cep.classList.remove('border-red-500')
    addressWarn.classList.add('hidden')
  }
})
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
  
  Endereço: ${addressInput.value}, ${houseNumber.value} - CEP ${cep.value}
  Telefone para contato: ${contact.value}
  Total do pedido: ${cartTotal.textContent}`)

  const phone = '27997215329'

  if(cart.length === 0) {
    empyCart.classList.remove('hidden')
    return
  }

  if(addressInput.value === '') {
    addressInput.classList.add('border-red-500')
    addressWarn.classList.remove('hidden')
  } else if (houseNumber.value ==='') {
    houseNumber.classList.add('border-red-500')
    addressWarn.classList.remove('hidden')
  } else if (cep.value === '') {
    cep.classList.add('border-red-500')
    addressWarn.classList.remove('hidden')
  } else {
    window.open(`https://wa.me/${phone}?text=${msg2}`, "_blank")
  }
})