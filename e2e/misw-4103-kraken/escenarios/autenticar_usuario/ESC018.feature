Feature: Login user

@user1 @web
Scenario: ESC018 - Login with incorrect password
  Given I navigate to page "<URL>"
  And "1" I wait for 5 seconds
  When I enter the email "<EMAIL>"
  And "2" I wait for 1 seconds
  And I enter the password "wrongpassword"
  And "3" I wait for 2 seconds
  And I click next
  And "4" I wait for 2 seconds
Then I should see error message "Your password is incorrect."
