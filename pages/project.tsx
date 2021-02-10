import { Formik, Form, Field, FormikState } from "formik";
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import MuiTextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  ToggleButtonGroup,
} from "formik-material-ui-lab";
import Box from "@material-ui/core/Box";
import ToggleButton from "@material-ui/lab/ToggleButton";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import React from "react";

interface ProjectValues {
  name: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

interface ProductCategory {
  label: string;
}

interface ProductType {
  label: string;
  categories: Array<ProductCategory>;
}

const productTypes: Array<ProductType> = [
  {
    label: "Food",
    categories: [{ label: "Burrito" }],
  },
  {
    label: "Beverage",
    categories: [{ label: "Tea" }],
  },
];

export const ProjectPage: React.FC = () => {
  const classes = useStyles();

  const initialValues: ProjectValues = {
    name: "",
  };

  const onSubmit = () => {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      className={classes.root}
    >
      {({ submitForm, isSubmitting, errors, touched, values }) => {
        const selectedProductType = values["productType"];
        return (
          <Form>
            <Box margin={3}>
              <Typography>What is the name of the product?</Typography>
              <Field
                component={TextField}
                name="name"
                variant="outlined"
                style={{ width: 300 }}
                // label="What is the name of the product?"
              />
            </Box>
            <Box margin={3}>
              <Typography>Is the product a food or beverage?</Typography>
              <Field
                name="productType"
                component={Autocomplete}
                options={productTypes}
                getOptionLabel={(option: ProductType) => option.label}
                style={{ width: 300 }}
                renderInput={(params: AutocompleteRenderInputParams) => {
                  return (
                    <MuiTextField
                      {...params}
                      error={touched["productType"] && !!errors["productType"]}
                      // label="Product Type"
                      variant="outlined"
                    />
                  );
                }}
              ></Field>
            </Box>
            {selectedProductType?.label === "Beverage" && (
              <Box margin={1}>
                <Typography>Is the beverage alcoholic?</Typography>
                <Field
                  component={ToggleButtonGroup}
                  name="toggle"
                  type="radio"
                  exclusive
                >
                  <ToggleButton value={true}>Yes</ToggleButton>
                  <ToggleButton value={false}>No</ToggleButton>
                </Field>
              </Box>
            )}
            {selectedProductType && (
              <Box margin={3}>
                <Typography>
                  What is the {selectedProductType.label} category?
                </Typography>
                <Field
                  name="productCategory"
                  component={Autocomplete}
                  options={values["productType"]?.categories}
                  getOptionLabel={(option: ProductType) => option.label}
                  style={{ width: 300 }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <MuiTextField
                      {...params}
                      error={
                        touched["autocomplete"] && !!errors["autocomplete"]
                      }
                      helperText={
                        touched["autocomplete"] && errors["autocomplete"]
                      }
                      variant="outlined"
                    />
                  )}
                ></Field>
              </Box>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProjectPage;
