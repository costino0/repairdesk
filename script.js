const requestForm = document.querySelector('#request-form')
const cancelFormBtn = document.querySelector('#cancel-form-btn')
const addRepairBtn = document.querySelector('#add-repair-btn')
const formError = document.querySelector('#form-error')
const requestsState = document.querySelector('#requests-state')

const name = document.querySelector('#name')
const model = document.querySelector('#model')
const problem = document.querySelector('#problem')

const requests = document.querySelector('#requests')

const localRepairs = localStorage.getItem('repairs')
let repairs = JSON.parse(localRepairs) || []

let id = Number(localStorage.getItem('id')) || 1

function renderRequests(array) {
    requests.innerHTML = ''

    array.forEach(repair => {
        const article = document.createElement('article')

        const title = document.createElement('h3')
        title.textContent = repair.name

        const modelEl = document.createElement('h4')
        modelEl.textContent = repair.model

        const problemEl = document.createElement('p')
        problemEl.textContent = repair.problem

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'

        deleteBtn.addEventListener('click', () => {
            const confirmed = confirm(`Delete the repair request for ${repair.name}`)

            if (confirmed) {
                repairs = repairs.filter(request => request.id !== repair.id)
                renderRequests(repairs)
                localStorage.setItem('repairs', JSON.stringify(repairs))
            }
        })

        article.append(title, modelEl, problemEl, deleteBtn)
        requests.append(article)
    })

    requestsState.textContent = repairs.length === 0 ? 'No repair requests yet' : `Requests: ${repairs.length}`
}

requestForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!name.value.trim() || !model.value.trim() || !problem.value.trim()) {
        formError.textContent = 'Please fill in all the fields'
        return
    }

    const repairObj = {
        id,
        name: name.value.trim(),
        model: model.value.trim(),
        problem: problem.value.trim()
    }

    id++
    requestForm.hidden = true
    formError.textContent = ''
    name.value = ''
    model.value = ''
    problem.value = ''

    repairs.push(repairObj)
    renderRequests(repairs)

    localStorage.setItem('repairs', JSON.stringify(repairs))
    localStorage.setItem('id', id)
})

addRepairBtn.addEventListener('click', () => {
    requestForm.hidden = false
})

cancelFormBtn.addEventListener('click', () => {
    requestForm.hidden = true

    formError.textContent = ''
    name.value = ''
    model.value = ''
    problem.value = ''
})

renderRequests(repairs)