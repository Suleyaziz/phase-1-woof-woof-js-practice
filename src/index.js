    /*
window.addEventListener('DOMContentLoaded',()=>{
    const dogBar =document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info')
    fetch('http://localhost:3000/pups').then(response=> response.json()).then(data=>{
      data.forEach(dogName=>{
        const name= dogName.name;
        console.log(name)
        const image = dogName.image;
       const dogStatus= dogName.isGoodDog

        const span= document.createElement("span");
        span.innerHTML=`
        <span>${name}</span>`;
        dogBar.appendChild(span);
       
        span.addEventListener('click',()=>{
            dogInfo.innerHTML =`
            <img src=${image} width="200px"/>
            <h2>${name}</h2>
            <button id="">${dogStatus ? 'Good Dog!': 'Bad Dog!'}</button>`

            const button = document.getElementById('good-or-bad');
            button.addEventListener('click', (e)=>{
                e.preventDefault();
                const newStatus = !dogName.isGoodDog;
                button.textContent = newStatus? 'Good Dog':'Bad Dog!';
                fetch(`http://localhost:3000/pups/${dogName.id}`,{
                    method: 'PATCH',
                    headers: {'Content-Type':'application/json'},
                    body : JSON.stringify({
                        isGoodDog :newStatus
                    })
                }).then(repsonse=>repsonse.json()).then(updateDog =>{
                    dogName.isGoodDog=updateDog.isGoodDog;
                })
            
            })
          body.appendChild(dogInfo)
            

        })
        

        })
         })
     });*/
   window.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');

    fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(data => {
         
            data.forEach(dog => {
                 const filterBtn= document.getElementById('good-dog-filter');
                   let filterOn = false;
           
            
                 filterBtn.addEventListener('click', () => {
        filterOn = !filterOn; // Toggle filter state
        filterBtn.textContent = `Filter good dogs: ${filterOn ? 'ON' : 'OFF'}`;
        
    
    });
                const span = document.createElement("span");
                span.textContent = dog.name; // Simpler than innerHTML for just text
                dogBar.appendChild(span);
                
                span.addEventListener('click', () => {

                    
                    dogInfo.innerHTML = `
                        <img src=${dog.image} width="200px"/>
                        <h2>${dog.name}</h2>
                        <button id="dog-btn">${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>`;
                
                    const button = document.getElementById('dog-btn');
                    
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        const newStatus = !dog.isGoodDog;//true or false
                        
                        // Optimistic UI update
                        button.textContent = newStatus ? 'Good Dog!' : 'Bad Dog!';//if true print good dog if false print bad dog
                        
                        fetch(`http://localhost:3000/pups/${dog.id}`, {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                isGoodDog: newStatus
                            })
                        })
                        .then(response => response.json())
                        .then(updatedDog => {
                            dog.isGoodDog = updatedDog.isGoodDog;
                        })
                       
                    });
                });
            });
        })
        .catch(error => console.error('Fetch error:', error));
});