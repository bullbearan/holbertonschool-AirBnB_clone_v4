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
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
