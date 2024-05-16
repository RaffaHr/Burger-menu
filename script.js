const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const infoModal = document.getElementById('info-modal')
const infoItems = document.getElementById('info-items')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCount = document.getElementById('cart-count')

const addressInput = document.getElementById('address')
const houseNumber = document.getElementById('house-number')
const cepInput = document.getElementById('cep')
const neighborhood = document.getElementById('neighborhood')
const city = document.getElementById('city')
const state = document.getElementById('state')

const contact = document.getElementById('contact')
const addressWarn = document.getElementById('address-warn')
const empyCart = document.getElementById('empy-cart')
const cepWarn = document.getElementById('cepWarn')

const goToAddrressPageBtn = document.getElementById('go-to-addrress-page')

const cartItemsPage = document.getElementById('items-cart-page')
const addrresPage = document.getElementById('addrresPage')
const backCheckoutPage = document.getElementById('back-to-checkoutPage-btn')

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
  cepWarn.classList.add('hidden')
  document.body.style.overflow = '';
}
})
// Fechar o modal do carrinho
closeModalBtn.addEventListener('click', function() {
  cartModal.style.display = 'none'
  empyCart.classList.add('hidden')
  cepWarn.classList.add('hidden')
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
    <div class="flex flex-col w-full">
  
      <div>
        <p class="font-bold w-full text-center">${item.name}</p>
      </div>
  
      <div class="flex flex-row justify-around">
          <div class="flex items-center justify-center">
          <img src="${item.image}" class="rounded-md hover:scale-110 duration-300" style="width: 60px; height: 60px; min-width: 60px">
          </div>
          <div class="flex flex-col justify-evenly items-center" style="margin: 0 15px">
            <p class="flex justify-center m-0">Quantidade: ${item.quantity}</p>
            <p class="font-medium m-0">R$ ${item.price.toFixed(2)}</p>
          </div>
          <div class=" flex items-center">
            <button class="remove-from-cart-btn" data-name="${item.name}" style="color: #000; transition: all 0.5s" onmouseover="this.style.color='red'" onmouseout="this.style.color='black'">
              Remover
              </button>
          </div>
      </div>
    </div>
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
cepInput.addEventListener('input', function(event) {
  let inputValue = event.target.value 

  if(inputValue !== '') {
    cepInput.classList.remove('border-red-500')
    addressWarn.classList.add('hidden')
    cepWarn.classList.add('hidden')
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

    //Saudação com base no horário
    let saudacao = ``
    const data = new Date()
    const hora = data.getHours()
  
    if(hora <= 11) {
      saudacao = `Olá, bom dia, gostaria de fazer um pedido!
      `
    } else if (hora >= 12 && hora < 17) {
      saudacao = `Olá, boa tarde, gostaria de fazer um pedido!
      `
    } else if (hora >= 18) {
      saudacao = `Olá, boa noite, gostaria de fazer um pedido!
      `
    }
  const cartItems = cart.map((item) => {
    return(
      `*(${item.quantity})* - *${item.name}* Preço: R$ ${item.price} | 
`
    )
  }).join("")

  if(contact.value === '') {
    contact.value = 'Não informado'
  }

  const msg = encodeURIComponent(
`${saudacao}
Pedido:

${cartItems}

Endereço: ${addressInput.value}, ${houseNumber.value}, ${neighborhood.value} - CEP ${cepInput.value} - ${city.value} - ${state.value}
Telefone para contato: ${contact.value}
Total do pedido: *${cartTotal.textContent}*`)

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
  } else if (cepInput.value === '') {
    cepInput.classList.add('border-red-500')
    addressWarn.classList.remove('hidden')
  } else {
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank")
  }
})

//Validação do input de CEP
cepInput.addEventListener('keypress', (e) => {
  const onlyNumbers = /[0-9]/
  const key = String.fromCharCode(e.keyCode)

//Somente numeros no input
if(!onlyNumbers.test(key)) {
  e.preventDefault();
  return;
}
})
//Get address event
cepInput.addEventListener("keyup", (e) => {

  const inputValue = e.target.value

  if(inputValue.length === 8) {
    getAddress(inputValue)
  }
})

//API pra pegar o endereço pelo CEP

const getAddress = async (cep) => {
  toggleLoader()

  cepInput.blur()

  const apiUrl = `https://viacep.com.br/ws/${cep}/json`

  const response = await fetch(apiUrl)

  const data = await response.json()

  //show error and reset form
  if(data.erro === true) {
    cepInput.value = null
    toggleLoader()
    //show msg
    cepWarn.classList.remove('hidden')
    return
  }
  //preenche os dados automatico nos inputs de acordo com o CEP
  addressInput.value = data.logradouro
  neighborhood.value = data.bairro
  city.value = data.localidade
  state.value = data.uf

  toggleLoader()
}

//Show or hide loader

const toggleLoader = () => {
  const fade = document.querySelector('#fade')
  const loader = document.querySelector('#loader')

  fade.classList.toggle('hide')
  loader.classList.toggle('hide')
}

//Second page checkout
goToAddrressPageBtn.addEventListener('click', function() {

  if(cart.length === 0) {
    empyCart.classList.remove('hidden')
    return
  }
  toggleLoader()

  // Exibir loader antes de mudar de aba
  setTimeout(() => {
    cartItemsPage.classList.add('hidden');
    toggleLoader();
    addrresPage.classList.remove('hidden');
  }, 250); // Tempo em milissegundos
});
backCheckoutPage.addEventListener('click', function() {
  toggleLoader()

    // Exibir loader antes de mudar de aba
    setTimeout(() => {
      cartItemsPage.classList.remove('hidden');
      toggleLoader();
      addrresPage.classList.add('hidden');
    }, 250); // Tempo em milissegundos
  });