Feature: Crear miembro

@user1 @web
Scenario: ESC009 - Crear miembro exitosamente con nombre y correo electrónico
  Given "1" I navigate to page "<URL>" and path "/signin"
  And I wait for 5 seconds
  When "2" I enter the email "<EMAIL>"
  And I wait for 2 seconds
  And "3" I enter the password "<PASSWORD>"
  And I wait for 2 seconds
  And "4" I click next
  And I wait for 7 seconds
  When "5" I navigate to page "<URL>" and path "/members/new"
  And I wait for 3 seconds
  When "6" I enter the member name
  And I wait for 1 seconds
  And "7" I enter the member email 
  And I wait for 1 seconds
  And "8" I click save member
  And I wait for 1 seconds
  Then "9" I should see the saved message
  And I wait for 5 seconds