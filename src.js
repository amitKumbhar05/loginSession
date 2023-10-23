import axios from "axios"

const username = document.querySelector('.usern')
const password = document.querySelector('.pass')
const signup = document.querySelector('#btnsg')

signup.addEventListener('click',(e)=>{
    e.preventDefault()
    axios.post('http://localhost:4000/signup',
    {
        username:username.value,
        password:password.value
    }).then((res)=>{
        if(res.data=='ok')
        {
            alert('user added sucessfully!!')
            username.value=''
            password.value=''
        }
        else
        {
            alert("error user not added!!")
        }
    }).catch((error)=>{
        console.error(error);
    })
})