
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const tempMessage1 = document.querySelector('#temp1');
const tempMessage2 = document.querySelector('#temp2');
const tempMessage3 = document.querySelector('#temp3');



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const searchlocation = search.value;
    tempMessage1.textContent = '';
    tempMessage2.textContent = '';
    tempMessage3.textContent = '';
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    

    
fetch('/weather?search='+searchlocation).then((response)=>{
    response.json().then((data)=>{
        if(data.Error){
            messageOne.textContent = data.Error;
        }else{
            tempMessage1.textContent = data.Temperature;
            tempMessage2.textContent = data.HighTemperature;
            tempMessage3.textContent = data.LowTemperature;
            messageOne.textContent = data.location;
            messageTwo.textContent = data.Forecast;
        }

        
    })
})
    
    
})