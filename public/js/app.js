
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const tempMessage = document.querySelector('#temp');


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const searchlocation = search.value;

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    

    
fetch('/weather?search='+searchlocation).then((response)=>{
    response.json().then((data)=>{
        if(data.Error){
            messageOne.textContent = data.Error;
        }else{
            tempMessage.textContent = data.Temperature;
            messageOne.textContent = data.location;
            messageTwo.textContent = data.Forecast;
        }

        
    })
})
    
    
})