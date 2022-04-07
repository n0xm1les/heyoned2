const imla_wrp = document.getElementById("imla-wrp");

const noktalama_wrp = document.getElementById("noktalama-wrp");

const temel_wrapper = document.getElementById("temel-wrapper")
temel_wrapper.innerHTML = " "

const okuduklarim_wrapper = document.getElementById("okuduklarim-wrapper")
okuduklarim_wrapper.innerHTML = " "

const siirler_wrp = document.getElementById("siirler-wrp") 

const alintilar_wrp = document.getElementById("alintilar-wrp")

const see_all_card_wrp = document.getElementById("see-all-card-wrapper")

see_all_card_wrp.style.display = "none"
see_all_card_wrp.innerHTML = " "

function generate_card(card_list, card_wrapper) {
    for (let index = 0; index < card_list.length; index++) {
        create_card(card_wrapper, card_list[index]["title"], card_list[index]["content"])
    }    
}

function create_card(card_wrapper, title="Hello World!", content="Hello World!") {
    let card, card_header, card_body, card_footer, p, h2, i
    card = document.createElement("div")
    card.className = "card"

    card_header = document.createElement("div")
    card_header.className = "card-header"
    h2 = document.createElement("h2")
    h2.className = "card-title"
    h2.textContent = title
    card_header.append(h2)

    card_body = document.createElement("div")
    card_body.className = "card-body"
    p = document.createElement("p")
    p.className = "card-content"
    p.textContent = content
    card_body.append(p)

    card.append(card_header)
    card.append(card_body)
    card.addEventListener("click", e => {
        let clonedCard
        if (e.target.className == "card-content" || e.target.className == "card-title") {
             clonedCard = e.target.parentElement.parentElement.cloneNode(true)
        } else if (e.target.className == "card") {
            clonedCard = e.target.cloneNode(true)
        } else {
            clonedCard = e.target.parentElement.cloneNode(true)
        }

        see_all_card_wrp.innerHTML = " "
        see_all_card_wrp.style.display = "flex"
        see_all_card_wrp.append(clonedCard)
        see_all_card_wrp.addEventListener("click", e => {
            see_all_card_wrp.style.display = "none"
        })
    })
    card_wrapper.append(card)
}

const tmn_gstr_btns = document.getElementsByClassName("section-divider-button")

for (const key in tmn_gstr_btns) {
    if (Object.hasOwnProperty.call(tmn_gstr_btns, key)) {
        const element = tmn_gstr_btns[key];
        element.addEventListener("click", e => {
            e.preventDefault()
            let book_wrp = e.target.parentElement.parentElement.querySelector(".book-wrp")
            book_wrp.style.height = "fit-content"
        })
    }
}

function generate_book_card(book_list, book_wrp) {
    for (let index = 0; index < book_list.length; index++) {
        create_book_card(book_wrp, book_list[index]["title"], book_list[index]["img"], book_list[index]["writer"], book_list[index]["details"])
    }
}

function create_book_card(wrapper, title, img, writer, details) {
    let book_card, cover, book_details, book_title, book_description, book_writer

    book_card = document.createElement("div")
    book_card.className = "book-card"

    cover = document.createElement("img")
    cover.src = img

    book_details = document.createElement("div")
    book_details.className = "book-details"

    book_title = document.createElement("h2")
    book_title.className = "book-title"
    book_title.textContent = title

    book_description = document.createElement("p")
    book_description.className = "book-description"
    book_description.textContent = details

    book_writer = document.createElement("h3")
    book_writer.className = "book-writer"
    book_writer.textContent = writer

    book_details.append(book_title)
    book_details.append(book_description)
    book_details.append(book_writer)

    book_card.append(cover)
    book_card.append(book_details)

    wrapper.append(book_card)
}

function generate_quote(wrapper, quote_list, whc_page=1) {
    let quote_selector, page, quote_card, quote_parent, quote, quote_text, quote_writer
    quote_selector = wrapper.querySelector(".quote-selector")
    quote_selector.innerHTML = ""
    for (let index = 0; index < quote_list.length; index++) {
        page = document.createElement("div")
        page.className = "page"
        if (index == whc_page-1) {
            page.classList.add("selected")
        }
        page.textContent = index + 1
        page.addEventListener("click", e => {
            let selected_page = quote_selector.querySelector(".page.selected")
            selected_page.classList.remove("selected")
            e.target.classList.add("selected")
            console.log(e.target)
            generate_quote(wrapper, quote_list, e.target.textContent)
        })

        quote_selector.append(page)
    }

    quote_card = wrapper.querySelector(".quote-card")
    quote_card.innerHTML = ""
    quote_parent = quote_list[whc_page-1]
    for (let index = 0; index < quote_parent.length; index++) {
        quote = document.createElement("div")
        quote.className = "quote"
        quote_text = document.createElement("p")
        quote_text.className = "quote-text"
        quote_text.textContent = quote_parent[index]["quote"]
        quote_writer = document.createElement("em")
        quote_writer.className = "quote-writer"
        quote_writer.textContent = quote_parent[index]["author"]
        quote.append(quote_text)
        quote.append(quote_writer)
        quote_card.append(quote)
    }
    
}

function main() {
    generate_card(imla_kurallari, imla_wrp)
    generate_card(noktalama_isaretleri, noktalama_wrp)
    generate_book_card(yuz_temel_eser, temel_wrapper)
    generate_book_card(okuduklarim, okuduklarim_wrapper)
    generate_quote(siirler_wrp, siirler)
    generate_quote(alintilar_wrp, alintilar)
}

main()