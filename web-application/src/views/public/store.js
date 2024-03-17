async function loadAllStores() {
    const page = document.getElementById("stores-page")
    const errorSection = document.getElementById("errorSection")
    page.innerText = ""

    const h1 = document.createElement('h1')
    h1.innerText = "All Stores"
    page.appendChild(h1)

    try {
        const response = await Get("api/stores")
        if (response.errors) {
            HandleErrors(data.errors, errorSection)
            page.appendChild(errorSection)
            return;
        }
        const stores = response.stores


        for (const store of stores) {

            const card = document.createElement('div')
            card.classList.add('card')

            const cardContent = document.createElement('div')
            cardContent.classList.add('cardContent')

            const storeName = document.createElement('p')
            storeName.classList.add('title')
            storeName.innerText = store.name

            storeName.addEventListener('click', (event) => {
                event.preventDefault()
                const uri = "/posts/" + store.name
                newPage(uri)
            })

            cardContent.appendChild(storeName)
            card.appendChild(cardContent)
            page.appendChild(card)
        }

    } catch (error) {
        page.appendChild(errorSection)
    }

}