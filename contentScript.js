function modifyPage() {
  const clearModal = ()=>{
    document.querySelector(".history-modal")?.remove()
    document.querySelector(".float-btn")?.remove()
  }

  const createModal = (articles) => {
    clearModal()
    const ul = document.createElement("ul")
    ul.classList.add("modal-history-ul")

    articles.forEach((v, i) => {
      const li = document.createElement("li")
      li.innerText = v.innerText?.trim()
      li.dataset.index = i
      li.classList.add("modal-history-article")
      li.addEventListener("click", () => {
        v.scrollIntoView({ behavior: "smooth", block: "center" })
        modal.style.display = "none"
      })

      ul.appendChild(li)
    })
    const modal = document.createElement("div")
    modal.classList.add("history-modal")
    modal.innerHTML = `
          <div class="history-modal-content">
            <span class="close-hsitory-modal">&times;</span>
            <p class="m-question">My questions</p>
          </div>
        `
    document.body.appendChild(modal)
    modal.querySelector(".history-modal-content").appendChild(ul)

    const floatBtn = document.createElement("button")
    floatBtn.innerHTML = `<img src="https://i.imgur.com/g9Whqwx.png" alt="Button"/>`
    floatBtn.classList.add("float-btn")
    document.body.appendChild(floatBtn)

    floatBtn.addEventListener("click", () => {
      modal.style.display = "flex"
    })

    const closeBtn = modal.querySelector(".close-hsitory-modal")
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none"
    })

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  }

  // Функция для проверки наличия articles
  let visibleButton = false
  const checkArticles = () => {
    const articles = document.querySelectorAll("[data-message-author-role=user]")
    if (articles.length > 0) {
    //   console.log("articles.length", articles)
    visibleButton = true
      createModal(articles)
    }
    else{
        clearModal()
    }
  }

  setTimeout(checkArticles, 3000)
  const mainElement = document.querySelector("main.transition-width")
  const observer = new MutationObserver((mutations) => {
    let empty = true
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE && (node.querySelector("h5") != null || node?.classList?.contains('whitespace-pre-wrap'))) {
                    setTimeout(checkArticles, 1000)
                    empty = false
                }
                else{
                    if(empty && visibleButton && location.pathname == "/"){
                        clearModal()
                    }
                }
            });
        }
    }
  })
  observer.observe(mainElement, {
    childList: true,
    subtree: true,
  })
}
const style = document.createElement("style")
style.textContent = `
  .history-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
  }

  .history-modal-content {
    background-color: #2d2b33;
    padding: 20px;
    border-radius: 10px;
    max-height:500px;
    overflow:auto;
    width: 500px;
    position: relative;
  }

  .modal-history-ul{
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
    .m-question{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-block: 8px;
    }

  .modal-history-article{
    display: -webkit-box;
     -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    background: #414141;
    border-radius: 10px;
    padding: 6px 10px;
    cursor:pointer;
  }
  .modal-history-article:hover{
    background: #575656;
    
  }
  
  .close-hsitory-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 18px;
  }

  .float-btn {
    position: fixed;
    bottom: 87px;
    right: 25px;
    padding: 5px;
    background-color: rgb(65 65 74);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
  }
`
document.head.appendChild(style)
modifyPage()
