function fetchData(api, data) {
  return $.ajax({
    dataType: "json",
    data: Object.assign({}, data, {ss: api.ss}),
    url: api.url+"?callback=?"
  })
  .fail(function(error) {
    console.log('Error', error);
  });
}
