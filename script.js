const tagsEl = document.getElementById('tags');
const textArea = document.getElementById('textarea');

textArea.focus();

// Event listener for keyup event in the textarea
textArea.addEventListener('keyup',(e)=> {
  // Call createTags function to update tags based on input value
  createTags(e.target.value)

  if(e.key === 'Enter'){
    // Clear the textarea after a short delay
   setTimeout(() => {
    e.target.value = '';
   }, 10);
    
    // Call randomSelect function to initiate tag highlighting
    randomSelect();
  }
})

// Create tags based on comma-separated input
function createTags(input) {
  // Split input into tags, remove leading/trailing whitespace, 
  //and filter out empty tags
  const tags = input.split(',').filter(tag => tag.trim()
  !== '').map(tag => tag.trim());
  
  tagsEl.innerHTML = '';

    // Create and append new tags to the tags container
  tags.forEach(tag => {
    const tagEl = document.createElement('span')
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  })
}

//  randomly select and highlight tags
function randomSelect() {
  // number of times to highlight a tag / 30
  const times = 30; 

  // Set an interval to repeatedly highlight and unhighlight tags
  const interval = setInterval(() => {
    const randomTag = pickRandomTag()
    highlightTag(randomTag);

  // Set a timeout to unhighlight the tag after a short duration
    setTimeout(() => {
      unhighlightTag(randomTag);
    },100)

  },100)

  // Set a timeout to stop the interval after a certain number of iterations
  setTimeout(() => {
      clearInterval(interval)
      
      // Set a timeout to highlight a random tag after stopping the interval
      setTimeout(() => {
        const randomTag = pickRandomTag()
        highlightTag(randomTag);
      },100)
      
  }, times * 100)
}

// Pick a random tag from the DOM
function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag){
  tag.classList.add('highlight');
}

function unhighlightTag(tag){
  tag.classList.remove('highlight');
}