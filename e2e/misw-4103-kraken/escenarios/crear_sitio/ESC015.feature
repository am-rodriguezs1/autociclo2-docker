Feature: Crear un nuevo sitio en Ghost CMS

@user15 @web @createSitePassError
Scenario: ESC015 - Crear un sitio con contraseña demasiado corta muestra mensaje de error
  Given I navigate to page "<URL>"
  When I enter text "Mi sitio de prueba" into the input with id "blog-title"
  And "1" I wait for 3 seconds
  And I enter text "Usuario de Prueba" into the input with id "name"
  And "2" I wait for 3 seconds
  And I enter text "usuario@prueba.com" into the input with id "email"
  And "3" I wait for 3 seconds
  And I enter text "shortpwd" into the input with id "password"
  And "4" I wait for 3 seconds
  And I click on the element with data-test-button "setup"
  And "5" I wait for 3 seconds
  Then I should see text "Password must be at least 10 characters long." in the element with selector ".response"
