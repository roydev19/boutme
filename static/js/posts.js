// fetching data from data.space berowra app and show it on your html page (just like small slow blog😅)
const mainUrl = `https://berowra.mizuhara.deta.app/api`;

// Fetching main key for do second fetch
fetch(`${mainUrl}/collections`)
    .then( keys => keys.json())
    .then( collect => {
        const url = `${mainUrl}/collection/${collect[0].key}`;
        getContent(url);
    });

const getContent = (url) => {
    fetch(url)
        .then( res => res.json())
        .then( data => {
        // Fetching 2nd key for do third fetch
        let content = `${mainUrl}/content/${data.items[0].key}`;
        getPosts(content);
        });
}

const getPosts = (content) => {
    fetch(content)
        .then( r => r.json())
        .then( a => {
            let content = Object.keys( a.content);
            const loading = document.getElementById('loading');
            loading.style='display:none';
            for ( let i = 0 ; i < content.length ; i++){
              const posts = document.getElementById('posts');
              let post = document.createElement("div");
              post.className = "post";
              let title = document.createElement('h2');
              let postContent =  document.createElement('p');
              let hr = document.createElement('hr');
              title.innerHTML = a.content[content[i]].title ;
              postContent.innerHTML = a.content[content[i]].value ;
              post.appendChild(title);
              post.appendChild(hr);
              post.appendChild(postContent);
              posts.appendChild(post);
            }
    });
}