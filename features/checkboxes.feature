Feature: Checkboxes

  @checkboxes
  Scenario Outline: Select a checkbox
    Given I open the checkbox page
    When I expand all checkboxes
    And I check the "<checkbox>" checkbox
    Then "<checkbox>" checkbox should be checked

  Examples:
    | checkbox       |
    | Notes          |
    | Angular        |
    | General        |
    | Excel File.doc |
    | Word File.doc  |
