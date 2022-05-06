class ValidationRules {
  minLength(value: string, lenght: number) {
    if (value.length < lenght) {
      return false;
    } else {
      return true;
    }
  }
}

export default new ValidationRules();