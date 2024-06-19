import loginPage from "../pages/loginPage";
import homePage from "../pages/homePage";
import loginData from "../../fixtures/loginData.json";

const lgPageObj = new loginPage();
const hPageObj = new homePage();

describe.skip("post a tweet", () => {
	beforeEach(() => {
		//access fixture data

		cy.log("Running login process");

		cy.visit("https://x.com/i/flow/login");

		lgPageObj.typeUserName(loginData.userName);

		lgPageObj.clickNextButton();
		lgPageObj.typeUserPassWord(loginData.passWord);

		lgPageObj.clickLoginButton();
		cy.wait(5000);
		lgPageObj.clickCookiesAcceptButton();
	});

	it.skip("Post Image on Twitter", () => {
		cy.url().should("eq", "https://x.com/home");

		cy.log("Starting Image Posting Process");
		//getting some images  from : https://www.pinkvilla.com/lifestyle/relationships/black-love-quotes-1218213

		cy.fixture("tweetImages.json").then((tweetImage) => {
			if (tweetImage.length === 0) {
				cy.log("No Images to process");
				return;
			}

			// Get the first Image to process
			const imageToProcess = tweetImage[0];

			// Select the first image to attach
			hPageObj.uploadImageWhatIsHappening(imageToProcess.image); // Requires `cypress-file-upload` plugin

			// Example assertion or logging after attaching the image
			cy.log(`Attached image: ${imageToProcess.image}`);

			cy.log("No images to attach");
		});
	});

	//upload images

	// hPageObj.clickPostButton();

	// //once message has posted , move the message to a file called 'postedMessages'

	// cy.log(`Posted message: ${messageToProcess.message}`);

	// // Read the postedMessages fixture to append the processed message
	// cy.readFile("cypress/fixtures/postedMessages.json").then((postedMessages) => {
	// 	if (!Array.isArray(postedMessages)) {
	// 	  postedMessages = [];
	// 	}

	// 	postedMessages.push(messageToProcess);

	// 	cy.writeFile("cypress/fixtures/postedMessages.json", postedMessages);
	//   });

	//   // Update 'tweetData'
	//   const updatedTweetData = tweetData.slice(1); // Remove the first item

	//   cy.writeFile("cypress/fixtures/tweetData.json", updatedTweetData);
});
