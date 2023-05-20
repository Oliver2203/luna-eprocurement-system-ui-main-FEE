const validatorRules = {
  required(value) {
    return value ? undefined : 'Must include this field';
  },
  email(value) {
    // eslint-disable-next-line
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return EMAIL_REGEX.test(value) ? undefined : 'Invalid email address';
  },
  username(value) {
    const USER_REGEX = /^[a-z0-9_.]+$/;
    return USER_REGEX.test(value) ? undefined : 'Invalid username';
  },
  password(value) {
    // eslint-disable-next-line
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$/;
    return PWD_REGEX.test(value)
      ? undefined
      : 'Invalid password (must be between 8 and 24 digits and have at least a number and an uppercase letter)';
  },
  entityCode(value) {
    // eslint-disable-next-line
    const ENTITY_REGEX = /^[a-zA-Z0-9].{2,5}$/i;
    return ENTITY_REGEX.test(value)
      ? undefined
      : 'Invalid Entity Code (must be in alphanumeric and between 3 and 6 digits)';
  },
};

const handleInput = (value, ...rules) => {
  for (var i = 0; i < rules.length; ++i) {
    const valid = validatorRules[rules[i]](value);
    if (valid !== undefined) {
      return valid;
    }
  }
  return undefined;
};

export default handleInput;
