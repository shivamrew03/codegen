export const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
  
    if (password.length < minLength) {
      throw new BadRequestError('Password must be at least 8 characters long.');
    } else if (!(hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas)) {
      throw new BadRequestError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }
  };