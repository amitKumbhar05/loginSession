import axios from "axios"

import Swal from 'sweetalert2'



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
            Swal.fire(
                'Sucess',
                'User Added Sucessfully!!',
                'success'
            )
            username.value=''
            password.value=''
        }
        else
        {
            Swal.fire(
                'Not Good!',
                'User Not Added',
                'error'
            )
        }
    }).catch((error)=>{
        console.error(error);
    })
})