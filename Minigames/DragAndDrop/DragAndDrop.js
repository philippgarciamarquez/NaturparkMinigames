/*The code is not very well written here, especially if you read from mobile, there are a lot of ugly linebreaks, that's because I originally made this project on my computer in my code editor and later copy pasted it here to share it with the community*/
// main source of code: https://www.sololearn.com/compiler-playground/WA19a0a18a19/?ref=app

let list_items = [];

console.log("List Items0: " + list_items);

// function that gets the element next of your cursor/touch
function getElementAfter(container, x) {
	const list_items = Array.from(container.querySelectorAll('.draggable4:not(.dragging)'));

	return list_items.reduce((closest, child) => {
		const box = child.getBoundingClientRect();
		const offset = x - box.left - box.width / 2;

		if (offset < 0 && offset > closest.offset) {
			return { offset: offset, element: child };
		} else {
			return closest;
		}

	}, { offset: Number.NEGATIVE_INFINITY }).element;
}

let lists = Array.from(document.querySelectorAll(".list"));

let jsonFile = new URLSearchParams(window.location.search).get("json");
getData(jsonFile);

async function getData(_url) {

	let response = await fetch(_url);
	let data = await response.json();
	console.log(data);

	for (let i = 0; i < data.length; i++) {
		let cardDiv = document.createElement("div");
		let className = "list-item " + data[i].column;
		cardDiv.setAttribute("class", className);
		cardDiv.draggable = false;
		cardDiv.innerText = data[i].text;
		list_items.push(cardDiv);


		let startList = document.getElementById("start-list");
		startList.appendChild(cardDiv);
	}
	addTouch(list_items);
}

console.log("List Items: " + list_items);


function addTouch(list_items) {
	list_items.forEach((list_items) => {

		list_items.draggable = "true";

		function touchmove(e) {
			let box1 = lists[0].getBoundingClientRect();
			let box2 = lists[1].getBoundingClientRect();
			let box3 = lists[2].getBoundingClientRect();
			let box4 = lists[3].getBoundingClientRect();
			// console.log("box 2 Pos: " + box2.left);
			// console.log("box 3 Pos: " + box3.left);

			let x1 = box1.left + box1.width;
			let x2 = box2.left + box2.width;
			let x3 = box3.left + box3.width;
			let x4 = box4.left + box4.width;
			let container;
			let touchX = e.touches[0].clientX;

			if (touchX < x1) {
				container = lists[0];
				// console.log("Container 1: " + touchX);
			}
			if (touchX > x1) {
				container = lists[1];
				// console.log("Container 2: " + touchX);
			}
			if (touchX > x2) {
				container = lists[2];
				// console.log("Container 3: " + touchX);
			}
			if (touchX > x3) {
				container = lists[3];
				// console.log("Container 4: " + touchX);
			}
			if (touchX > x4) {
				container = lists[4];
				// console.log("Container 5: " + touchX);
			}

			let elementAfter = getElementAfter(container, touchX);
			if (elementAfter == null) {
				container.append(list_items);
			} else {
				container.insertBefore(list_items, elementAfter);
			}
		}

		// this triggers when a touch is made    
		list_items.addEventListener('touchstart', (e) => {

			list_items.draggable = "false";
			
			disableScroll();
			let timeout = setTimeout(function () {
				list_items.classList.add('dragging');
				document.body.classList.add('no-scroll');

				document.addEventListener('touchmove', touchmove);
			}, 100);

			list_items.addEventListener('touchend', (e) => {

				list_items.draggable = "true";

				enableScroll();
				clearTimeout(timeout);
				list_items.classList.remove('dragging');
				document.body.classList.remove('no-scroll');
				document.removeEventListener('touchmove', touchmove);
			});

			list_items.addEventListener('touchcancel', (e) => {

				list_items.draggable = "true";

				enableScroll();
				clearTimeout(timeout);
				list_items.classList.remove('dragging');
				document.body.classList.remove('no-scroll');
				document.removeEventListener('touchmove', touchmove);
			});
		});

		list_items.addEventListener("dragstart", (e) => {
			list_items.classList.add("dragging");
		});
		list_items.addEventListener("dragend", (e) => {
			list_items.classList.remove("dragging");
		});
	});
}


lists.forEach((lists) => {
	lists.addEventListener("dragover", (e) => {
		e.preventDefault();
		const elementAfter = getElementAfter(lists, e.clientX);
		const element = document.querySelector('.dragging');
		if (elementAfter == null) {
			lists.append(element);
		} else {
			lists.insertBefore(element, elementAfter);
		}
	});
});

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
	e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
	window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
		get: function () { supportsPassive = true; }
	}));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
	window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
	window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
	window.removeEventListener('touchmove', preventDefault, wheelOpt);
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
// });