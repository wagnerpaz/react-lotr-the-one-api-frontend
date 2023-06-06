const defaultToastError = (err: any) => {
  return {
    message: "An error occurred.",
    description:
      err?.response?.data?.message ||
      err?.message ||
      err?.statusText ||
      JSON.stringify(err),
    type: "error",
  };
};
export default defaultToastError;
