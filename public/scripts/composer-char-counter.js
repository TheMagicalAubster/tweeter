
//starting with the document.ready with the simple syntax
$(() => {
  const $textarea = jQuery('#tweet-text');
  
  $textarea.on('input', function() {
    const $input = $(this);
    const value = $input.val();
    
    const $counter = jQuery('output.counter', $input.parents('form'));

    let charCount = 140 - value.length;
    
    if ((charCount) < 0) {
      $counter.text(charCount).css('color', 'red');
    } else {
      $counter.text(charCount).css('color', 'black');
    }
    $counter.text(charCount);

  });

});
