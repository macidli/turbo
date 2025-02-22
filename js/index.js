const content = document.getElementById('content')
const marka = document.getElementById('marka')
const city = document.getElementById('city')
const banType = document.getElementById('banType')
const yearMin = document.getElementById('yearMin')
const yearMax = document.getElementById('yearMax')
const btnArtir = document.getElementById('btnArtir')
const error = document.getElementById('error')
const select = document.querySelectorAll('#selects select')



let markaArr = [...(new Set(data.map(item => { return item.brand })))]
let modelArr = [...(new Set(data.map (item => {return item.model})))]
let cityArr = [...(new Set(data.map(item => { return item.city })))]
let banTypeArr = [...(new Set(data.map(item => { return item.banType })))]

let count = 8
function show() {
    content.innerHTML = ''
    if (data.length > 0) {
        data
            .slice(0, count)
            .map((item, i) => {
                content.innerHTML += `
                       <article class="flex flex-col dark:bg-gray-50">
                            <div class="relative">
                               <img alt="car" class="object-cover rounded-tl-[8px] rounded-tr-[8px] w-full h-52 rounded-t-lg" src="${item.images[0]}" />

                                    <i style="color:white" class="fa-regular fa-heart absolute right-2 top-2 text-[22px] cursor-pointer"></i>
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

function filtr(axtar, select) {
    count = 8
    btnArtir.style.display = 'flex'
    const yeniArr = copyData.filter(item => item[axtar] == select.value)
    data = yeniArr
    show()
}


 function artir(){
    if(count < data.length ) {
        count += 8
        if( count > data.length) btnArtir.style.display='none'  
        show()
    }

 }

 
 function etrafliAxtaris() {
    const marka = select[0].value
    const model = select[1].value
    const city = select[2].value
    const yeniArr = copyData.filter(item =>
        item.brand == marka && item.model == model && item.city == city
    )
    data = yeniArr
    show()
}