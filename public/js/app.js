const form=document.querySelector('form')
const search=document.querySelector('input')
const one=document.querySelector('#One')
const two=document.querySelector('#Two')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const city=search.value
    one.textContent='loading...'
    two.textContent=''
    fetch('http://localhost:3000/weather?city='+city).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            one.textContent=data.error
        }
        else {
            one.textContent=data.location
            two.textContent=data.description+'. it is currentlly '+data.temp
            
        }
    })
})
    

})