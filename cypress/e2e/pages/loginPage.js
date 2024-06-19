class loginPage {
	elements = {
		userNameObj: () => cy.get("[autocomplete='username']"),
		nextButtonObj: () => cy.xpath("//*[text()='Next']"),
		passWordObj: () => cy.get("input[name='password']"),
		loginButtonObj: () => cy.xpath("//*[text()='Log in']"),
		cookiesAcceptButtonObj: () =>
			cy.xpath("//*[text()='Accept all cookies']").first(),
	};

	typeUserName(userName) {
		 this.elements.userNameObj().type(userName);
	}
	clickNextButton() {
		this.elements.nextButtonObj().click();
	}
	typeUserPassWord(passWord) {
		this.elements.passWordObj().type(passWord);
	}

	clickLoginButton() {
		this.elements.loginButtonObj().click();
	}

	clickCookiesAcceptButton() {
		this.elements.cookiesAcceptButtonObj().click();
	}
}
export default loginPage;
