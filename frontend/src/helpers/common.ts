
export  const handleSnackbarError = (enqueueSnackbar:any,error:any) => {
  
  const errorMessage = error?.message || 'An error occurred';
  enqueueSnackbar(errorMessage, { variant: 'error' }); 
};