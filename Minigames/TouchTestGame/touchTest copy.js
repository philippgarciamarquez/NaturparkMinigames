/*The code is not very well written here, especially if you read from mobile, there are a lot of ugly linebreaks, that's because I originally made this project on my computer in my code editor and later copy pasted it here to share it with the community*/


// this makes sure that the code will run only 
// after the window has fully loaded
// window.addEventListener('load', (e) => {

// this gets the draggable list_items 
// and the lists 
let list_items = Array.from(document.querySelectorAll(".list-item"));
let lists = Array.from(document.querySelectorAll(".list"));


// function that gets the element next of your cursor/touch
function getElementAfter(container, y) {
    const list_items = Array.from(container.querySelectorAll('.draggable4:not(.dragging)'));

    return list_items.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element;

}

// loop that makes sure all events 
// created below are added on all 
// the draggable list_items
list_items.forEach((list_items) => {

    // this sets draggable attribute to true
    // the reason I didn't have it set to 
    // true from the start is to prevent 
    // possible bugs that can occur, so
    // that users can only drag the list_items
    // after the window has fully loaded.
    list_items.draggable = "true";


    //function that triggers when toucmove event is added
    //I needed to use a named function so I can remove the 
    //touchmove event later after touchend event triggers
    function touchmove(e) {
        let box1 = lists[0].getBoundingClientRect();
        let y1 = box1.top + box1.height;
        let container;
        let y2 = e.touches[0].clientY;  
        // this finds at which container 
        // the element should be placed, 
        // we then use that container on 
        // getElementAfter function to 
        // get the element after our cursor, 
        // if any, else we just append the 
        // element in the end of the container
        if (y2 < y1) {
            container = lists[0];
        } else if (y2 > y1) {
            container = lists[1];
        }
        let elementAfter = getElementAfter(container, y2);
        if (elementAfter == null) {
            container.append(list_items);
        } else {
            container.insertBefore(list_items, elementAfter);
        }
    }

    // this triggers when a touch is made    
    list_items.addEventListener('touchstart', (e) => {
        list_items.draggable = "false";
        // touch should be hold for 1 second before 
        // the element can be moved
        let timeout = setTimeout(function () {
            list_items.classList.add('dragging');
            document.body.classList.add('no-scroll');
            // after you hold a touch for 1 second on 
            // the element then touchmove event is 
            // added to the document, which triggers
            // the function i made before
            document.addEventListener('touchmove', touchmove);
        }, 500);

        list_items.addEventListener('touchend', (e) => {
            // after touch ends everything is returned
            // to normal and the touchmove event is 
            // removed from the document, also
            // the timout is cleared so if the 
            // touch was not held for 1 second 
            // then the code that was supposed to 
            // trigger after the timeout will not run
            list_items.draggable = "true";
            clearTimeout(timeout);
            list_items.classList.remove('dragging');
            document.body.classList.remove('no-scroll');
            document.removeEventListener('touchmove', touchmove);
        })

        list_items.addEventListener('touchcancel', (e) => {
            // if touch is canceled everything is returned
            // to normal and the touchmove event is 
            // removed from the document
            list_items.draggable = "true";
            clearTimeout(timeout);
            list_items.classList.remove('dragging');
            document.body.classList.remove('no-scroll');
            document.removeEventListener('touchmove', touchmove);
        })
    });

    // drag events, these will not trigger 
    // on mobile, and I make sure they won't 
    // by turning draggable attribute to false 
    // when a touch occurs, because of devices that 
    // support both touch and mouse I also 
    // return the attribute back to true  
    // after the touch ends/cancels    

    // when an element is dragged the dragging 
    // class is added to it, when it is dropped 
    // the dragging class is removed from it
    list_items.addEventListener("dragstart", (e) => {
        list_items.classList.add("dragging");
    });
    list_items.addEventListener("dragend", (e) => {
        list_items.classList.remove("dragging");
    });
});

// this adds the dragover event to both lists, when an element is dragged over a container
// it will call the getElementAfter function which will return the element that's right after the cursor,
// if any, else it will append the element with the draggin class to the end of the container
lists.forEach((lists) => {
    lists.addEventListener("dragover", (e) => {
        e.preventDefault();
        const elementAfter = getElementAfter(lists, e.clientY);
        const element = document.querySelector('.dragging');
        if (elementAfter == null) {
            lists.append(element);
        } else {
            lists.insertBefore(element, elementAfter);
        }
    });
});
// });