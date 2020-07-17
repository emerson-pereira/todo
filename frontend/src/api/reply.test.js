import { success, fail } from './reply';

const desiredSuccess = { data: { myData: true } };

it('API success reply with valid data', () => {
  expect(success(desiredSuccess)).toMatchObject(desiredSuccess);
});

it('API success reply with invalid data', () => {
  expect(success()).toMatchObject({
    data: null,
  });
});

it('API fail reply with valid data', () => {
  expect(
    fail({
      data: {
        error: {
          message: 'An error occurred.',
        },
      },
    })
  ).toMatchObject({
    error: {
      message: 'An error occurred.',
    },
  });
});

it('API fail reply with invalid data', () => {
  expect(fail()).toMatchObject({
    error: {
      message: 'No response from server.',
    },
  });
});
