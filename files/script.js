// Get TimeString 
function getTimestring(time) {
    const hour = parseInt(time / 3600)
    let remainingSecond = time % 3600
    const minute = parseInt(remainingSecond / 60)
    remainingSecond = remainingSecond % 60

    return `${hour > 0 ? hour + ' hrs ': ''}` + `${minute > 0 ? minute + ' min ': ''}` + `${remainingSecond} sec ago`
}

// load Sorted Category 
function loadSortedCategory(id) {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => displayVideos(data.category))
    .catch(error => console.log(error))
    // alert(id)
}

// Load , fetch Categories and show them in html

//load categories from api 
function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
    
}

// display categories 
function displayCategories(categories){
    let categoryContainer = document.getElementById('catetories')
    for (const category of categories) {
        // create button 
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
            <button onclick='loadSortedCategory(${category.category_id})' class='bg-slate-300 py-2 px-3 rounded-md'>${category.category}</button>`
        // append button to show in html 
        categoryContainer.append(buttonContainer);
    }
}

// Load , fetch Videos and show them in html

//load Videos from api 
function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    // .then(data => console.log(data.videos))
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
    
}
 
function displayVideos(videos){
    let videoContainer = document.getElementById('videos')
    // console.log(videos);
    // make videoContainer empty first else item will be appending one after another instead of showing specific category while sorting 
    videoContainer.innerHTML = ""

    // validate if any content found 
    if(videos.length == 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
          <div class='flex justify-center items-center flex-col mt-16'>
            <img src="./assets/Icon.png" />
        
            <h2>Nothing Found </h2>
          </div>
        `
        return
    }


    for (const video of videos) {
        // create card 
        const card = document.createElement('div')
        card.setAttribute('class','card card-compact')
        card.innerHTML = `
             <figure class="h-[200px] relative">
                <img class="h-full w-full object-cover"
                src=${video.thumbnail}
                alt="Shoes" />

                ${video.others.posted_date.length == 0 ? '' : `<span class="absolute right-2 bottom-2 bg-slate-900 text-white py-1 px-2 rounded text-[10px]">${getTimestring(video.others.posted_date)} </span>`}

                
            </figure>
            <div class="px-0 py-2 flex gap-5">
                <div>
                    <img src="${video.authors[0].profile_picture}" class="w-10 h-10 rounded-full object-cover" />
                </div>
                <div>
                    <h3 class="font-bold text-xl text-slate-600">${video.title}</h3>
                    <div class="flex gap-2 items-center">
                        <p class="text-lg text-slate-500">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" />` : ""}
                    </div>
                    <p class="text-lg text-slate-500">${video.others.views} views</p>
                </div>
            </div>
        `

        // append button to show in html 
        videoContainer.append(card);
    }
}


// function calls 
loadCategories()
loadVideos()