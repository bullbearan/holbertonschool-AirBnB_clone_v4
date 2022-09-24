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
});
