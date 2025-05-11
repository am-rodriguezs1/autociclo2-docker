Feature: Crear un nuevo sitio en Ghost CMS

@user13 @web @createSiteEmailError
 Scenario: ESC013 - Crear un sitio con email incorrecto muestra mensaje de error
    Given I navigate to page "<URL>"
    And "1" I wait for 3 seconds
    When I enter text "<SITE_TITLE>" into the input with id "blog-title"
    And "2" I wait for 3 seconds
    And I enter text "<FULL_NAME>" into the input with id "name"
    And "3" I wait for 3 seconds
    And I enter text "usuario-invalido" into the input with id "email"
    And "4" I wait for 3 seconds
    And I enter text "<PASSWORD>" into the input with id "password"
    And "5" I wait for 3 seconds
    And I click on the element with data-test-button "setup"
    And "6" I wait for 3 seconds
    Then I should see text "Invalid Email." in the element with selector ".form-group.error .response"