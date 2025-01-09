import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Grid } from '@mui/material';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

interface QuestionnaireFormProps {
  onSubmit: (values: any) => void;
  section: string;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ onSubmit, section }) => {
  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {/* Form fields will be dynamically generated based on section */}
      </Grid>
    </form>
  );
};

export default QuestionnaireForm; 