import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import { yupSchema } from 'solid-form-handler/yup';
import { userSchema } from './schema';
import {
  Checkbox,
  Checkboxes,
  Radios,
  Select,
  TextInput,
} from '@components/suid';
import Button from '@suid/material/Button';
import Stack from '@suid/material/Stack';
import Grid from '@suid/material/Grid';
import Box from '@suid/material/Box';
import Typography from '@suid/material/Typography';

export const Form: Component = () => {
  const formHandler = useFormHandler(yupSchema(userSchema));
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const fill = () => {
    formHandler.fillForm({
      name: 'John',
      email: 'john@mail.com',
      country: 2,
      favoriteFoods: [3, 4],
      gender: 'female',
      subscribed: true,
    });
  };

  const reset = () => {
    formHandler.resetForm();
  };

  return (
    <>
      <form autocomplete="off" onSubmit={submit}>
        <Box mb={3}>
          <Typography fontWeight={'bold'}>Using yup schema:</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput
              required
              label="Name"
              name="name"
              formHandler={formHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              required
              label="Email"
              name="email"
              formHandler={formHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              required
              label="Country"
              name="country"
              placeholder="Select a country"
              options={[
                { value: 1, label: 'France' },
                { value: 2, label: 'Spain' },
                { value: 3, label: 'Canada' },
              ]}
              formHandler={formHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <Checkboxes
              required
              label="Favorite foods"
              name="favoriteFoods"
              formHandler={formHandler}
              options={[
                { value: 1, label: 'Pizza' },
                { value: 2, label: 'Hamburger' },
                { value: 3, label: 'Spaghetti' },
                { value: 4, label: 'Hot Dog' },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Radios
              required
              label="Gender"
              name="gender"
              formHandler={formHandler}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Checkbox
              label="Subscribe to newsletter"
              name="subscribed"
              formHandler={formHandler}
            />
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button
            variant="contained"
            disabled={formHandler.isFormInvalid()}
            type="submit"
          >
            Submit
          </Button>
          <Button variant="outlined" onClick={fill}>
            Fill
          </Button>
          <Button variant="outlined" onClick={reset}>
            Reset
          </Button>
        </Stack>
      </form>
      <Box mt={5}>
        <Typography fontWeight={'bold'}>Form data:</Typography>
      </Box>
      <Box
        mt={3}
        p={3}
        component="pre"
        border={1}
        borderColor="#e4e4e4"
        bgcolor="#F8F9FA"
      >
        <Box component="code">{JSON.stringify(formData(), null, 2)}</Box>
      </Box>
    </>
  );
};
