const form = document.querySelector("#memeform");
const imageInput = document.querySelector('input[name="image"]');
const topText = document.querySelector('input[name="toptext"]');
const bottomText = document.querySelector('input[name="bottomtext"]');
const results = document.querySelector("#results");
let storedMemes = JSON.parse(localStorage.getItem("memes")) || [];
// const memeImage = document.querySelector("#memeimage");
// const lowerText = document.querySelector("#bottomText");
// const upperText = document.querySelector("#upperText");

function loadStoredMemes() {
	results.innerHTML = "";

	storedMemes.forEach((memeData) => {
		const newMeme = makeMeme(
			memeData.image,
			memeData.topText,
			memeData.bottomText
		);
		results.appendChild(newMeme); //I THINK THIS IS A PROBLEM
	});
}

loadStoredMemes();

form.addEventListener("submit", function (e) {
	e.preventDefault();

	// const newMeme = makeMeme(imageInput.value, topText.value, bottomText.value);
	// results.appendChild(newMeme);
	// memeImage.setAttribute("src", imageInput.value);
	const newMemeData = {
		image: imageInput.value,
		topText: topText.value,
		bottomText: bottomText.value,
	};
	const isDuplicate = storedMemes.some((memeData) => {
		return (
			memeData.image === newMemeData.image &&
			memeData.topText === newMemeData.topText &&
			memeData.bottomText === newMemeData.bottomText
		);
	});

	if (!isDuplicate) {
		const newMeme = makeMeme(
			newMemeData.image,
			newMemeData.topText,
			newMemeData.bottomText
		);

		results.appendChild(newMeme);

		storedMemes.push(newMemeData);
		updateLocalStorage();
	}

	// storedMemes.push({
	// 	image: imageInput.value,
	// 	topText: topText.value,
	// 	bottomText: bottomText.value,
	// });
	// updateLocalStorage();

	imageInput.value = "";
	topText.value = "";
	bottomText.value = "";
});

function makeMeme(image, topText, bottomText) {
	// const meme = document.createElement("h2");
	// meme.innerText = topText;
	// meme.style.background = image;
	// lowerText.innerText = bottomText;
	// // results.innerText = topText;
	// return meme;

	const memeContainer = document.createElement("div");
	memeContainer.classList.add("meme-container");

	const memeImage = document.createElement("img");
	memeImage.setAttribute("src", image);

	const upperText = document.createElement("h2");
	upperText.innerText = topText;
	upperText.setAttribute("id", "topText");

	const lowerText = document.createElement("h2");
	lowerText.innerText = bottomText;
	lowerText.setAttribute("id", "bottomText");

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "ABOLISH THIS FIENDISH MEME!";

	deleteButton.addEventListener("click", function () {
		memeContainer.remove();

		storedMemes = storedMemes.filter((memeData) => {
			return (
				memeData.image !== image ||
				memeData.topText !== topText ||
				memeData.bottomText !== bottomText
			);
		});
		updateLocalStorage();
	});

	memeContainer.appendChild(upperText);
	memeContainer.appendChild(memeImage);
	memeContainer.appendChild(lowerText);
	memeContainer.appendChild(deleteButton);

	// storedMemes.push({ image, topText, bottomText });

	// updateLocalStorage();  THIS WAS A PROBLEM!!!!

	return memeContainer;
}

function updateLocalStorage() {
	localStorage.setItem("memes", JSON.stringify(storedMemes));
}
