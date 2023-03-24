function getNASAImage() {
    const apiKey = 'MuujTnlZvnHUojydfgquyfWJAzyo8SH0c2Ng3dRc';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.url);
  }

function renderImage(url) {
   const root = document.querySelector('#root');
   const img = document.createElement('img');
   img.src = url;
   root.appendChild(img);
}

function render(url) {
    const root = document.querySelector('#root');
    root.innerHTML = '';
    const img = document.createElement('img');
    img.src = url;
    root.appendChild(img);
  }
  
  getNASAImage().then(render);