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
	it("Post Image on Twitter", () => {
		cy.visit("https://x.com/home"); // Ensure starting from the correct URL

		cy.log("Starting Image Posting Process");

		// Load the fixture file for images
		cy.fixture("tweetImages.json").then((list) => {
			// Ensure the list is an array and has items
			expect(list).to.be.an("array").that.is.not.empty;

			// Process the first item in the list
			const item = list[0];
			cy.log(`Processing item: ${item.image}`);

			const imagePath = `${item.image}`; // Construct full path to image

			cy.wait(3000); // Wait before processing

			// Simulate file input change event with the image file
			cy.get("[class='DraftEditor-root']").attachFile(imagePath, {
				subjectType: "drag-n-drop",
			});

			cy.wait(3000); // Wait for the upload to complete

			// attempting to click the post button
			hPageObj.actionPostButtonWithKeyBoard();
			cy.wait(5000);

			// Log the posted message
			cy.log(`Posted image: ${item.image}`);

			// Read the postedImages fixture to append the processed message
			cy.readFile("cypress/fixtures/postedImages.json").then((postedImages) => {
				if (!Array.isArray(postedImages)) {
					postedImages = [];
				}

				postedImages.push(item);

				cy.writeFile("cypress/fixtures/postedImages.json", postedImages);
			});

			// Remove the processed item from the list
			list.splice(0, 1);

			// Update 'tweetImages' by removing the first item
			cy.writeFile("cypress/fixtures/tweetImages.json", list);
		});
	});
});
