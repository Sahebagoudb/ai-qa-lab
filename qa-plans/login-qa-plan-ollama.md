# QA Plan for User Login with Email and Password

## 1. Risk Areas
- **Email/Password Validation**: Incorrect email or password formats.
- **CAPTCHA Detection**: Automated CAPTCHA solutions or incorrect solutions.
- **OTP Verification**: Invalid OTPs or expired OTP codes.
- **Security**: Potential security vulnerabilities like SQL injection, XSS, etc.

## 2. Positive Test Cases
1. **Valid Email and Password**:
   - Input valid email and password.
   - Verify successful dashboard access.
   
2. **Case Sensitive Email and Password**:
   - Input email with varying cases and verify successful login.
   - Input password with varying cases and verify successful login.

3. **Special Characters in Email and Password**:
   - Input email with special characters (e.g., @, .) and verify successful login.
   - Input password with special characters and verify successful login.

## 3. Negative Test Cases
1. **Invalid Email Format**:
   - Input an email without '@' symbol or domain extension.
   - Verify error message indicating invalid format.

2. **Incorrect Password**:
   - Input incorrect password multiple times (with CAPTCHA bypass).
   - Verify account lockout after several attempts.

3. **Expired OTP Code**:
   - Request OTP and wait for it to expire.
   - Attempt to login with expired OTP and verify error message.

## 4. Boundary Cases
1. **Email Length Limits**:
   - Input a very long email address at the boundary of maximum allowed length.
   - Verify successful login or error message.

2. **Password Length Limits**:
   - Input a password at the minimum required length.
   - Input a password just above the maximum allowed length and verify error message.

## 5. API Checks
1. **Login Endpoint Validation**:
   - Verify successful response status code (e.g., 200 OK) for valid login.
   - Verify correct headers returned in the response.
   
2. **OTP Verification Endpoint Validation**:
   - Verify correct OTP verification by checking response status codes and data integrity.

## 6. Visual Checks
1. **Email Field Styling**:
   - Ensure email field is styled correctly (e.g., placeholders, error messages).
   
2. **Dashboard Accessibility**:
   - Verify that the dashboard UI is visually accessible with different themes.
   
3. **Error Messages Display**:
   - Ensure error messages are displayed clearly and consistently.

## 7. Accessibility Checks
1. **Keyboard Navigation**:
   - Verify that all elements are navigable using keyboard shortcuts.
   
2. **Screen Reader Compatibility**:
   - Test login flow with screen readers to ensure accessibility.

## 8. Playwright Automation Candidates
1. **Email/Password Input**:
   - Automate input of valid and invalid email/password combinations.
   
2. **CAPTCHA Handling**:
   - Implement automation for CAPTCHA bypass if necessary.
   
3. **OTP Verification**:
   - Automate OTP generation and submission.

## 9. Required Test Data
- List of valid email/password combinations.
- Invalid email/password formats.
- Set of test cases to trigger CAPTCHA, including different solutions.
- Valid and expired OTP codes for testing.

## 10. Priority Order for Automation
1. **Positive Test Cases**: Ensure basic functionality works as expected.
2. **Boundary Cases**: Verify edge cases that might not be covered in positive tests.
3. **Negative Test Cases**: Identify and fix potential vulnerabilities or bugs.
4. **API Checks**: Ensure backend interactions are secure and reliable.
5. **Visual Checks**: Confirm UI consistency across different themes and accessibilities.

This QA plan should help in systematically testing the user login feature of the Moniic Admin Portal, ensuring robustness and reliability while maintaining a focus on security and accessibility.