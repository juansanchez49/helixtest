import {
  fetchPlaceholders,
} from '../../scripts/aem.js';

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`helixcomponent-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('helixcomponent-img-col');
        }
      }
    });
  });

  // Get the default-content-wrapper div

  const defaultContentWrapper = document.querySelector('.helixcomponent.purple')?.parentNode;
  // Check if the inner div has the .purple class
  if (defaultContentWrapper && block.classList.contains('purple')) {
    // Apply the background to the default-content-wrapper div
    defaultContentWrapper.classList.add('purple');
  }

  // fetch placeholders from the 'en' folder
  const placeholders = await fetchPlaceholders();
  // retrieve the value for key 'moreInfo'
  const { moreInfo } = placeholders;
  const button = block.querySelector('.button');
  if (button) {
    button.innerHTML = moreInfo;
  }
}
