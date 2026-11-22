# Behavior Driven Development (BDD) Rules

## Rules

### Unit Tests - Hybrid Approach

**Uses a HYBRID testing approach for unit tests:**

#### Existing Tests (Legacy)
- **Framework**: JUnit 5 (standard Spring Boot testing)
- **Location**: `src/test/java/**/*Test.java`
- **Approach**: Keep these tests as-is. They are working and proven.

#### New Tests (BDD Compliant)
For **new business logic or critical path tests**, use Cucumber BDD:

1. **Use Gherkin Syntax** - Write feature files with Given/When/Then scenarios
2. **Feature files**: Place in `<root>src/test/resources/features/` with subfolders for each domain
3. **Step definitions**: Create in `<root>src/test/java/io/marketplace/services/payin/bdd/steps/`
4. **Code coverage**: Maintain at least 90% overall coverage
5. **Use Cucumber with JUnit** Platform Suite
6. **Configuration files** (already present):
   - `src/test/resources/application-cucumber-local.yml`
   - `src/test/resources/cucumber.properties`
   - `src/test/resources/testcontainers.properties`

#### Running Tests

**Run all JUnit tests and Cucumber BDD tests** (daily development):
```bash
./gradlew test
```

#### When to Use Each Approach

| Use Case | Framework | Rationale |
|----------|-----------|-----------|
| Existing tests | JUnit | Already working, don't break what works |
| New business logic | Cucumber BDD | Business-readable scenarios |
| Critical payment flows | Cucumber BDD | Stakeholder visibility |
| Utility/helper tests | JUnit | Technical focus, less business value |
| Quick bug fixes | Either | Use what's fastest |

#### Migration Strategy

- ✅ BDD infrastructure is complete and ready
- ✅ Step definition framework established
- 📋 Migrate existing tests gradually as they need updates
- 📋 New features MUST use Cucumber BDD for business logic

### Integration Tests
1. Use Gherkin Syntax
2. For integration tests the feature files are in `<root>tests/test/integration/scenarios/` 
3. Each integration test feature file should have a corresponding test class in `<root>tests/test/integration/` with the same name as the feature file
4. For integration tests use pytest-bdd.
5. Ensure following file available for integration tests 
- `<root>/tests/requirements.txt`
- `<root>/tests/conftest.py`
- `<root>/tests/__init__.py`

