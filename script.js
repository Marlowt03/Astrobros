document.addEventListener('DOMContentLoaded', ()=>{
  // Deep-link anchor helper: after landing on a hash, nudge the page
  // further down to reveal more context above the anchored element.
  const extraOffset = 1000; // px

  function nudgeIfHash(){
    if(location.hash){
      setTimeout(()=>{ window.scrollBy({top: extraOffset, left: 0}); }, 0);
    }
  }

  // Handle on load
  nudgeIfHash();

  // Handle same-page anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', ()=>{
      setTimeout(()=>{ window.scrollBy({top: extraOffset, left: 0, behavior: 'smooth'}); }, 0);
    });
  });
});
