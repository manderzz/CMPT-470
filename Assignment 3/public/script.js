
function DeleteRectangle(id, contents){
  $.ajax({
    method: 'delete',
    url: '/delete_rectangle' + id,
    success: function() {
      contents.parentNode.parentNode.removeChild(contents.parentNode);
   }
  });
}
