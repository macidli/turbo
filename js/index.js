const content = document.getElementById('content')
const marka = document.getElementById('marka')
const city = document.getElementById('city')
const banType = document.getElementById('banType')
const yearMin = document.getElementById('yearMin')
const yearMax = document.getElementById('yearMax')
const btnArtir = document.getElementById('btnArtir')
const error = document.getElementById('error')
const sidebar = document.getElementById('sidebar')
let staus = document.getElementById('status')
const select = document.querySelectorAll('#selects select')
const likeDiv =document.getElementById('likeDiv')


let markaArr =Array.from(new Set( data.map (item => item.brand) )) 
let modelArr  =Array.from(new Set( data.map (item => item.model) )) 
let cityArr =Array.from(new Set( data.map (item => item.city) )) 
let banTypeArr =Array.from(new Set( data.map (item => item.banType) )) 

let count = 8
function show() {
    content.innerHTML = ''
    if (data.length > 0) {
        data
            .slice(0, count)
            .map((item, i) => {
                content.innerHTML += `
                        <article class="flex flex-col rounded-[7px] bg-white shadow-lg">
                            <div class="relative">
                                <img alt="car" class="max-h-[200px] h-52 object-cover rounded-tl-[8px] rounded-tr-[8px] w-full rounded-t-lg" 
                                    src="${item.images[0]}" />
                                <i onclick="addBasket(${item.id}, ${item.price}, '${item.model}', '${item.brand}', '${item.currency}', '${item.images[0]}', '${i}')"
                                class="fa-regular fa-heart absolute top-2 right-2 text-[22px] cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:text-red-500 bg-white p-2 rounded-full shadow-md z-20"
                                style="color:${item.status ? 'red' : 'gray'}">
                                </i>
                            </div>
                            <div class="flex flex-col flex-1 p-3">
                                <h3 class="flex-1 pt-2 pb-[2px] text-[18px] font-[700] leading-snug">${item.price} ${item.currency}</h3>
                                <span class="text-[16px] capitalize hover: dark:text-default-600">${item.brand} ${item.model}</span>
                                <span class="text-[16px] hover: dark:text-default-600">${item.year}, ${item.engine} L, ${item.odometer} ${item.odometerUnit}</span>
                                <div class="flex flex-wrap text-[14px] justify-between pt-1 space-x-2 text-sm text-gray-600">
                                    <span class="text-[#8d94ad]">${item.city}, ${item.dates}</span>
                                </div>
                            </div>
                        </article>
                        `
            })
    }else {
        btnArtir.style.display = 'none'
        error.innerHTML = `
            <section class="flex max-w-[400px] m-auto items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
                <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div class="max-w-md text-center">
                        <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400">
                            <span class="sr-only">Error</span>404
                        </h2>
                        <p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                        <p class="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
                        <a rel="noopener noreferrer" href="index.htm" class="px-8 py-3 font-semibold rounded dark:bg-red-600 dark:text-gray-50">Back to homepage</a>
                    </div>
                </div>
            </section>
        `
        
    }
}
 show()

 let basket =[]

 function addBasket(id, price, currency, brand, model, images) {
    const obj = { id, price, currency, brand, model, images, count: 1 };
    
    // Əgər həmin məhsul artıq basket içərisindədirsə, sayını artır
    const existingItem = basket.find(item => item.id === id);
    if (existingItem) {
        existingItem.count += 1;
    } else {
        basket.push(obj);
    }

    // Məhsulun statusunu dəyiş
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index].status = true;
    }

    show();
    showBasket();
}

 
 function showBasket() {
    likeDiv.innerHTML = '';
    basket.forEach((item, i) => {
        likeDiv.innerHTML += `
        <div class="border">
            <div class="flex justify-end">
                <i onclick="favDelete(${item.id})" class="fa-solid fa-xmark cursor-pointer"></i>
            </div>
            <div class="flex items-center p-2 space-x-4">
                <img src="${item.images}" alt="" class="w-[80px] h-[80px] rounded-full dark:bg-gray-500" />
                <div>
                    <h2 class="text-lg font-semibold">${item.brand} ${item.model}</h2>
                    <span class="flex items-center space-x-1">Say: ${item.count}</span>
                    <div class="text-[1em] text-black">${item.price} ${item.currency}</div>
                    <div class="flex flex-row">
                        <button onclick="changeCount(-1, ${i}, ${item.id})" class="px-1 bg-[#ca1016] text-white font-semibold w-[20px] h-[20px] mr-2 rounded">-</button>
                        <button onclick="changeCount(1, ${i}, ${item.id})" class="px-1 mx-2 text-white bg-[#7ed321] w-[20px] h-[20px] font-semibold rounded">+</button>
                    </div>
                </div>
            </div>
        </div>`;
    });
}


 function handleSelect() {
    markaArr.map(item => {
        marka.innerHTML += `<option>${item}</option>`
    })
    modelArr.map(item => {
        model.innerHTML += `<option>${item}</option>`
    })
    cityArr.map(item => {
        city.innerHTML += `<option>${item}</option>`
    })
    banTypeArr.map(item => {
        banType.innerHTML += `<option>${item}</option>`
    })
    for (let i = 2025; i >= 1905; i--) {
        yearMin.innerHTML += `<option>${i}</option>`
        yearMax.innerHTML += `<option>${i}</option>`
    }
}
handleSelect()


let flag =true;
function likeOpen(e){
e.preventDefault()
sidebar.style.right = flag ? '0%' : '-100%'
 flag =!flag
 
}

function deleteAll() {
    data.forEach(item => {
        item.status = false
    })
    basket.length = 0
    likeDiv.innerHTML = ''
    show()
}
function favDelete(id) {
    const yeniArr = basket.filter(item => item.id !== id)
    basket = yeniArr
    data.filter(item => { if (id == item.id) item.status = false })
    showBasket()
    show()
}
function changeCount(deyisen, index, id) {  
    basket.map((item, i) => {
        if (i == index) item.count += deyisen
        if (item.count == 0) {
            basket.splice(i, 1)
            data.filter(item => { if (id == item.id) item.status = false })
            show()
        }
    })
    showBasket()
}
function artir(){
    if(count < data.length ) {
        count += 8
        if( count > data.length) btnArtir.style.display='none'  
        show() // her defe show funk cagiririqqq!!!
    }
    
}

function filtr(axtar, select) {
    if(count > 8)btnArtir.style.display = 'flex'
    const yeniArr = copyData.filter(item => item[axtar] == select.value)
    data = yeniArr
    show()
}

function etrafliAxtaris(e) {
    e.preventDefault()
    const marka = select[0].value
    const model = select[1].value
    const city = select[2].value
    const yeniArr = copyData.filter(item =>
        item.brand == marka && item.model == model && item.city == city
    )
    data = yeniArr
    show()
    
}