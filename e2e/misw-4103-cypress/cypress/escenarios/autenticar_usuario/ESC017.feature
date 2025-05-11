Feature: Login Successful 

@user1 @web 
Scenario: Ghost Login Scenery 
  Given I go to host page and path "/signin"
  And I wait for 2 seconds
  When I enter the email
  And I wait for 1 seconds
  And I enter the password
  And I wait for 2 seconds
  And I click next
  And I wait for 4 seconds
  Then I should could logout
  And I wait for 2 seconds 