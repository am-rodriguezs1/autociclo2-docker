Feature: Crear un nuevo sitio en Ghost CMS

@user13 @web @createSiteEmailError
 Scenario: Crear un sitio con email incorrecto muestra mensaje de error
    Given I go to page "/ghost/#/setup"
    And I wait for 2 seconds
    When I enter text "Mi sitio de prueba" into the input with id "blog-title"
    And I enter text "Usuario de Prueba" into the input with id "name"
    And I enter text "usuario-invalido" into the input with id "email"
    And I enter text "UnaPassValida123" into the input with id "password"
    And I click on the element with data-test-button "setup"
    Then I should see text "Invalid Email." in the element with selector ".form-group.error .response"