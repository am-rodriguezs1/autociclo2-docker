Feature: Crear un nuevo sitio en Ghost CMS

  @user14 @web @createSiteNameError
 Scenario: Crear un sitio sin nombre muestra mensaje de error
    Given I go to page "/ghost/#/setup"
    And I wait for 2 seconds
    # dejamos el título vacío
    When I enter text "" into the input with id "blog-title"
    And I enter text "Usuario de Prueba" into the input with id "name"
    And I enter text "email@email.com" into the input with id "email"
    And I enter text "UnaPassValida123" into the input with id "password"
    And I click on the element with data-test-button "setup"
    Then I should see text "Please enter a site title." in the element with selector ".response"
