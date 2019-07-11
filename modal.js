// Accessible Window

// Hold previously focused element
let focusedElementBeforeModal1;

// Find modal and overlay
const modal1 = document.querySelector('.modal1');
const modal1Overlay = document.querySelector('.modal1-overlay');
const modal1Toggle = document.querySelector('.modal1-toggle');
modal1Toggle.addEventListener('click', openModal1);

function openModal1(){
    // save current focus
    focusedElementBeforeModal1 = document.activeElement;

    // Listen and trap the keyboard
    modal1.addEventListener('keydown', trapTabKey);
    modal1Overlay.addEventListener('click', closeModal1);

    // Close the dialog
    const close = document.querySelector('#close');
    close.addEventListener('click', closeModal1);

    // Find all focusable children
    var focusableElementsString = '.art, .fashion, #close';
    var focusableElements = modal.querySelectorAll(focusableElementsString);
    
    // Convert Nodelist to Array
    focusableElements = Array.prototype.slice.call(focusableElements);
    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length -1];
    
    // Show the modal and overlay
    modal1.style.display = 'block';
    modal1Overlay.style.display = 'block';

    // Focus first child
    firstTabStop.focus();
    function trapTabKey(e){
        // Check for TAB key press
        if(e.keyCode === 9){
            // SHIFT + TAB
            if(e.shiftKey){
                if(document.activeElement === firstTabStop){
                    e.preventDefault();
                    lastTabStop.focus();
                }   
            // TAB
            else {
                if(document.activeElement === lastTabStop){
                    e.preventDefault();
                    firstTabStop.focus();
                }
            }
            }
            // ESXAPE
            if(e.keyCode === 27){
                closeModal1();
            }
        }
    }
    function closeModal1(){
        // Hide modal and overlay
        modal.style.display = 'none';
        modal1Overlay.style.display = 'none';

        // Set focus back to the element that had it before the modal was opened
        focusedElementBeforeModal1.focus();
    }

}