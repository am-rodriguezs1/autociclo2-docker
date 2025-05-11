Feature: Crear miembro

@user1 @web
Scenario: ESC011 - Crear miembro exitosamente con solo el correo electrónico
  Given "1" I go to host page and path "/signin"
  And I wait for 2 seconds
  When "2" I sign in
  And I wait for 7 seconds
  And "3" I go to host page and path "/members/new"
  When "4" I fill the member email only
  And "5" I click save member button
  And I wait for 1 seconds
  Then "6" I should see the saved message in the button
  And I wait for 5 seconds