Feature: Gestión de Recruitment en OrangeHRM
  Como usuario administrador de recursos humanos
  Quiero gestionar Candidates y Vacancies en el módulo de Recruitment
  Para administrar el proceso de selección de la empresa

  Background:
    Given el usuario ingresa a la página de login de OrangeHRM
    And inicia sesión con credenciales válidas
    And navega al módulo de "Recruitment"

  @critico
  Scenario: Cargar Candidate con datos válidos
    Given el usuario se encuentra en la pestaña "Candidates"
    When agrega un nuevo candidato con nombre "Juan", apellido "Pérez" y email "juan.perez@email.com"
    And guarda el formulario
    Then el sistema guarda el candidato correctamente en el listado

  @critico
  Scenario: Cargar Vacancy con datos válidos
    Given el usuario se encuentra en la pestaña "Vacancies"
    When agrega una nueva vacante con nombre "Desarrollador Backend" y puesto "Software Engineer"
    And guarda el formulario
    Then el sistema guarda la vacante correctamente en el listado

  @medio
  Scenario: Cargar Candidate sin completar campos obligatorios
    Given el usuario se encuentra en la pestaña "Candidates"
    When intenta guardar un nuevo candidato dejando todos los campos vacíos
    Then el sistema no permite guardar el candidato
    And muestra mensajes de error en los campos obligatorios del candidato

  @medio
  Scenario: Cargar Vacancy sin completar campos obligatorios
    Given el usuario se encuentra en la pestaña "Vacancies"
    When intenta guardar una nueva vacante dejando todos los campos vacíos
    Then el sistema no permite guardar la vacante
    And muestra mensajes de error en los campos obligatorios de la vacante

  @bajo
  Scenario: Cancelar la creación de un Candidate
    Given el usuario se encuentra en la pestaña "Candidates"
    When inicia la creación de un candidato ingresando el nombre "María"
    And hace clic en el botón de cancelar
    Then el sistema descarta los datos ingresados
    And redirige al usuario al listado de candidatos