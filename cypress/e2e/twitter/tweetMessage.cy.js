import loginPage from "../pages/loginPage";
import homePage from "../pages/homePage";
import loginData from "../../fixtures/loginData.json";

const lgPageObj = new loginPage();
const hPageObj = new homePage();

describe("post a tweet", () => {
	beforeEach(() => {
		//access fixture data

		cy.log("Running login process now");

		cy.visit("https://x.com/i/flow/login");

		lgPageObj.typeUserName(loginData.userName);

		lgPageObj.clickNextButton();
		lgPageObj.typeUserPassWord(loginData.passWord);

		lgPageObj.clickLoginButton();
		cy.wait(5000);
		lgPageObj.clickCookiesAcceptButton();
	});

	it("Post in Twitter", () => {
		cy.url().should("eq", "https://x.com/home");

		cy.log("Starting Posting Process");
		//getting some message/quotes  from : https://www.pinkvilla.com/lifestyle/relationships/black-love-quotes-1218213

		cy.fixture("tweetData.json").then((tweetData) => {
			if (tweetData.length === 0) {
				cy.log("No messages to process");
				return;
			}

			// Get the first message to process
			const messageToProcess = tweetData[0];

			hPageObj.typeWhatIsHappeningTextField(messageToProcess.message);

			//upload images

			hPageObj.clickPostButton();

			// //once message has posted , move the message to a file called 'postedMessages'

			cy.log(`Posted message: ${messageToProcess.message}`);

			// Read the postedMessages fixture to append the processed message
			cy.readFile("cypress/fixtures/postedMessages.json").then(
				(postedMessages) => {
					if (!Array.isArray(postedMessages)) {
						postedMessages = [];
					}

					postedMessages.push(messageToProcess);

					cy.writeFile("cypress/fixtures/postedMessages.json", postedMessages);
				}
			);

			// Update 'tweetData'
			const updatedTweetData = tweetData.slice(1); // Remove the first item

			cy.writeFile("cypress/fixtures/tweetData.json", updatedTweetData);
		});
	});
});
