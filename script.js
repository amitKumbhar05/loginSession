import axios from "axios";
import Swal from 'sweetalert2'


const username = document.querySelector('.username')
const password = document.querySelector('.password')
const submit = document.querySelector('#btnlg')
const login = document.querySelector('#login')
const user = document.querySelector('#user')
const logout = document.querySelector('#btnlo')
axios.defaults.withCredentials=true

logout.style.display = 'none';
user.style.display='none';
// user.style.display='block';

axios.get('http://localhost:4000/login').then((res)=>{
    // console.log(res.data);
    if(res.data.logged)
    {
        login.innerText = res.data.user.username
        user.style.display='block';
        logout.style.display = 'block';
        submit.style.display = 'none';
    }
    
})

submit.addEventListener('click',(e)=>{
    e.preventDefault()
    // const uri = `?username=${encodeURIComponent(username.value)}&password=${encodeURIComponent(password.value)}`
    // `http://localhost:4000/login${uri}`
    axios.post('http://localhost:4000/login',{
        username:username.value,
        password:password.value
    })
    .then((res)=>{
        login.innerText= (res.data.username || res.data)
        if(res.data?.username==username.value)
        {
            Swal.fire(
                "Sucess",
                "Logged In",
                "success"
            )
            user.style.display='block';
            logout.style.display = 'block';
            submit.style.display = 'none';

        }
        else{
            user.style.display='none';
        }
    }).catch((error)=>{
        console.log('fetching error',error);
    })
})

logout.addEventListener('click',(e)=>{
    e.preventDefault();
    login.innerText = 'please login'
    logout.style.display = 'none';
    submit.style.display = 'block';
    user.style.display='none';      
    axios.get('http://localhost:4000/logout').then((res)=>{
        if(res.status==200)
        {
            console.log('logout sucessfully');
        }
    })
})