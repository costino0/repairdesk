const requestForm = document.querySelector('#request-form')
const cancelFormBtn = document.querySelector('#cancel-form-btn')
const submitFormBtn = document.querySelector('#submit-form-btn')
const addRepairBtn = document.querySelector('#add-repair-btn')
const formError = document.querySelector('#form-error')

const name = document.querySelector('#name')
const model = document.querySelector('#model')
const problem = document.querySelector('#problem')

const localRepairs = localStorage.getItem('repairs')
const repairs = JSON.parse(localRepairs) || []

let id = Number(localStorage.getItem('id')) || 1

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