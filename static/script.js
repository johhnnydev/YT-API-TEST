document.querySelector("#form").addEventListener('submit', function(e){
    e.preventDefault();
    let link = document.querySelector("#yt-link").value;
    get('/list/', link.slice(38));
});

function get(url, data){
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", function(){
        // console.log(this.responseText);
        let json_res = JSON.parse(this.responseText);
        // console.log(json_res.items);
        // let items = json_res.items
        json_res.items.forEach(item => {
            document.querySelector("#playlist").innerHTML += `
            <section class="playlist-item">
                <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}" class="item-thumbnail">
                <div class="item-texts">
                    <h2 class="item-title">${item.snippet.title}</h2>
                    <p class="item-description">${item.snippet.description}</p>
                    <a href="https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}">watch here >>></a>
                </div>
            </section>
            `
        });
    });
    xhr.open("GET", url+data)
    xhr.send();
}