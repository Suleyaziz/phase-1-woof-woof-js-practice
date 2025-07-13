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
  /*
document.addEventListener('DOMContentLoaded',()=>{
    fetch("http://localhost:3000/pups").then(response => response.json()).then(data =>{
        const dogDiv = document.getElementById('dog-bar');
        data.forEach(dog =>{
            const span = document.createElement('span');
            span.innerHTML= `
            <span>${dog.name}</span>`;
            dogDiv.appendChild(span);
            span.addEventListener('click',()=>{
                const dogInfoDiv= document.getElementById('dog-info');
                const image = dog.image;
                const name= dog.name;
                const dogStatus = dog.isGoodDog;

                dogInfoDiv.innerHTML=`
                <img src="${image}" />
                 <h2>${name}</h2>
                <button id="dogBtn">${dogStatus ? 'Good Dog!': 'Bad Dog'}</button>
                
                `
                dogInfoDiv.append;
                const button = document.getElementById('dogBtn');
                
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
                    });

                })

            })

        

        })
    })
})

*/
window.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');// gets tags from the html file
    const dogInfo = document.getElementById('dog-info');
    const filterBtn = document.getElementById('good-dog-filter');
    let filterOn = false;//ON:true OFF:false for filtering
    let allDogs = []; // Store all dogs for filtering

    // Function to render dogs in the dog bar
    function renderDogs(dogs) {
        dogBar.innerHTML=``;//this prevents creation of multiple spans when filterBtn is clicked(empties the div)
        dogs.forEach(dog => {
            const span = document.createElement("span");// creates an element
            span.textContent = dog.name;//puts name of dog
            dogBar.appendChild(span);// updates the index.html
            
            span.addEventListener('click', () => {//when you click span
                displayDogInfo(dog);//shows dog info
            });
        });
    }

    // Function to display dog info
    function displayDogInfo(dog) {
        dogInfo.innerHTML = `
            <img src=${dog.image} width="200px"/>
            <h2>${dog.name}</h2>
            <button id="dog-btn">${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>`;
    
        const button = document.getElementById('dog-btn');//takes the created button
        
        button.addEventListener('click', (e) => {//when clicked
            e.preventDefault();// prevents page refresh on click
            const newStatus = !dog.isGoodDog;// inverse the original boolean
            
            button.textContent = newStatus ? 'Good Dog!' : 'Bad Dog!';//conditional for if true or false
            
            fetch(`http://localhost:3000/pups/${dog.id}`, {//fetches pups' id
                method: 'PATCH',//http verb
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    isGoodDog: newStatus// patching to new dog status
                })
            })
            .then(response => response.json())
            .then(updatedDog => {
                // Update the dog in our allDogs array
                const index = allDogs.findIndex(d => d.id === dog.id);//this checks if the local array and pups are on the same index
                allDogs[index] = updatedDog;    // then updates accordingly                    
                dog.isGoodDog = updatedDog.isGoodDog;//updates original dog status to new dog status
                
                // renders good dogs if filter is on
                if (filterOn) {
                    renderDogs(allDogs.filter(dog => dog.isGoodDog));
                }
            });
        });
    }
 // Filter button event listener
    filterBtn.addEventListener('click', () => {//when clicked
        filterOn = !filterOn; //changes boolean value
        filterBtn.textContent = `Filter good dogs: ${filterOn ? 'ON' : 'OFF'}`;//returns under a condition
        
        if (filterOn) {//if the vaule is true
           return  renderDogs(allDogs.filter(dog => dog.isGoodDog));// only the good dogs
        } else {
           return  renderDogs(allDogs);
        }
    });
    // Initial fetch of all dogs
    fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(data => {
            allDogs = data;// declares "data" argument to the local dogs array
            renderDogs(allDogs);//renders alldogs
        })
        .catch(error => console.error('Fetch error:', error));//for any error

   
});