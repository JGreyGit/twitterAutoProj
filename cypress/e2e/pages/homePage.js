class homePage {
	elements = {
		whatIsHappeningText: () => cy.xpath("//*[text()='What is happening?!']"),
		whatIsHappeningTextField: () => cy.get("[class='DraftEditor-root']"),
		buttonImageUpload: () => cy.get("button[aria-label='Add photos or video']"),

		postTweetButton: () => cy.xpath("//*[@data-testid='tweetButtonInline']"),
	};
	checkWhatIsHappeningTextExist() {
		return this.elements.whatIsHappeningText().should("exist");
	}

	whatIsHappeningTextField() {
		return this.elements.whatIsHappeningTextField();
	}

	typeWhatIsHappeningTextField(text) {
		return this.elements.whatIsHappeningTextField().type(text);
	}

	uploadImageWhatIsHappening(image) {
		
		return this.elements.buttonImageUpload().attachFile(image);
	}

	clickPostButton() {
		return this.elements.postTweetButton().click();
	}
}
export default homePage;
