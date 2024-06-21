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
		cy.visit("https://x.com/home"); // Ensure starting from the correct URL

		cy.log("Starting Image Posting Process");

		// Load images from fixture file
		cy.fixture("tweetImages.json").then((tweetImages) => {
			if (tweetImages.length === 0) {
				cy.log("No Images to process");
				return;
			}

			// Get the first image to process
			const imageToProcess = tweetImages[0];
			const imagePath = `${imageToProcess.image}`; // Construct full path to image

			cy.log(`URL from file: ${imagePath.toString()}`);

			cy.wait(20000);

			// Click on the text field to activate it (assuming it's an area that accepts drops)
			cy.get("[class='DraftEditor-root']").click();

			// Simulate file input change event with the image file
			cy.get("[class='DraftEditor-root']").attachFile(imagePath, {
				subjectType: "drag-n-drop",
			});

			// Logging the attached image (adjust as per your needs)
			cy.log(`Attached image: ${imageToProcess.image}`);
			//upload images

			hPageObj.clickPostButton();
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
});
