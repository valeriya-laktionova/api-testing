Feature: Radio Buttons

  @radio
  Scenario: Select "Yes" radio button
    Given I open the radio button page
    When I select the "Yes" radio button
    Then the result should be "Yes"

  Scenario: Select "Impressive" radio button
    Given I open the radio button page
    When I select the "Impressive" radio button
    Then the result should be "Impressive"
