const requestForm = document.querySelector('#request-form')
const cancelFormBtn = document.querySelector('#cancel-form-btn')
const submitFormBtn = document.querySelector('#submit-form-btn')
const addRepairBtn = document.querySelector('#add-repair-btn')
const formError = document.querySelector('#form-error')

requestForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.querySelector('#name')
    const model = document.querySelector('#model')
    const problem = document.querySelector('#problem')

    if (!name.value.trim() || !model.value.trim() || !problem.value.trim()) {
        formError.textContent = 'Please fill in all the fields'
    } else {
        requestForm.hidden = true
        formError.textContent = ''
        
        name.value = ''
        model.value = ''
        problem.value = ''
    }
})

addRepairBtn.addEventListener('click', () => {
    requestForm.hidden = false
})

cancelFormBtn.addEventListener('click', () => {
    requestForm.hidden = true
})