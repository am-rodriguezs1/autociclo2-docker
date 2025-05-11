Feature: Login Successful 

@user1 @web 
Scenario: ESC017 - Ghost Login Scenery 

  Given I navigate to page "<URL>" and path "/signin" 
  And "1" I wait for 4 seconds
  When I enter the email "<EMAIL>" 
  And "2" I wait for 2 seconds 
  And I enter the password "<PASSWORD>" 
  And "3" I wait for 2 seconds 
  And I click next 
  And "4" I wait for 4 seconds 
  Then I logout 
  And "5" I wait for 2 seconds 