export const schemaValidator = (schema, body) => {
    const errors = Object.keys(schema)
      .map((validation) => schema[validation](body[validation]))
      .filter((result) => result !== null);
    return errors.length > 0 ? errors : null;
};