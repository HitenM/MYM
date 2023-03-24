const apiKey = 'MuujTnlZvnHUojydfgquyfWJAzyo8SH0c2Ng3dRc';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

$(document).ready(function() {
  $('#okBtn').on('click', function() {
    // Make a request to NASA's API
    $.ajax({
      url: apiUrl,
      success: function(data) {
        // Display the image on the page and hide the "OK" button
        $('#imageContainer').html(`<img src="${data.url}" alt="${data.title}">`);
        $('#okBtn').hide();
      },
      error: function() {
        alert('An error occurred while fetching the image.');
      }
    });
  });
});
