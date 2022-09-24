$(document).ready(() => {
  const clickedAmenities = {};
  $('input').click(function () {
    if ($(this).is(':checked')) {
      clickedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).is(':checked')) {
      delete clickedAmenities[$(this).attr('data-id')];
    }
    const displayAmenities = [];
    for (const amenity in clickedAmenities) {
      displayAmenities.push(clickedAmenities[amenity]);
    }
    $('.amenities h4').text(displayAmenities.join(', '));
  });
  $('button').click(function () {
    $('section.places article').remove();
    filterAmenity(Object.keys(clickedAmenities));
  });
  function filterAmenity (amenities = {}) {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: amenities }),
      dataType: 'json',
      contentType: 'application/json'
    })
      .done(function (places) {
        places.forEach(place => {
          $(`<article>
                    <div class='title_box'>
                        <h2>${place.name}</h2>
                        <div class='price_by_night'>$${place.price_by_night}</div>
                    </div>
                    <div class='information'>
                        <div class='max_guest'>${place.max_guest}</div>
                        <div class='number_rooms'>${place.number_rooms} </div>
                        <div class='number_bathrooms'>${place.number_bathrooms} </div>
                    </div>
                    <div class='description'>
                        ${place.description}
                    </div>
                </article>`).appendTo('section.places');
        });
      });
  }

  $.get('http://127.0.0.1:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
